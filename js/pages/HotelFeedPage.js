import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';
import { router } from '../utils/router.js';

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
        artistAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        artistId: 103,
        price: '$1,500',
        likes: 20,
        image_url: 'https://picsum.photos/400/400?random=3',
        description: 'A vibrant cityscape capturing urban life.'
    },
    {
        id: 4,
        title: 'Forest Path',
        artistName: 'Emily White',
        artistAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        artistId: 104,
        price: '$950',
        likes: 5,
        image_url: 'https://picsum.photos/400/400?random=4',
        description: 'A serene path through an ancient forest.'
    },
    {
        id: 5,
        title: 'Golden Hour',
        artistName: 'Chris Green',
        artistAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        artistId: 105,
        price: '$2,000',
        likes: 17,
        image_url: 'https://picsum.photos/400/400?random=5',
        description: 'Capturing the magical moments of sunset.'
    },
    {
        id: 6,
        title: 'Urban Jungle',
        artistName: 'Pat Lee',
        artistAvatar: 'https://randomuser.me/api/portraits/women/55.jpg',
        artistId: 106,
        price: '$1,100',
        likes: 9,
        image_url: 'https://picsum.photos/400/400?random=6',
        description: 'The concrete jungle comes alive.'
    },
    {
        id: 7,
        title: 'Sunset Boulevard',
        artistName: 'Morgan Black',
        artistAvatar: 'https://randomuser.me/api/portraits/men/66.jpg',
        artistId: 107,
        price: '$1,800',
        likes: 14,
        image_url: 'https://picsum.photos/400/400?random=7',
        description: 'A cinematic view of city life at dusk.'
    },
    {
        id: 8,
        title: 'Blue Silence',
        artistName: 'Taylor Red',
        artistAvatar: 'https://randomuser.me/api/portraits/women/77.jpg',
        artistId: 108,
        price: '$1,300',
        likes: 11,
        image_url: 'https://picsum.photos/400/400?random=8',
        description: 'A meditative exploration of blue tones.'
    },
    {
        id: 9,
        title: 'Mountain Mist',
        artistName: 'Jordan Violet',
        artistAvatar: 'https://randomuser.me/api/portraits/men/88.jpg',
        artistId: 109,
        price: '$1,600',
        likes: 7,
        image_url: 'https://picsum.photos/400/400?random=9',
        description: 'Mysterious mountains shrouded in mist.'
    },
    {
        id: 10,
        title: 'Desert Rose',
        artistName: 'Casey Blue',
        artistAvatar: 'https://randomuser.me/api/portraits/women/99.jpg',
        artistId: 110,
        price: '$1,400',
        likes: 10,
        image_url: 'https://picsum.photos/400/400?random=10',
        description: 'Beauty blooming in harsh conditions.'
    },
    {
        id: 11,
        title: 'Night Reflections',
        artistName: 'Robin Gold',
        artistAvatar: 'https://randomuser.me/api/portraits/men/111.jpg',
        artistId: 111,
        price: '$1,700',
        likes: 13,
        image_url: 'https://picsum.photos/400/400?random=11',
        description: 'City lights dancing on water.'
    },
    {
        id: 12,
        title: 'Spring Fields',
        artistName: 'Sky Silver',
        artistAvatar: 'https://randomuser.me/api/portraits/women/122.jpg',
        artistId: 112,
        price: '$1,250',
        likes: 6,
        image_url: 'https://picsum.photos/400/400?random=12',
        description: 'The awakening of nature in spring.'
    }
];

export class HotelFeedPage {
    constructor(container) {
        this.container = container;
        this.artworks = [];
        this.loading = true;
        this.demoMode = true; // For testing purposes

        this.loadArtworks();
        this.render();
    }

