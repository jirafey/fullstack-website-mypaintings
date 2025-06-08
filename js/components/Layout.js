export class Layout {
    constructor() {
        this.header = this.createHeader();
        this.footer = this.createFooter();
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'w-100';
        header.innerHTML = `
            <div class="logo col-md-2 offset-md-1">
                <img src="assets/images/favicon_temp.png" width="48" height="48" alt="mp">
                <a class="header-text text-black" href="/" data-navigate>myp@intings</a>
            </div>
            <div class="nav-bar col-md-8">
                <a href="/gallery" class="header-text text-black me-3" data-navigate>Gallery</a>
                <a href="/my-artwork" class="header-text text-black me-3" data-navigate>My Artwork</a>
                <a href="/profile" class="header-text text-black me-3" data-navigate>Profile</a>
                <button class="btn btn-login btn-light" id="login-button">Login</button>
            </div>
        `;
        return header;
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'w-100 text-black';
        footer.innerHTML = `
            myp@intings © 2024 |
            <a href="/support" class="text-black footer-text" data-navigate>Support</a> |
            <a href="/terms" class="text-black footer-text" data-navigate>Terms of use</a> |
            <a href="/privacy" class="text-black footer-text" data-navigate>Privacy policy</a>
        `;
        return footer;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'app-container';
        
        container.appendChild(this.header);
        
        const mainContent = document.createElement('main');
        mainContent.id = 'app';
        mainContent.className = 'content-wrapper';
        container.appendChild(mainContent);
        
        container.appendChild(this.footer);
        
        return container;
    }
} 