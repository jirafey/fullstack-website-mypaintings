import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';

// Demo artworks data
const DEMO_ARTWORKS = [
    {
        id: 1,
        title: 'Abstract Dreams',
        date_of_post: '2024-05-01',
        price: '$1,200',
        hotel: 'Grand Hotel',
        viewers: 120,
        likes: 12,
        image_url: 'https://picsum.photos/300/300?random=21',
    },
    // ... other demo artworks
];

export class MyArtworkPage {
    constructor(container) {
        this.container = container;
        this.artworks = [];
        this.loading = true;
        this.error = null;
        this.demoMode = true; // For testing purposes

        this.render();
        this.loadArtworks();
    }

    async loadArtworks() {
        if (this.demoMode) {
            this.artworks = DEMO_ARTWORKS;
            this.loading = false;
            this.error = null;
            this.render();
            return;
        }

        this.loading = true;
        this.error = null;
        this.render();

        try {
            const data = await api.getArtworks();
            if (data && Array.isArray(data.dziela)) {
                this.artworks = data.dziela;
            } else {
                this.error = 'Invalid data format from backend.';
            }
        } catch (err) {
            this.error = `Error loading artworks: ${err.message}`;
        } finally {
            this.loading = false;
            this.render();
        }
    }

    formatPrice(price) {
        if (typeof price === 'number') {
            return `$${price.toFixed(2)}`;
        }
        if (typeof price === 'string' && price.startsWith('$')) {
            return price;
        }
        return price || 'N/A';
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    }

    async handleDelete(artworkId) {
        if (!window.confirm(`Are you sure you want to delete artwork with ID: ${artworkId}?`)) {
            return;
        }

        if (this.demoMode) {
            this.artworks = this.artworks.filter(art => art.id !== artworkId);
            toaster.success('Artwork deleted (demo).');
            this.render();
            return;
        }

        try {
            await api.deleteArtwork(artworkId);
            this.artworks = this.artworks.filter(art => art.id !== artworkId);
            toaster.success('Artwork deleted successfully.');
            this.render();
        } catch (err) {
            toaster.error(`Error deleting artwork: ${err.message}`);
        }
    }

    async handleLike(artworkId) {
        if (this.demoMode) {
            this.artworks = this.artworks.map(art => 
                art.id === artworkId 
                    ? { ...art, likes: (art.likes || 0) + 1 }
                    : art
            );
            toaster.success('Artwork liked (demo).');
            this.render();
            return;
        }

        try {
            await api.post(`/hotel/painting/like/${artworkId}`);
            this.artworks = this.artworks.map(art => 
                art.id === artworkId 
                    ? { ...art, likes: (art.likes || 0) + 1 }
                    : art
            );
            toaster.success('Artwork liked successfully.');
            this.render();
        } catch (err) {
            toaster.error(`Error liking artwork: ${err.message}`);
        }
    }

    async handleUnlike(artworkId) {
        if (this.demoMode) {
            this.artworks = this.artworks.map(art => 
                art.id === artworkId 
                    ? { ...art, likes: Math.max((art.likes || 1) - 1, 0) }
                    : art
            );
            toaster.info('Like removed (demo).');
            this.render();
            return;
        }

        try {
            await api.delete(`/hotel/painting/like/${artworkId}`);
            this.artworks = this.artworks.map(art => 
                art.id === artworkId 
                    ? { ...art, likes: Math.max((art.likes || 1) - 1, 0) }
                    : art
            );
            toaster.info('Like removed successfully.');
            this.render();
        } catch (err) {
            toaster.error(`Error removing like: ${err.message}`);
        }
    }

    async handleReserve(artworkId) {
        if (this.demoMode) {
            toaster.success('Artwork reserved (demo)!');
            return;
        }

        try {
            await api.post(`/wiadomosci/reservepainting/${artworkId}`);
            toaster.success('Artwork reserved successfully!');
        } catch (err) {
            toaster.error(`Error reserving artwork: ${err.message}`);
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="container mt-4">
                <h1 class="page-title">My Artwork</h1>
                
                ${this.loading ? `
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ` : this.error ? `
                    <div class="alert alert-danger" role="alert">
                        ${this.error}
                    </div>
                ` : `
                    <div class="row">
                        ${this.artworks.map(artwork => `
                            <div class="col-md-6 mb-4">
                                <div class="card artwork-item">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="artwork-image me-3">
                                                <img src="${artwork.image_url || '/img.png'}" 
                                                     alt="${artwork.title}" 
                                                     class="img-fluid"
                                                     style="width: 150px; height: 150px; object-fit: cover;">
                                            </div>
                                            <div class="artwork-details flex-grow-1">
                                                <h5 class="card-title">${artwork.title}</h5>
                                                <p><strong>Date:</strong> ${this.formatDate(artwork.date_of_post)}</p>
                                                <p><strong>Price:</strong> ${this.formatPrice(artwork.price)}</p>
                                                <p><strong>Hotel:</strong> <span class="hotel-link">${artwork.hotel}</span></p>
                                                <p><strong>Views:</strong> ${artwork.viewers || 0}</p>
                                                <p><strong>Likes:</strong> ${artwork.likes || 0}</p>
                                            </div>
                                        </div>
                                        <div class="mt-3 d-flex justify-content-between align-items-center">
                                            <div>
                                                <button class="btn btn-outline-primary btn-sm me-2" 
                                                        onclick="window.myArtworkPage.handleLike(${artwork.id})">
                                                    <i class="bi bi-heart"></i> Like
                                                </button>
                                                <button class="btn btn-outline-primary btn-sm me-2" 
                                                        onclick="window.myArtworkPage.handleUnlike(${artwork.id})">
                                                    <i class="bi bi-heart-fill"></i> Unlike
                                                </button>
                                                <button class="btn btn-outline-success btn-sm" 
                                                        onclick="window.myArtworkPage.handleReserve(${artwork.id})">
                                                    <i class="bi bi-bookmark"></i> Reserve
                                                </button>
                                            </div>
                                            <button class="btn btn-danger btn-sm delete-button" 
                                                    onclick="window.myArtworkPage.handleDelete(${artwork.id})">
                                                <i class="bi bi-x"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;

        // Make the instance available globally for event handlers
        window.myArtworkPage = this;
    }
} 