    async loadArtworks() {
        if (this.demoMode) {
            this.artworks = DEMO_ARTWORKS;
            this.loading = false;
            this.render();
            return;
        }

        try {
            const data = await api.get('/artysta/wszystkiedziela');
            this.artworks = data?.dziela || [];
        } catch (error) {
            toaster.error('Error loading artworks: ' + error.message);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    handleLike(id) {
        if (this.demoMode) {
            this.artworks = this.artworks.map(art => 
                art.id === id ? { ...art, likes: (art.likes || 0) + 1 } : art
            );
            toaster.success('Liked artwork.');
            this.render();
            return;
        }

        api.post(`/hotel/painting/like/${id}`)
            .then(() => {
                this.artworks = this.artworks.map(art => 
                    art.id === id ? { ...art, likes: (art.likes || 0) + 1 } : art
                );
                toaster.success('Liked artwork.');
                this.render();
            })
            .catch(error => {
                toaster.error('Error liking artwork: ' + error.message);
            });
    }

    handleReserve(id) {
        if (this.demoMode) {
            toaster.success('Artwork reserved!');
            return;
        }

        api.post(`/wiadomosci/reservepainting/${id}`)
            .then(() => {
                toaster.success('Artwork reserved!');
            })
            .catch(error => {
                toaster.error('Error reserving artwork: ' + error.message);
            });
    }

    handleDM(artistId) {
        router.navigate('/messages', { userId: artistId });
    }

    handleDelete(id) {
        if (!this.demoMode) return;

        this.artworks = this.artworks.filter(art => art.id !== id);
        toaster.warning('Artwork deleted.');
        this.render();
    }

    handleInsert() {
        if (!this.demoMode) return;

        const newId = Math.max(...this.artworks.map(art => art.id)) + 1;
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

        this.artworks = [newArt, ...this.artworks];
        toaster.info('Artwork inserted.');
        this.render();
    }

    attachEventListeners() {
        // Attach event listeners to all artwork cards
        this.container.querySelectorAll('.artwork-card').forEach(card => {
            const id = parseInt(card.dataset.id);
            const artistId = parseInt(card.dataset.artistId);

            card.querySelector('.btn-like').addEventListener('click', () => this.handleLike(id));
            card.querySelector('.btn-reserve').addEventListener('click', () => this.handleReserve(id));
            card.querySelector('.btn-dm').addEventListener('click', () => this.handleDM(artistId));
            
            const deleteBtn = card.querySelector('.btn-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.handleDelete(id));
            }
        });

        // Attach event listener to insert button
        const insertBtn = this.container.querySelector('.btn-insert');
        if (insertBtn) {
            insertBtn.addEventListener('click', () => this.handleInsert());
        }
    }

    render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="text-center py-5">Loading...</div>';
            return;
        }

        this.container.innerHTML = `
            <div class="container py-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="page-title">Gallery</h1>
                    ${this.demoMode ? '<button class="btn btn-primary btn-insert">Insert Demo Artwork</button>' : ''}
                </div>
                <div class="hotel-feed-grid">
                    ${this.artworks.map(art => `
                        <div class="artwork-card" data-id="${art.id}" data-artist-id="${art.artistId}">
                            <div class="artwork-image-wrapper">
                                <img src="${art.image_url}" 
                                     alt="${art.title}"
                                     class="artwork-image"
                                     onerror="this.onerror=null; this.src='https://via.placeholder.com/400x400?text=Artwork+Not+Available';"
                                     loading="lazy">
                            </div>
                            <div class="artwork-artist">
                                <img src="${art.artistAvatar || 'https://via.placeholder.com/50x50?text=Artist'}" 
                                     alt="${art.artistName}"
                                     class="artist-avatar"
                                     onerror="this.onerror=null; this.src='https://via.placeholder.com/50x50?text=Artist';">
                                <span>${art.artistName}</span>
                            </div>
                            <div class="artwork-card-body">
                                <h3 class="artwork-title">${art.title}</h3>
                                <p class="artwork-price">${art.price}</p>
                                <p class="artwork-description">${art.description || 'No description available.'}</p>
                                <div class="artwork-actions">
                                    <button class="btn btn-primary btn-like">
                                        <i class="fas fa-heart"></i> ${art.likes || 0}
                                    </button>
                                    <button class="btn btn-success btn-reserve">
                                        <i class="fas fa-shopping-cart"></i> Reserve
                                    </button>
                                    <button class="btn btn-secondary btn-dm">
                                        <i class="fas fa-envelope"></i> DM
                                    </button>
                                    ${this.demoMode ? `
                                        <button class="btn btn-danger btn-delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }
} 