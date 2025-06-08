import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';

export class AddArtworkPage {
    constructor(container) {
        this.container = container;
        this.formData = {
            title: '',
            dimensions: '',
            price: '',
            category: '',
            medium: '',
            style: '',
            date: '',
            description: '',
            imageUrl: ''
        };
        this.imagePreview = '';
        this.demoMode = true; // For testing purposes
        this.demoArtworks = [];

        this.render();
        this.attachEventListeners();
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.formData[name] = value;
        
        if (name === 'imageUrl') {
            this.imagePreview = value.trim();
            this.updateImagePreview();
        }
    }

    handleReset() {
        this.formData = {
            title: '',
            dimensions: '',
            price: '',
            category: '',
            medium: '',
            style: '',
            date: '',
            description: '',
            imageUrl: ''
        };
        this.imagePreview = '';
        this.updateImagePreview();
        this.render();
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.demoMode) {
            // Validate fields
            if (!this.formData.title || !this.formData.dimensions || !this.formData.price || 
                !this.formData.category || !this.formData.medium || !this.formData.style || 
                !this.formData.date || !this.formData.description || !this.formData.imageUrl) {
                toaster.error('All fields are required. (demo)');
                return;
            }

            this.demoArtworks.unshift({
                ...this.formData,
                id: Date.now(),
                price: `$${parseFloat(this.formData.price).toFixed(2)}`,
                imageUrl: this.formData.imageUrl
            });

            toaster.success('Artwork added (demo)!');
            this.handleReset();
            return;
        }

        if (!auth.isLoggedIn()) {
            toaster.error('You must be logged in to add artwork.');
            return;
        }

        const apiData = {
            title: this.formData.title,
            dimensions: this.formData.dimensions,
            price: parseFloat(this.formData.price),
            category: this.formData.category,
            medium: this.formData.medium,
            style: this.formData.style,
            date: this.formData.date,
            description: this.formData.description,
            image_url: this.formData.imageUrl
        };

        if (!apiData.title || !apiData.dimensions || isNaN(apiData.price) || apiData.price <= 0 || 
            !apiData.category || !apiData.medium || !apiData.style || !apiData.date || 
            !apiData.description || !apiData.image_url) {
            toaster.error('All form fields are required. Price must be a positive number. You must provide an image URL.');
            return;
        }

