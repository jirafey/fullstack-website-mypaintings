import React, { useEffect, useState } from 'react';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useNavigate } from 'react-router-dom';

function HotelFeed() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userType } = useSession();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== 'HOTEL') {
      toast('Tylko dla hoteli!', 'danger');
      navigate('/landing');
      return;
    }
    apiRequest('/artysta/wszystkiedziela')
      .then(data => setArtworks(data?.dziela || []))
      .catch(err => toast('Błąd pobierania dzieł: ' + err.message, 'danger'))
      .finally(() => setLoading(false));
  }, [userType, toast, navigate]);

  const handleLike = async (id) => {
    try {
      await apiRequest(`/hotel/painting/like/${id}`, { method: 'POST' });
      setArtworks(arts => arts.map(a => a.id === id ? { ...a, likes: (a.likes || 0) + 1 } : a));
      toast('Polubiono dzieło.', 'success');
    } catch (err) {
      toast('Błąd polubienia: ' + err.message, 'danger');
    }
  };
  const handleReserve = async (id) => {
    try {
      await apiRequest(`/wiadomosci/reservepainting/${id}`, { method: 'POST' });
      toast('Obraz zarezerwowany!', 'success');
    } catch (err) {
      toast('Błąd rezerwacji: ' + err.message, 'danger');
    }
  };
  const handleDM = (artistId) => {
    // Przekieruj do /messages i przekaż artistId (można rozwinąć o context lub query param)
    navigate('/messages', { state: { userId: artistId } });
  };

  if (loading) return <div className="text-center py-5">Ładowanie...</div>;

  return (
    <div className="container mt-4">
      <h2>Hotel Feed – Wszystkie dzieła</h2>
      <div className="row">
        {artworks.map(art => (
          <div className="col-md-6 mb-4" key={art.id}>
            <div className="artwork-item d-flex p-2 border rounded bg-white shadow-sm">
              <div className="artwork-image me-3">
                <img src={art.image_url || '/img.png'} alt={art.title || 'Dzieło'} className="img-fluid rounded" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              </div>
              <div className="artwork-details d-flex flex-column flex-grow-1">
                <p className="fw-bold mb-1">{art.title}</p>
                <p><strong>Artysta:</strong> {art.artistName || art.artistId}</p>
                <p><strong>Price:</strong> {art.price}</p>
                <p><small>Likes: {art.likes || 0}</small></p>
                <div className="mt-auto text-end">
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleLike(art.id)}>Like</button>
                  <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleReserve(art.id)}>Reserve</button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDM(art.artistId)}>DM</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelFeed; 