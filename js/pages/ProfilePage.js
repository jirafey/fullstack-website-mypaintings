import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';

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

export class ProfilePage {
    constructor(container) {
        this.container = container;
        this.profile = null;
        this.loading = true;
        this.demoMode = true; // For testing purposes

        this.render();
        this.loadProfile();
    }

    async loadProfile() {
        if (this.demoMode) {
            // For demo purposes, use the DEMO_DATA
            const userType = 'ARTYSTA'; // This would come from auth in a real app
            this.profile = DEMO_DATA[userType];
            this.loading = false;
            this.render();
            return;
        }

        try {
            const userId = new URLSearchParams(window.location.search).get('id');
            const data = await api.get(`/profile/${userId}`);
            this.profile = data;
        } catch (err) {
            toaster.error(`Error loading profile: ${err.message}`);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading profile...</span>
                    </div>
                </div>
            `;
            return;
        }

        if (!this.profile) {
            this.container.innerHTML = `
                <div class="alert alert-danger">
                    Profile not found.
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="profile-page">
                <div class="cover-image" style="background-image: url(${this.profile.coverImage})"></div>

                <div class="container">
                    <div class="profile-header">
                        <div class="avatar-container">
                            <img src="${this.profile.avatar}" alt="${this.profile.username}" class="avatar" />
                        </div>
                        <div class="profile-info">
                            <h1>${this.profile.fullName}</h1>
                            <p class="username">@${this.profile.username}</p>
                            <p class="bio">${this.profile.bio}</p>
                        </div>
                    </div>

                    <div class="stats-container">
                        <div class="stat">
                            <span class="stat-value">${this.profile.stats.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${this.profile.stats.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${this.profile.stats.artworks}</span>
                            <span class="stat-label">Artworks</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${this.profile.stats.likes}</span>
                            <span class="stat-label">Likes</span>
                        </div>
                    </div>

                    ${this.profile.artworks.length > 0 ? `
                        <div class="artworks-section">
                            <h2>Artworks</h2>
                            <div class="artworks-grid">
                                ${this.profile.artworks.map(artwork => `
                                    <div class="artwork-card">
                                        <img src="${artwork.image}" alt="${artwork.title}" />
                                        <div class="artwork-info">
                                            <h3>${artwork.title}</h3>
                                            <p class="price">${artwork.price}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
} 