import React from 'react';
import { Link } from 'react-router-dom'; // Użyj Link do nawigacji wewnątrz aplikacji
import './LandingPage.css'; // Dedykowany CSS dla tej strony

function LandingPage() {
  return (
    // Zamiast content-wrapper, używamy fragmentu, bo layout jest w App.js
    <>
      {/* Główna sekcja strony */}
      <div className="container-fluid landing-page-content"> {/* Używamy container-fluid dla pełnej szerokości */}
        {/* Nagłówek */}
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="display-4 headline">
              Unique exposure for the artists. Unique decor for the hotels.
            </h1>
            <h2 className="display-7 headline">
              Through our platform, artists have a chance to expose their art in hotels, enhancing their interiors with unique vibes — while guests can purchase a piece they liked.
            </h2>
          </div>
        </div>

        <div className="row align-items-center"> {/* Wyśrodkowanie elementów w pionie */}
          {/* Obrazek */}
          <div className="col-md-4 offset-md-1 text-center text-md-start"> {/* Wyśrodkuj na małych, do lewej na większych */}
            <img src="/landing_page_img.png" alt="Art Example" className="img-fluid landing-image" />
          </div>
          {/* Statystyki */}
          <div className="col-md-2 stats">
            <h1 className="display-4 text-center"><strong>1000+</strong></h1> <h4 className="text-center"> artists </h4>
            <h1 className="display-4 text-center mt-md-5"><strong>5000+</strong></h1> <h4 className="text-center"> paintings sold </h4>
            <h1 className="display-4 text-center mt-md-5"><strong>10000+</strong></h1> <h4 className="text-center"> users </h4>
          </div>
          {/* Przyciski Rejestracji */}
          <div className="col-md-3 offset-md-1 btns"> {/* Zmieniono offset i szerokość dla lepszego dopasowania */}
            <h1 className="display-5 mb-4"> Join us now! </h1> {/* Dodano margines dolny */}
            {/* Używamy Link z react-router-dom do przejścia do strony rejestracji (lub logowania) */}
            <Link to="/register" className="btn btn-light sign-up-btn d-block mb-3 w-100">Sign up</Link> {/* Zmieniono mt-3 na mb-3 */}
            <button className="btn btn-light sign-up-btn btn-google d-block mb-3 w-100">
              <img src="/google_icon.png" width="25" height="25" alt="Google icon" className="me-2 google-icon" /> {/* Zmniejszono ikonkę i dodano klasę */}
              Sign up with Google
            </button>
            <p className="disclaimer-text small"> {/* Zmniejszono font */}
              By registering, you agree to the Terms of Use and Privacy Policy, including the Cookie Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
