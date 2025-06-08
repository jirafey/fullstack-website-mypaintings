const API_BASE_URL = 'http://localhost:8081/api';

// Helper function to get the JWT token
const getToken = () => localStorage.getItem('jwt_token');

// Helper function to set the JWT token
const setToken = (token) => localStorage.setItem('jwt_token', token);

// Helper function to remove the JWT token
const removeToken = () => localStorage.removeItem('jwt_token');

// Helper function to check if user is logged in
const isLoggedIn = () => !!getToken();

// Helper function to get headers with auth token
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

// Generic fetch wrapper with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
    try {
        console.log('Making request to:', url, 'with options:', options);
        const response = await fetch(url, {
            ...options,
            headers: getHeaders(),
            credentials: 'include'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const error = await response.text();
            console.error('Error response:', error);
            throw new Error(error || 'API request failed');
        }

        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// API methods
const api = {
    // Auth methods
    async login(username = 'admin', password = 'admin') {
        console.log('Attempting login with:', { username, password });
        const response = await fetchWithErrorHandling(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log('Login response:', data);
        setToken(data.token);
        return data;
    },

    logout() {
        removeToken();
    },

    isLoggedIn() {
        return isLoggedIn();
    },

    // Generic HTTP methods
    async get(endpoint) {
        const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}`);
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async put(endpoint, data) {
        const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async delete(endpoint) {
        const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Test connection
    async testConnection() {
        const response = await fetchWithErrorHandling(`${API_BASE_URL}/test/hello`);
        return response.text();
    },

    // Artwork related methods
    async getArtworks() {
        return this.get('/artworks');
    },

    async getArtwork(id) {
        return this.get(`/artworks/${id}`);
    },

    async createArtwork(artworkData) {
        return this.post('/artworks', artworkData);
    },

    async updateArtwork(id, artworkData) {
        return this.put(`/artworks/${id}`, artworkData);
    },

    async deleteArtwork(id) {
        return this.delete(`/artworks/${id}`);
    },

    // Order related methods
    async getOrders() {
        return this.get('/orders');
    },

    async getOrder(id) {
        return this.get(`/orders/${id}`);
    },

    async createOrder(orderData) {
        return this.post('/orders', orderData);
    },

    // Message related methods
    async getMessages() {
        return this.get('/messages');
    },

    async sendMessage(messageData) {
        return this.post('/messages', messageData);
    },

    // Profile related methods
    async getProfile() {
        return this.get('/profile');
    },

    async updateProfile(profileData) {
        return this.put('/profile', profileData);
    }
};

export default api; 