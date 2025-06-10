import React, { useEffect, useState } from 'react';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from './DemoModeContext';
import './HotelFeed.css';

// Demo artworks data
const DEMO_ARTWORKS = [
  {
    id: 1,
    title: 'Abstract Dreams',
    artistName: 'John Doe',
    artistAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    artistId: 101,
    price: '$1,200',
    likes: 12,
    image_url: 'https://picsum.photos/400/400?random=1',
    description: 'A beautiful abstract painting full of color and movement.'
  },
  {
    id: 2,
    title: 'Ocean Waves',
    artistName: 'Jane Smith',
    artistAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    artistId: 102,
    price: '$800',
    likes: 8,
    image_url: 'https://picsum.photos/400/400?random=2',
    description: 'Inspired by the sea and its endless energy.'
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
      artistAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      artistId: 999,
      price: '$999',
      likes: 0,
      image_url: `https://picsum.photos/400/400?random=${newId}`,
      description: 'A new demo artwork.'
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

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Gallery</h2>
        {demoMode && <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Artwork</button>}
      </div>
      <div className="row g-4 hotel-feed-grid">
        {artworks.map(art => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={art.id}>
            <div className="artwork-card shadow-sm rounded-4 h-100 d-flex flex-column">
              <div className="artwork-image-wrapper position-relative">
                <img src={art.image_url || '/img.png'} alt={art.title || 'Artwork'} className="artwork-image rounded-4 w-100" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                <div className="artwork-artist position-absolute top-0 start-0 m-2 d-flex align-items-center bg-white bg-opacity-75 rounded-pill px-2 py-1 shadow-sm">
                  <img src={art.artistAvatar} alt={art.artistName} className="rounded-circle me-2" width={32} height={32} />
                  <span className="fw-semibold">{art.artistName}</span>
                </div>
              </div>
              <div className="artwork-card-body flex-grow-1 d-flex flex-column p-3">
                <h5 className="fw-bold mb-1">{art.title}</h5>
                <p className="text-muted small mb-2">{art.description}</p>
                <div className="d-flex align-items-center mb-2">
                  <span className="ms-auto text-muted small"><i className="bi bi-heart-fill text-danger me-1"></i>{art.likes || 0}</span>
                </div>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm flex-fill" onClick={() => handleLikeDemo(art.id)}><i className="bi bi-heart"></i> Like</button>
                  <button className="btn btn-outline-success btn-sm flex-fill" onClick={() => handleReserveDemo(art.id)}><i className="bi bi-cart-plus"></i> Reserve</button>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-outline-secondary btn-sm flex-fill" onClick={() => handleDMDemo(art.artistId)}><i className="bi bi-chat-dots"></i> DM</button>
                  {demoMode && <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => handleDeleteDemo(art.id)}><i className="bi bi-trash"></i> Delete</button>}
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