import Router from './utils/router.js';
import api from './utils/api.js';

// Define routes
const routes = {
    '/': async () => {
        return `
            <div class="landing-page">
                <h1>Welcome to Art Gallery</h1>
                <p>Discover amazing artwork from talented artists.</p>
                <a href="/gallery" class="btn-primary">Browse Gallery</a>
            </div>
        `;
    },
    '/login': async () => {
        return `
            <div class="login-page">
                <h1>Login</h1>
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn-primary">Login</button>
                </form>
                <p class="error-message" id="loginError" style="display: none;"></p>
            </div>
        `;
    },
    '/gallery': async () => {
        try {
            const artworks = await api.getArtworks();
            return `
                <div class="gallery-page">
                    <h1>Art Gallery</h1>
                    <div class="artwork-grid">
                        ${artworks.map(artwork => `
                            <div class="artwork-card">
                                <img src="${artwork.imageUrl}" alt="${artwork.title}">
                                <h3>${artwork.title}</h3>
                                <p>${artwork.description}</p>
                                <p class="price">$${artwork.price}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            return `<div class="error">Error loading gallery: ${error.message}</div>`;
        }
    },
    '/my-artwork': async () => {
        if (!api.isLoggedIn()) {
            return `<div class="error">Please log in to view your artwork.</div>`;
        }
        try {
            const artworks = await api.getArtworks();
            return `
                <div class="my-artwork-page">
                    <h1>My Artwork</h1>
                    <a href="/add-artwork" class="btn-primary">Add New Artwork</a>
                    <div class="artwork-grid">
                        ${artworks.map(artwork => `
                            <div class="artwork-card">
                                <img src="${artwork.imageUrl}" alt="${artwork.title}">
                                <h3>${artwork.title}</h3>
                                <p>${artwork.description}</p>
                                <div class="artwork-actions">
                                    <button onclick="editArtwork(${artwork.id})">Edit</button>
                                    <button onclick="deleteArtwork(${artwork.id})">Delete</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            return `<div class="error">Error loading artwork: ${error.message}</div>`;
        }
    },
    '/profile': async () => {
        if (!api.isLoggedIn()) {
            return `<div class="error">Please log in to view your profile.</div>`;
        }
        try {
            const profile = await api.getProfile();
            return `
                <div class="profile-page">
                    <h1>My Profile</h1>
                    <div class="profile-info">
                        <p><strong>Username:</strong> ${profile.username}</p>
                        <p><strong>Email:</strong> ${profile.email}</p>
                    </div>
                    <button onclick="editProfile()" class="btn-primary">Edit Profile</button>
                </div>
            `;
        } catch (error) {
            return `<div class="error">Error loading profile: ${error.message}</div>`;
        }
    },
    '/404': () => {
        return `
            <div class="error-page">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" class="btn-primary">Go Home</a>
            </div>
        `;
    }
};

// Initialize router
const router = new Router(routes);

// Handle login button
document.getElementById('loginBtn').addEventListener('click', () => {
    if (api.isLoggedIn()) {
        api.logout();
        document.getElementById('loginBtn').textContent = 'Login';
        router.navigate('/');
    } else {
        router.navigate('/login');
    }
});

// Handle login form submission
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'loginForm') {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('loginError');

        try {
            await api.login(username, password);
            document.getElementById('loginBtn').textContent = 'Logout';
            router.navigate('/');
        } catch (error) {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        }
    }
});

// Initialize the app
router.handleRoute(); 