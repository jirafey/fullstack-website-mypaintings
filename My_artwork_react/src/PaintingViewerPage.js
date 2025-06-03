import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';

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

  return (
    <div className="container mt-4" style={{maxWidth:700}}>
      <h2 className="mb-3">{painting.title}</h2>
      <img src={painting.imageUrl || painting.image_url || '/img.png'} alt={painting.title} className="img-fluid mb-3" style={{maxHeight:400}} />
      <p><strong>Artist:</strong> {painting.artist} {userType === 'HOTEL' && painting.artistId && (
        <button className="btn btn-outline-primary btn-sm ms-2" onClick={demoMode ? handleFollowToggleDemo : handleFollowToggle} disabled={followLoading}>
          {followLoading ? '...' : isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      )}</p>
      <p><strong>Price:</strong> {painting.price}</p>
      <p><strong>Description:</strong> {painting.description}</p>
      <button className="btn btn-success" onClick={demoMode ? handleReserveDemo : handleReserve} disabled={reserving}>{reserving ? 'Reserving...' : 'Reserve / Buy'}</button>
    </div>
  );
}

export default PaintingViewerPage; 