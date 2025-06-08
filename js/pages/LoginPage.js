import api from '../utils/api.js';

class LoginPage {
    constructor() {
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('login-error');

        try {
            const response = await api.login(username, password);
            console.log('Login successful:', response);
            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (error) {
            console.error('Login failed:', error);
            errorElement.textContent = 'Login failed. Please try again.';
        }
    }

    render() {
        const container = document.createElement('div');
        container.className = 'login-page';
        container.innerHTML = `
            <h1>Login</h1>
            <form id="login-form">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div id="login-error" class="error-message"></div>
                <button type="submit" class="login-button">Login</button>
            </form>
        `;

        // Add event listener for form submission
        container.querySelector('#login-form').addEventListener('submit', this.handleLogin);

        return container;
    }
}

export default LoginPage; 