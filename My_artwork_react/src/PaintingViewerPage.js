import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';

function PaintingViewerPage() {
  const { paintingId } = useParams();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const { userType, token } = useSession();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest(`/painting/${paintingId}`)
      .then(data => setPainting(data.painting || data))
      .catch(err => toast('Error loading painting: ' + err.message, 'danger'))
      .finally(() => setLoading(false));
  }, [paintingId, toast]);

  const handleReserve = async () => {
    if (!token) {
      toast('You must be logged in to reserve.', 'danger');
      navigate('/login', { state: { redirectTo: `/view-painting/${paintingId}` } });
      return;
    }
    setReserving(true);
    try {
      await apiRequest(`/painting/${paintingId}/reserve`, { method: 'POST' });
      toast('Reservation request sent!', 'success');
    } catch (err) {
      toast('Error reserving: ' + err.message, 'danger');
    } finally {
      setReserving(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading painting...</div>;
  if (!painting) return <div className="alert alert-danger">Painting not found.</div>;

  return (
    <div className="container mt-4" style={{maxWidth:700}}>
      <h2 className="mb-3">{painting.title}</h2>
      <img src={painting.imageUrl || painting.image_url || '/img.png'} alt={painting.title} className="img-fluid mb-3" style={{maxHeight:400}} />
      <p><strong>Artist:</strong> {painting.artist}</p>
      <p><strong>Price:</strong> {painting.price}</p>
      <p><strong>Description:</strong> {painting.description}</p>
      <button className="btn btn-success" onClick={handleReserve} disabled={reserving}>{reserving ? 'Reserving...' : 'Reserve / Buy'}</button>
    </div>
  );
}

export default PaintingViewerPage; 