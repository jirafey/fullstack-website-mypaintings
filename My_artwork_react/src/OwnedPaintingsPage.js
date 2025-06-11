import React, { useState, useEffect } from 'react';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import './OwnedPaintingsPage.css';
import { useNavigate } from 'react-router-dom';

const DEMO_OWNED_PAINTINGS = [
  {
    id: 1,
    title: 'Abstract Dreams',
    artist: 'DemoArtist',
    artistId: 1,
    image: 'https://picsum.photos/400/400?random=1',
    price: '$1,200',
    status: 'Sent',
    takenDate: '2024-04-15',
    size: '100x70 cm'
  },
  {
    id: 2,
    title: 'Ocean Waves',
    artist: 'DemoArtist',
    artistId: 1,
    image: 'https://picsum.photos/400/400?random=2',
    price: '$800',
    status: 'In delivery',
    takenDate: '2024-04-22',
    size: '120x90 cm'
  },
  {
    id: 3,
    title: 'City Lights',
    artist: 'DemoArtist',
    artistId: 1,
    image: 'https://picsum.photos/400/400?random=3',
    price: '$1,500',
    status: 'Received',
    takenDate: '2024-04-10',
    size: '80x60 cm'
  },
];

function OwnedPaintingsPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const navigate = useNavigate();
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

  const handleGenerateQR = (id) => {
    toast('QR code generated (demo).', 'info');
    // Realnie: wyświetlić modal / przekierować
  };

  const handleMessageArtist = (artistId) => {
    toast('Opening chat with artist (demo)', 'info');
    navigate('/messages'); // Można dodać np. query param: `/messages?artist=1`
  };

  const handleInsertDemo = () => {
    const newId = Math.max(0, ...paintings.map(p => p.id)) + 1;
    const newPainting = {
      id: newId,
      title: 'Colors',
      artist: 'DemoArtist',
      artistId: 1,
      image: 'https://picsum.photos/400/400?random=' + newId,
      price: '$1,200',
      status: 'Sent',
      takenDate: '2024-04-15',
      size: '100x70 cm'
    };
    setPaintings([newPainting, ...paintings]);
    toast('Inserted demo painting.', 'info');
  };


  if (loading) return <div className="text-center py-5">Loading owned paintings...</div>;

  return (
      <div className="container mt-4">
        <h2>Owned Paintings</h2>
        {demoMode && (
            <div className="mb-3 text-end">
              <button className="demo-button" onClick={handleInsertDemo}>
              </button>
            </div>
        )}

        <div className="row">
          {paintings.map(painting => (
              <div key={painting.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={painting.image} className="card-img-top" alt={painting.title} />
                  <div className="card-body">
                    <h5 className="card-title">{painting.title}</h5>
                    <p className="card-text">
                      Artist: <a href={`/profile/${painting.artistId}`}>{painting.artist}</a>
                    </p>
                    <p className="card-text">Size: {painting.size}</p>
                    <p className="card-text">Taken on: {painting.takenDate}</p>
                    <p className="card-text">Price: {painting.price}</p>
                    <p className="card-text">Status: {painting.status}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-info" onClick={() => handleGenerateQR(painting.id)}>
                        Generate QR
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => handleMessageArtist(painting.artistId)}>
                        Message Artist
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
