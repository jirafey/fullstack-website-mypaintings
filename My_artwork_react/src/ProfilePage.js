import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
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
  }
};

function ProfilePage({ isOwnProfile }) {
  const { userId } = useParams();
  const { userType } = useSession();
  const showToast = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (isOwnProfile) {
      // ARTYSTA ogląda swój profil
      setProfile(DEMO_DATA.ARTYSTA);
    } else {
      // HOTEL ogląda artystę po ID — na razie zawsze Demo
      setProfile(DEMO_DATA.ARTYSTA);
    }
    setLoading(false);
  }, [isOwnProfile]);

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

              {/* HOTEL widzi przyciski tylko przy cudzym profilu */}
              {!isOwnProfile && userType === 'HOTEL' && (
                  <div className="mt-2">
                    <button
                        className={`btn btn-sm me-2 ${isFollowing ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => window.location.href = '/messages'}
                    >
                      Message
                    </button>
                  </div>
              )}
            </div>
          </div>

          {/* Artworks */}
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
