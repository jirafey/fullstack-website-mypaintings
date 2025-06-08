class Auth {
    constructor() {
        this.user = null;
        this.token = localStorage.getItem('token');
        this.isAuthenticated = !!this.token;
    }

    async login(credentials) {
        try {
            const response = await api.login(credentials);
            this.setAuth(response.token, response.user);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await api.register(userData);
            this.setAuth(response.token, response.user);
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await api.logout();
            this.clearAuth();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }

    setAuth(token, user) {
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    clearAuth() {
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getUser() {
        if (!this.user && localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        return this.user;
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }

    getToken() {
        return this.token;
    }
}

export const auth = new Auth(); 