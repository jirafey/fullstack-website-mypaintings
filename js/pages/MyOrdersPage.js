import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';

// Demo orders data
const DEMO_ORDERS = [
    {
        id: 1,
        title: 'Abstract Dreams',
        image_url: 'https://picsum.photos/400/400?random=1',
        bought_on: '2024-05-01',
        price: '$1,200',
        hotel: 'Grand Hotel',
        artist: 'John Doe',
        status: 'Delivered'
    },
    {
        id: 2,
        title: 'Ocean Waves',
        image_url: 'https://picsum.photos/400/400?random=2',
        bought_on: '2024-05-02',
        price: '$800',
        hotel: 'Seaside Resort',
        artist: 'Jane Smith',
        status: 'In Transit'
    },
    {
        id: 3,
        title: 'City Lights',
        image_url: 'https://picsum.photos/400/400?random=3',
        bought_on: '2024-05-03',
        price: '$1,500',
        hotel: 'Urban Hotel',
        artist: 'Alex Brown',
        status: 'Processing'
    }
];

export class MyOrdersPage {
    constructor(container) {
        this.container = container;
        this.orders = [];
        this.loading = true;
        this.error = null;
        this.demoMode = true; // For testing purposes

        this.loadOrders();
        this.render();
    }

    async loadOrders() {
        if (this.demoMode) {
            this.orders = DEMO_ORDERS;
            this.loading = false;
            this.error = null;
            this.render();
            return;
        }

        try {
            const data = await api.get('/hotel/ownedpaintings');
            this.orders = data?.zamowienia || [];
            this.error = null;
        } catch (error) {
            this.error = 'Error loading orders: ' + error.message;
        } finally {
            this.loading = false;
            this.render();
        }
    }

    handleOrderAction(order, action) {
        if (action === 'details') {
            toaster.info(`Viewing details for order ${order.id}`);
            // Implement order details view
        }
    }

    renderOrderCard(order) {
        return `
            <div class="order-item d-flex p-3 border rounded bg-white shadow-sm mb-3">
                <div class="order-image me-3">
                    <img src="${order.image_url || '/img.png'}"
                         alt="${order.title || 'Order'}"
                         class="img-fluid rounded"
                         style="width: 130px; height: 130px; object-fit: cover;" />
                </div>
                <div class="order-details flex-grow-1">
                    <p><strong>Bought on:</strong> ${order.bought_on || 'N/A'}</p>
                    <p><strong>Price:</strong> ${order.price || 'N/A'}</p>
                    <p><strong>Hotel:</strong> <span class="hotel-link">${order.hotel || 'N/A'}</span></p>
                    <p><strong>Artist:</strong> <span class="artist-link">${order.artist || 'N/A'}</span></p>
                    <p><strong>Status:</strong> <span class="status-label status-${(order.status || '').toLowerCase().replace(/\s/g, '-')}">${order.status || 'Unknown'}</span></p>
                    <div class="mt-2">
                        <button class="btn btn-primary btn-sm me-2" data-order-id="${order.id}" data-action="details">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Attach event listeners to action buttons
        this.container.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const orderId = parseInt(button.dataset.orderId);
                const action = button.dataset.action;
                const order = this.orders.find(o => o.id === orderId);
                if (order) {
                    this.handleOrderAction(order, action);
                }
            });
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="container py-4">
                <h1 class="text-center mb-4 page-title-orders">My Orders</h1>
                ${this.loading ? `
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ` : this.error ? `
                    <div class="alert alert-danger">${this.error}</div>
                ` : this.orders.length === 0 ? `
                    <div class="alert alert-info">No orders found.</div>
                ` : this.orders.map(order => this.renderOrderCard(order)).join('')}
            </div>
        `;

        this.attachEventListeners();
    }
} 