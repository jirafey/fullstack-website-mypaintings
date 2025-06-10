import React, { useState, useEffect } from 'react';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import './OwnedPaintingsPage.css';

// Demo owned paintings data
const DEMO_OWNED_PAINTINGS = [
  { id: 1, title: 'Abstract Dreams', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=1', price: '$1,200', status: 'On Display' },
  { id: 2, title: 'Ocean Waves', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=2', price: '$800', status: 'In Storage' },
  { id: 3, title: 'City Lights', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=3', price: '$1,500', status: 'On Display' },
];

function OwnedPaintingsPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (demoMode) {
      setPaintings(DEMO_OWNED_PAINTINGS);
      setLoading(false);
      return;
    }
    // TODO: Replace with real API call
    setPaintings([]);
    setLoading(false);
  }, [demoMode]);

  const handleToggleDisplay = (id) => {
    setPaintings(paintings => paintings.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'On Display' ? 'In Storage' : 'On Display';
        return { ...p, status: newStatus };
      }
      return p;
    }));
    toast('Display status updated (demo).', 'success');
  };

  const handleGenerateQR = (id) => {
    toast('QR code generated (demo).', 'info');
    // In a real app, this would generate and display a QR code
  };

  if (loading) return <div className="text-center py-5">Loading owned paintings...</div>;

  return (
    <div className="container mt-4">
      <h2>Owned Paintings</h2>
      <div className="row">
        {paintings.map(painting => (
          <div key={painting.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={painting.image} className="card-img-top" alt={painting.title} />
              <div className="card-body">
                <h5 className="card-title">{painting.title}</h5>
                <p className="card-text">Artist: {painting.artist}</p>
                <p className="card-text">Price: {painting.price}</p>
                <p className="card-text">Status: {painting.status}</p>
                <div className="d-flex gap-2">
                  <button 
                    className={`btn ${painting.status === 'On Display' ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => handleToggleDisplay(painting.id)}
                  >
                    {painting.status === 'On Display' ? 'Move to Storage' : 'Put on Display'}
                  </button>
                  <button 
                    className="btn btn-info"
                    onClick={() => handleGenerateQR(painting.id)}
                  >
                    Generate QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnedPaintingsPage; 