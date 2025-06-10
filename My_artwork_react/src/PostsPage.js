import React, { useState, useEffect } from 'react';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import './PostsPage.css';

// Demo posts data
const DEMO_POSTS = [
  { id: 1, title: 'Abstract Dreams', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=1', price: '$1,200', status: 'Available' },
  { id: 2, title: 'Ocean Waves', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=2', price: '$800', status: 'Reserved' },
  { id: 3, title: 'City Lights', artist: 'DemoArtist', image: 'https://picsum.photos/400/400?random=3', price: '$1,500', status: 'Available' },
];

function PostsPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (demoMode) {
      setPosts(DEMO_POSTS);
      setLoading(false);
      return;
    }
    // TODO: Replace with real API call
    setPosts([]);
    setLoading(false);
  }, [demoMode]);

  const handleReserve = (id) => {
    setPosts(posts => posts.map(p => p.id === id ? { ...p, status: 'Reserved' } : p));
    toast('Artwork reserved (demo).', 'success');
  };

  const handleCancelReservation = (id) => {
    setPosts(posts => posts.map(p => p.id === id ? { ...p, status: 'Available' } : p));
    toast('Reservation cancelled (demo).', 'info');
  };

  if (loading) return <div className="text-center py-5">Loading posts...</div>;

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">Artist: {post.artist}</p>
                <p className="card-text">Price: {post.price}</p>
                <p className="card-text">Status: {post.status}</p>
                {post.status === 'Available' ? (
                  <button className="btn btn-primary" onClick={() => handleReserve(post.id)}>
                    Reserve
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={() => handleCancelReservation(post.id)}>
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsPage; 