        try {
            await api.createArtwork(apiData);
            toaster.success('Artwork added successfully!');
            this.handleReset();
        } catch (error) {
            toaster.error(`Error: ${error.message}`);
        }
    }

    updateImagePreview() {
        const previewImg = this.container.querySelector('#imagePreview');
        if (previewImg) {
            if (this.imagePreview) {
                previewImg.src = this.imagePreview;
                previewImg.style.display = 'block';
            } else {
                previewImg.style.display = 'none';
            }
        }
    }

    attachEventListeners() {
        const form = this.container.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            form.addEventListener('reset', () => this.handleReset());

            // Add input change listeners
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', (e) => this.handleInputChange(e));
            });
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="container py-4">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card shadow-lg rounded-4 p-4 mb-4 post-artwork-card">
                            <div class="d-flex align-items-center mb-4">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" 
                                     alt="Artist Avatar" 
                                     class="rounded-circle me-3" 
                                     width="56" 
                                     height="56" />
                                <div>
                                    <h3 class="mb-0 fw-bold">Post New Artwork</h3>
                                    <div class="text-muted small">as Demo Artist</div>
                                </div>
                            </div>
                            <form>
                                <div class="row g-4">
                                    <div class="col-md-5 mb-3">
                                        <div class="image-preview-box border rounded-4 p-2 text-center bg-light d-flex flex-column justify-content-center" 
                                             style="min-height: 350px;">
                                            ${this.imagePreview ? `
                                                <img src="${this.imagePreview}" 
                                                     alt="Artwork Preview" 
                                                     class="img-fluid mb-2 mx-auto rounded-4" 
                                                     style="max-height: 280px; object-fit: contain;"
                                                     onerror="this.onerror=null; this.src='/img.png';" />
                                            ` : `
                                                <div class="text-muted">No preview</div>
                                            `}
                                            <input type="url" 
                                                   id="imageUrl" 
                                                   name="imageUrl" 
                                                   placeholder="Paste artwork image URL..." 
                                                   value="${this.formData.imageUrl}"
                                                   class="form-control form-control-sm mt-auto rounded-pill" />
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="row g-3">
                                            <div class="col-lg-6">
                                                <div class="mb-2">
                                                    <label for="title" class="form-label form-label-sm">Title</label>
                                                    <input type="text" 
                                                           id="title" 
                                                           name="title" 
                                                           value="${this.formData.title}"
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="dimensions" class="form-label form-label-sm">Dimensions</label>
                                                    <input type="text" 
                                                           id="dimensions" 
                                                           name="dimensions" 
                                                           value="${this.formData.dimensions}"
                                                           placeholder="e.g. 100x150 cm" 
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="price" class="form-label form-label-sm">Price</label>
                                                    <div class="input-group input-group-sm">
                                                        <span class="input-group-text">$</span>
                                                        <input type="number" 
                                                               step="0.01" 
                                                               min="0.01" 
                                                               id="price" 
                                                               name="price" 
                                                               value="${this.formData.price}"
                                                               class="form-control form-control-sm rounded-pill" 
                                                               required />
                                                    </div>
                                                </div>
                                                <div class="mb-2">
                                                    <label for="category" class="form-label form-label-sm">Category</label>
                                                    <input type="text" 
                                                           id="category" 
                                                           name="category" 
                                                           value="${this.formData.category}"
                                                           placeholder="e.g. Painting" 
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="medium" class="form-label form-label-sm">Medium</label>
                                                    <input type="text" 
                                                           id="medium" 
                                                           name="medium" 
                                                           value="${this.formData.medium}"
                                                           placeholder="e.g. Oil on canvas" 
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="style" class="form-label form-label-sm">Style</label>
                                                    <input type="text" 
                                                           id="style" 
                                                           name="style" 
                                                           value="${this.formData.style}"
                                                           placeholder="e.g. Realism" 
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="date" class="form-label form-label-sm">Date</label>
                                                    <input type="date" 
                                                           id="date" 
                                                           name="date" 
                                                           value="${this.formData.date}"
                                                           class="form-control form-control-sm rounded-pill" 
                                                           required />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 d-flex flex-column">
                                                <div class="mb-2 flex-grow-1 d-flex flex-column">
                                                    <label for="description" class="form-label form-label-sm">Description</label>
                                                    <textarea id="description" 
                                                              name="description" 
                                                              value="${this.formData.description}"
                                                              class="form-control form-control-sm flex-grow-1 rounded-4" 
                                                              rows="10" 
                                                              required 
                                                              style="resize: vertical"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-12 d-flex justify-content-end gap-2">
                                                <button type="reset" class="btn btn-outline-secondary btn-sm rounded-pill">
                                                    <i class="bi bi-x-lg me-1"></i> Reset
                                                </button>
                                                <button type="submit" class="btn btn-primary btn-sm rounded-pill">
                                                    <i class="bi bi-check-lg me-1"></i> Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            ${this.demoMode && this.demoArtworks.length > 0 ? `
                                <div class="mt-4">
                                    <h4>Recently Added Artworks (Demo)</h4>
                                    <div class="row g-3">
                                        ${this.demoArtworks.map(art => `
                                            <div class="col-md-4 mb-3">
                                                <div class="card h-100 rounded-4 shadow-sm">
                                                    <img src="${art.imageUrl}" 
                                                         alt="${art.title}" 
                                                         class="card-img-top rounded-4" 
                                                         style="height: 180px; object-fit: cover;" />
                                                    <div class="card-body">
                                                        <h5 class="card-title">${art.title}</h5>
                                                        <p class="card-text">${art.description}</p>
                                                        <p class="card-text"><strong>Price:</strong> ${art.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }
} 