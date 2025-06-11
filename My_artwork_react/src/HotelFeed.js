import React, { useEffect, useState } from 'react';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from './DemoModeContext';
import './HotelFeed.css';
import { Link } from 'react-router-dom';

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
    artistName: 'Alexandra Brown',
    artistAvatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    artistId: 103,
    price: '$1,500',
    likes: 20,
    image_url: 'https://picsum.photos/300/300?random=3',
  },
  {
    id: 4,
    title: 'Forest Path',
    artistName: 'Emily White',
    artistAvatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    artistId: 104,
    price: '$950',
    likes: 5,
    image_url: 'https://picsum.photos/300/300?random=4',
  },
  {
    id: 5,
    title: 'Golden Hour',
    artistName: 'Chris Green',
    artistAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    artistId: 105,
    price: '$2,000',
    likes: 17,
    image_url: 'https://picsum.photos/300/300?random=5',
  },
  {
    id: 6,
    title: 'Evening Glow',
    artistName: 'Liam Stone',
    artistAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    artistId: 106,
    price: '$1,100',
    likes: 6,
    image_url: 'https://picsum.photos/300/300?random=6',
  },
  {
    id: 7,
    title: 'Violet Breeze',
    artistName: 'Mia Rose',
    artistAvatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    artistId: 107,
    price: '$990',
    likes: 14,
    image_url: 'https://picsum.photos/300/300?random=7',
  },
  {
    id: 8,
    title: 'Golden Horizon',
    artistName: 'Noah Reed',
    artistAvatar: 'https://randomuser.me/api/portraits/men/53.jpg',
    artistId: 108,
    price: '$1,450',
    likes: 11,
    image_url: 'https://picsum.photos/300/300?random=8',
  },
  {
    id: 9,
    title: 'Mystic Woods',
    artistName: 'Isabella Lane',
    artistAvatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    artistId: 109,
    price: '$1,200',
    likes: 9,
    image_url: 'https://picsum.photos/300/300?random=9',
  },
  {
    id: 10,
    title: 'Blue Symphony',
    artistName: 'James Black',
    artistAvatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    artistId: 110,
    price: '$1,600',
    likes: 18,
    image_url: 'https://picsum.photos/300/300?random=10',
  },
  {
    id: 11,
    title: 'Crimson Sky',
    artistName: 'Olivia Night',
    artistAvatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    artistId: 111,
    price: '$1,300',
    likes: 7,
    image_url: 'https://picsum.photos/300/300?random=11',
  },
  {
    id: 12,
    title: 'Frozen Lake',
    artistName: 'Ethan West',
    artistAvatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    artistId: 112,
    price: '$1,250',
    likes: 5,
    image_url: 'https://picsum.photos/300/300?random=12',
  },
  {
    id: 13,
    title: 'Rose Garden',
    artistName: 'Sophia Bloom',
    artistAvatar: 'https://randomuser.me/api/portraits/women/57.jpg',
    artistId: 113,
    price: '$980',
    likes: 15,
    image_url: 'https://picsum.photos/300/300?random=13',
  },
  {
    id: 14,
    title: 'Canyon Echoes',
    artistName: 'Daniel Flint',
    artistAvatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    artistId: 114,
    price: '$1,750',
    likes: 19,
    image_url: 'https://picsum.photos/300/300?random=14',
  },
  {
    id: 15,
    title: 'Silent Storm',
    artistName: 'Emma Frost',
    artistAvatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    artistId: 115,
    price: '$1,380',
    likes: 13,
    image_url: 'https://picsum.photos/300/300?random=15',
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
      {/* Following Artists */}
      <div className="mb-4">
        <h5 className="mb-2">Following Artists</h5>
        <div className="d-flex overflow-auto gap-3">
          {[101, 102, 103, 104].map(id => (
              <Link to={`/profile/${id}`} key={id} className="d-flex flex-column align-items-center text-decoration-none text-dark">
                <img src={`https://randomuser.me/api/portraits/${id % 2 === 0 ? 'men' : 'women'}/${id % 100}.jpg`} alt="Artist" className="rounded-circle mb-1" width={48} height={48} />
                <span className="small text-center">DemoArtist{id}</span>
              </Link>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Gallery</h2>
        {demoMode && <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Artwork</button>}
      </div>
      <div className="row g-4 hotel-feed-grid">
        {artworks.map(art => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={art.id}>
            <div className="artwork-card shadow-sm rounded-4 h-100 d-flex flex-column">
              <div className="artwork-image-wrapper position-relative">
                <Link to={`/view-painting/${art.id}`}>
                  <img
                      src={art.image_url || '/img.png'}
                      alt={art.title || 'Artwork'}
                      className="artwork-image rounded-4 w-100"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                  />
                </Link>
                <Link
                    to={`/profile/${art.artistId}`}
                    className="artwork-artist-mini"
                >
                  <img src={art.artistAvatar} alt={art.artistName} />
                  <span>{art.artistName}</span>
                </Link>



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