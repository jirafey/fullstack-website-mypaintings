export class LandingPage {
    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <h1 class="display-4 headline">
                            Unique exposure for the artists. Unique decor for the hotels.
                        </h1>
                        <h2 class="display-7 headline">
                            Through our platform, artists have a chance to expose their art in hotels, enhancing their interiors with unique vibes — while guests can purchase a piece they liked.
                        </h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 offset-md-1">
                        <img src="assets/images/landing_page_img.png" alt="Art Image" class="img-fluid" style="max-width: 80%;">
                    </div>
                    <div class="col-md-2 stats">
                        <h1 class="display-4 text-center"><strong>1000+</strong></h1>
                        <h4 class="text-center">artists</h4>
                        <h1 class="display-4 text-center mt-5"><strong>5000+</strong></h1>
                        <h4 class="text-center">paintings sold</h4>
                        <h1 class="display-4 text-center mt-5"><strong>10000+</strong></h1>
                        <h4 class="text-center">users</h4>
                    </div>
                    <div class="col-md-2 offset-md-1 btns">
                        <h1 class="display-5">Join us now!</h1>
                        <button class="btn btn-light sign-up-btn d-block mt-3 w-100" id="signUpBtn">Sign up</button>
                        <button class="btn btn-light sign-up-btn btn-google d-block mt-3 w-100" id="googleSignUpBtn">
                            <img src="assets/images/google_icon.png" width="30" height="30" alt="mp">
                            Sign up with Google
                        </button>
                        <p class="disclaimer-text">
                            By registering, you agree to the Terms of Use and Privacy Policy, including the Cookie Policy.
                        </p>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const signUpBtn = this.container.querySelector('#signUpBtn');
        const googleSignUpBtn = this.container.querySelector('#googleSignUpBtn');

        signUpBtn?.addEventListener('click', () => {
            // Handle regular sign up
            console.log('Regular sign up clicked');
        });

        googleSignUpBtn?.addEventListener('click', () => {
            // Handle Google sign up
            console.log('Google sign up clicked');
        });
    }
} 