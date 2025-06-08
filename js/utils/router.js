class Router {
    constructor(routes) {
        this.routes = routes;
        this.mainContent = document.getElementById('main-content');
        
        // Handle navigation
        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"]')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/404'];
        
        try {
            const content = await route();
            this.mainContent.innerHTML = content;
        } catch (error) {
            console.error('Error loading route:', error);
            this.mainContent.innerHTML = '<div class="error">Error loading page</div>';
        }
    }

    navigate(path) {
        window.history.pushState(null, null, path);
        this.handleRoute();
    }
}

export default Router; 