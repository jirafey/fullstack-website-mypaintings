import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import apiRequest from './api';
import './ProfilePage.css';

// Demo data for testing
const DEMO_DATA = {
  ARTYSTA: {
    id: 1,
    username: "DemoArtist",
    fullName: "John Doe",
    bio: "Contemporary artist specializing in abstract paintings. Based in New York.",
    avatar: "https://picsum.photos/200",
    coverImage: "https://picsum.photos/1200/300",
    stats: {
      followers: 245,
      following: 123,
      artworks: 15,
      likes: 1234
    },
    artworks: [
      { id: 1, title: "Abstract Dreams", image: "https://picsum.photos/400/400?random=1", price: "$1,200" },
      { id: 2, title: "Ocean Waves", image: "https://picsum.photos/400/400?random=2", price: "$800" },
      { id: 3, title: "City Lights", image: "https://picsum.photos/400/400?random=3", price: "$1,500" },
    ]
  },
  HOTEL: {
    id: 2,
    username: "DemoHotel",
    fullName: "Grand Hotel & Spa",
    bio: "Luxury 5-star hotel featuring contemporary art exhibitions.",
    avatar: "https://picsum.photos/200?random=4",
    coverImage: "https://picsum.photos/1200/300?random=5",
    stats: {
      followers: 1234,
      following: 89,
      artworks: 45,
      likes: 5678
    },
    artworks: [
      { id: 4, title: "Hotel Gallery", image: "https://picsum.photos/400/400?random=6", price: "Exhibition" },
      { id: 5, title: "Art Space", image: "https://picsum.photos/400/400?random=7", price: "Exhibition" },
      { id: 6, title: "Lobby Art", image: "https://picsum.photos/400/400?random=8", price: "Exhibition" },
    ]
  },
  GOSC: {
    id: 3,
    username: "DemoGuest",
    fullName: "Alice Smith",
    bio: "Art enthusiast and collector. Love discovering new artists.",
    avatar: "https://picsum.photos/200?random=9",
    coverImage: "https://picsum.photos/1200/300?random=10",
    stats: {
      followers: 56,
      following: 234,
      artworks: 0,
      likes: 890
    },
    artworks: []
  }
};

function ProfilePage() {
  const { userId } = useParams();
  const { userType } = useSession();
  const showToast = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll use the DEMO_DATA
    // In a real app, you'd fetch this from the API
    setProfile(DEMO_DATA[userType]);
    setLoading(false);
  }, [userType]);

  if (loading) return <div className="text-center py-5">Loading profile...</div>;
  if (!profile) return <div className="alert alert-danger">Profile not found.</div>;

  return (
    <div className="profile-page">
      {/* Cover Image */}
      <div className="cover-image" style={{ backgroundImage: `url(${profile.coverImage})` }}></div>

      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-container">
            <img src={profile.avatar} alt={profile.username} className="avatar" />
          </div>
          <div className="profile-info">
            <h1>{profile.fullName}</h1>
            <p className="username">@{profile.username}</p>
            <p className="bio">{profile.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat">
            <span className="stat-value">{profile.stats.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{profile.stats.following}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-value">{profile.stats.artworks}</span>
            <span className="stat-label">Artworks</span>
          </div>
          <div className="stat">
            <span className="stat-value">{profile.stats.likes}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>

        {/* Artworks Grid */}
        {profile.artworks.length > 0 && (
          <div className="artworks-section">
            <h2>Artworks</h2>
            <div className="artworks-grid">
              {profile.artworks.map(artwork => (
                <div key={artwork.id} className="artwork-card">
                  <img src={artwork.image} alt={artwork.title} />
                  <div className="artwork-info">
                    <h3>{artwork.title}</h3>
                    <p className="price">{artwork.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage; 