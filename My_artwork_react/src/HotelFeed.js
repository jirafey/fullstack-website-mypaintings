import React, { useEffect, useState } from 'react';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from './DemoModeContext';

// Demo artworks data
const DEMO_ARTWORKS = [
  {
    id: 1,
    title: 'Abstract Dreams',
    artistName: 'John Doe',
    artistId: 101,
    price: '$1,200',
    likes: 12,
    image_url: 'https://picsum.photos/300/300?random=1',
  },
  {
    id: 2,
    title: 'Ocean Waves',
    artistName: 'Jane Smith',
    artistId: 102,
    price: '$800',
    likes: 8,
    image_url: 'https://picsum.photos/300/300?random=2',
  },
  {
    id: 3,
    title: 'City Lights',
    artistName: 'Alex Brown',
    artistId: 103,
    price: '$1,500',
    likes: 20,
    image_url: 'https://picsum.photos/300/300?random=3',
  },
  {
    id: 4,
    title: 'Forest Path',
    artistName: 'Emily White',
    artistId: 104,
    price: '$950',
    likes: 5,
    image_url: 'https://picsum.photos/300/300?random=4',
  },
  {
    id: 5,
    title: 'Golden Hour',
    artistName: 'Chris Green',
    artistId: 105,
    price: '$2,000',
    likes: 17,
    image_url: 'https://picsum.photos/300/300?random=5',
  },
  {
    id: 6,
    title: 'Urban Jungle',
    artistName: 'Pat Lee',
    artistId: 106,
    price: '$1,100',
    likes: 9,
    image_url: 'https://picsum.photos/300/300?random=6',
  },
  {
    id: 7,
    title: 'Sunset Boulevard',
    artistName: 'Morgan Black',
    artistId: 107,
    price: '$1,800',
    likes: 14,
    image_url: 'https://picsum.photos/300/300?random=7',
  },
  {
    id: 8,
    title: 'Blue Silence',
    artistName: 'Taylor Red',
    artistId: 108,
    price: '$1,300',
    likes: 11,
    image_url: 'https://picsum.photos/300/300?random=8',
  },
  {
    id: 9,
    title: 'Mountain Mist',
    artistName: 'Jordan Violet',
    artistId: 109,
    price: '$1,600',
    likes: 7,
    image_url: 'https://picsum.photos/300/300?random=9',
  },
  {
    id: 10,
    title: 'Desert Rose',
    artistName: 'Casey Blue',
    artistId: 110,
    price: '$1,400',
    likes: 10,
    image_url: 'https://picsum.photos/300/300?random=10',
  },
  {
    id: 11,
    title: 'Night Reflections',
    artistName: 'Robin Gold',
    artistId: 111,
    price: '$1,700',
    likes: 13,
    image_url: 'https://picsum.photos/300/300?random=11',
  },
  {
    id: 12,
    title: 'Spring Fields',
    artistName: 'Sky Silver',
    artistId: 112,
    price: '$1,250',
    likes: 6,
    image_url: 'https://picsum.photos/300/300?random=12',
  },
];

function HotelFeed() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userType } = useSession();
  const toast = useToast();
  const navigate = useNavigate();
  const { demoMode } = useDemoMode();

  useEffect(() => {
    if (demoMode) {
      setArtworks(DEMO_ARTWORKS);
      setLoading(false);
      return;
    }
    setLoading(true);
    apiRequest('/artysta/wszystkiedziela')
      .then(data => setArtworks(data?.dziela || []))
      .catch(err => toast('Błąd pobierania dzieł: ' + err.message, 'danger'))
      .finally(() => setLoading(false));
  }, [demoMode, toast]);

  // Demo actions
  const handleLikeDemo = (id) => {
    setArtworks(arts => arts.map(a => a.id === id ? { ...a, likes: (a.likes || 0) + 1 } : a));
    toast('Liked artwork.', 'success');
  };
  const handleReserveDemo = (id) => {
    toast('Artwork reserved!', 'success');
  };
  const handleDMDemo = (artistId) => {
    navigate('/messages', { state: { userId: artistId } });
  };
  const handleDeleteDemo = (id) => {
    setArtworks(arts => arts.filter(a => a.id !== id));
    toast('Artwork deleted.', 'warning');
  };
  const handleInsertDemo = () => {
    const newId = Math.max(...artworks.map(a => a.id)) + 1;
    const newArt = {
      id: newId,
      title: 'New Artwork ' + newId,
      artistName: 'Demo Artist',
      artistId: 999,
      price: '$999',
      likes: 0,
      image_url: `https://picsum.photos/300/300?random=${newId}`,
    };
    setArtworks([newArt, ...artworks]);
    toast('Artwork inserted.', 'info');
  };

  // Real API actions (no-op for now, can be implemented as needed)
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
    navigate('/messages', { state: { userId: artistId } });
  };

  if (loading) return <div className="text-center py-5">Ładowanie...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Hotel Feed – Wszystkie dzieła</h2>
        {demoMode && <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Artwork</button>}
      </div>
      <div className="row">
        {artworks.map(art => (
          <div className="col-md-6 col-lg-4 mb-4" key={art.id}>
            <div className="artwork-item d-flex flex-column p-2 border rounded bg-white shadow-sm h-100">
              <div className="artwork-image mb-2 text-center">
                <img src={art.image_url || '/img.png'} alt={art.title || 'Dzieło'} className="img-fluid rounded" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              </div>
              <div className="artwork-details flex-grow-1 d-flex flex-column">
                <p className="fw-bold mb-1">{art.title}</p>
                <p><strong>Artysta:</strong> {art.artistName || art.artistId}</p>
                <p><strong>Price:</strong> {art.price}</p>
                <p><small>Likes: {art.likes || 0}</small></p>
                <div className="mt-auto text-end">
                  {demoMode ? (
                    <>
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleLikeDemo(art.id)}>Like</button>
                      <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleReserveDemo(art.id)}>Reserve</button>
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleDMDemo(art.artistId)}>DM</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteDemo(art.id)}>Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleLike(art.id)}>Like</button>
                      <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleReserve(art.id)}>Reserve</button>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDM(art.artistId)}>DM</button>
                    </>
                  )}
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