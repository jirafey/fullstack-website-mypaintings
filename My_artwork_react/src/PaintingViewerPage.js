import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';
import './PaintingViewerPage.css';

// Demo painting data
const DEMO_PAINTING = {
  id: 1,
  title: 'Abstract Dreams',
  artist: 'John Doe',
  artistId: 101,
  price: '$1,200',
  description: 'A beautiful abstract painting full of color and movement.',
  imageUrl: 'https://picsum.photos/600/400?random=101',
};

function PaintingViewerPage() {
  const { paintingId } = useParams();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { userType, token } = useSession();
  const showToast = useToast();
  const navigate = useNavigate();
  const { demoMode } = useDemoMode();

  useEffect(() => {
    if (demoMode) {
      setPainting({ ...DEMO_PAINTING, id: paintingId });
      setLoading(false);
      setIsFollowed(false);
      return;
    }
    apiRequest(`/painting/${paintingId}`)
      .then(data => setPainting(data.painting || data))
      .catch(err => showToast('Error loading painting: ' + err.message, 'danger'))
      .finally(() => setLoading(false));
    // Fetch follow status if hotel and paintingId
    if (userType === 'HOTEL' && paintingId) {
      apiRequest(`/hotel/artysta/is-followed/${paintingId}`, { method: 'GET' })
        .then(data => setIsFollowed(!!data.isFollowed))
        .catch(() => setIsFollowed(false));
    }
  }, [paintingId, showToast, userType, demoMode]);

  // Demo actions
  const handleReserveDemo = () => {
    showToast('Reservation request sent! (demo)', 'success');
  };
  const handleFollowToggleDemo = () => {
    setIsFollowed(f => !f);
    showToast(isFollowed ? 'Unfollowed artist. (demo)' : 'Followed artist! (demo)', isFollowed ? 'info' : 'success');
  };

  const handleReserve = async () => {
    if (!token) {
      showToast('You must be logged in to reserve.', 'danger');
      navigate('/login', { state: { redirectTo: `/view-painting/${paintingId}` } });
      return;
    }
    setReserving(true);
    try {
      await apiRequest(`/painting/${paintingId}/reserve`, { method: 'POST' });
      showToast('Reservation request sent!', 'success');
    } catch (err) {
      showToast('Error reserving: ' + err.message, 'danger');
    } finally {
      setReserving(false);
    }
  };

  const handleFollowToggle = async () => {
    if (!painting || !painting.artistId) return;
    setFollowLoading(true);
    try {
      if (isFollowed) {
        await apiRequest(`/hotel/artysta/follow/${painting.artistId}`, { method: 'DELETE' });
        setIsFollowed(false);
        showToast('Unfollowed artist.', 'info');
      } else {
        await apiRequest(`/hotel/artysta/follow/${painting.artistId}`, { method: 'POST' });
        setIsFollowed(true);
        showToast('Followed artist!', 'success');
      }
    } catch (err) {
      showToast('Error updating follow status: ' + err.message, 'danger');
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading painting...</div>;
  if (!painting) return <div className="alert alert-danger">Painting not found.</div>;

  // Demo avatar for artist
  const artistAvatar = painting.artistAvatar || 'https://randomuser.me/api/portraits/men/32.jpg';

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg rounded-4 p-4 mb-4 painting-viewer-card">
            <div className="d-flex align-items-center mb-4">
              <img src={artistAvatar} alt={painting.artist} className="rounded-circle me-3 border border-2" width={56} height={56} />
              <div>
                <h3 className="mb-0 fw-bold">{painting.title}</h3>
                <div className="text-muted small">by {painting.artist}</div>
              </div>
              {userType === 'HOTEL' && painting.artistId && (
                <button className="btn btn-outline-primary btn-sm ms-auto rounded-pill" onClick={demoMode ? handleFollowToggleDemo : handleFollowToggle} disabled={followLoading} style={{minWidth:90}}>
                  {followLoading ? '...' : isFollowed ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
            <div className="painting-image-wrapper mb-4">
              <img src={painting.imageUrl || painting.image_url || '/img.png'} alt={painting.title} className="painting-image rounded-4 w-100" style={{ aspectRatio: '4/3', objectFit: 'cover', maxHeight: 420 }} />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-2"><span className="badge bg-light text-dark me-2">{painting.price}</span></div>
                <div className="mb-2"><strong>Description:</strong><br /><span className="text-muted">{painting.description}</span></div>
              </div>
              <div className="col-md-6 d-flex flex-column align-items-end justify-content-end">
                <button className="btn btn-success btn-lg rounded-pill px-4 mb-2" onClick={demoMode ? handleReserveDemo : handleReserve} disabled={reserving} style={{minWidth:180}}>{reserving ? 'Reserving...' : 'Reserve'}</button>
                <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => navigate('/messages', { state: { userId: painting.artistId } })}><i className="bi bi-chat-dots me-1"></i> DM Artist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaintingViewerPage; 