import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Użyj Link do nawigacji wewnątrz aplikacji
import './LandingPage.css'; // Dedykowany CSS dla tej strony
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';

function LandingPage() {
  // Removed login and password states as the form is no longer here
  const [message, setMessage] = useState(''); // Still useful for general messages, e.g., if login logic was triggered elsewhere
  const [loading, setLoading] = useState(false); // Still useful for general loading states
  const toast = useToast();
  const { login: doLogin, userType } = useSession();
  const navigate = useNavigate();
  const { demoMode } = useDemoMode();

  // handleLogin is kept for potential future use or if called by quick access
  // but it's not directly tied to a form anymore.
  const handleLogin = async (e) => {
    // Prevent default if this function was somehow called by a non-button element
    if (e && e.preventDefault) e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      // Dummy login logic as the form is removed
      // In a real scenario, this function would likely be moved to a /login page
      // or adapted to handle quick access logins.
      const dummyUsername = "user"; // Placeholder
      const dummyPassword = "password"; // Placeholder
      const data = await apiRequest('/ogolne/logowanie', {
        method: 'POST',
        body: { username: dummyUsername, password: dummyPassword }
      });
      if (data && data.token && data.userType) {
        doLogin(data.token, data.userType);
        toast('Logged in successfully!', 'success');
        if (data.userType === 'ARTYSTA') navigate('/my-artwork');
        else if (data.userType === 'HOTEL') navigate('/hotel-feed');
        else if (data.userType === 'ADMIN') navigate('/admin');
        else navigate('/my-orders');
      } else {
        toast('Invalid server response.', 'danger');
      }
    } catch (err) {
      toast('Login failed: ' + err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // DEV: Quick profile switcher
  const handleQuickSwitch = (role) => {
    doLogin('dev-jwt-token-' + role, role);
    if (role === 'ARTYSTA') navigate('/my-artwork');
    else if (role === 'HOTEL') navigate('/hotel-feed');
    else if (role === 'ADMIN') navigate('/admin');
    else navigate('/my-orders');
  };

  return (
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
              <img
                  src={process.env.PUBLIC_URL + '/landing_page_img.png'}
                  alt="Art Example"
                  className="img-fluid landing-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '[https://via.placeholder.com/400x300?text=Art+Example](https://via.placeholder.com/400x300?text=Art+Example)';
                  }}
              />
            </div>
            {/* Statystyki */}
            <div className="col-md-2 stats">
              <h1 className="display-4 text-center"><strong>{demoMode ? '1,234' : '1000+'}</strong></h1> <h4 className="text-center"> artists </h4>
              <h1 className="display-4 text-center mt-md-5"><strong>{demoMode ? '5,678' : '5000+'}</strong></h1> <h4 className="text-center"> paintings sold </h4>
              <h1 className="display-4 text-center mt-md-5"><strong>{demoMode ? '12,345' : '10000+'}</strong></h1> <h4 className="text-center"> users </h4>
            </div>
            {/* Przyciski Rejestracji i Logowania */}
            <div className="col-md-3 offset-md-1 btns"> {/* Zmieniono offset i szerokość dla lepszego dopasowania */}
              <h1 className="display-5 mb-4"> Join us now! </h1> {/* Dodano margines dolny */}
              {demoMode && (
                  <>
                    <Link to="/register" className="btn btn-primary d-block mb-3 w-100">Register</Link>
                    <Link to="/login" className="btn btn-outline-primary d-block mb-3 w-100">Log In</Link>
                    <button className="btn btn-light sign-up-btn btn-google d-block mb-3 w-100">
                      <img
                          src={process.env.PUBLIC_URL + '/google_icon.png'}
                          width="25"
                          height="25"
                          alt="Google icon"
                          className="me-2 google-icon"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '[https://via.placeholder.com/25x25?text=G](https://via.placeholder.com/25x25?text=G)';
                          }}
                      />
                      Sign up with Google
                    </button>
                  </>
              )}
              {demoMode && <div className="alert alert-info mt-2">Demo mode is ON. No login or registration required. Use the quick access below to explore all features!</div>}
              {message && <div className="alert alert-info mt-2">{message}</div>}
              <p className="disclaimer-text small"> {/* Zmniejszono font */}
                By registering, you agree to the Terms of Use and Privacy Policy, including the Cookie Policy.
              </p>
            </div>
          </div>

          {/* QUICK ACCESS SECTION */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card p-4 bg-light border">
                <h3 className="mb-3">Quick Access (Demo/Dev)</h3>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <button className="btn btn-outline-secondary" onClick={() => handleQuickSwitch('ARTYSTA')}>Switch to Artist</button>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuickSwitch('HOTEL')}>Switch to Hotel</button>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuickSwitch('GOSC')}>Switch to Guest</button>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuickSwitch('ADMIN')}>Switch to Admin</button>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <Link to="/hotel-feed" className="btn btn-outline-primary">Go to Gallery</Link>
                  <Link to="/support" className="btn btn-outline-primary">Go to Support</Link>
                  <Link to="/admin" className="btn btn-outline-primary">Go to Admin Panel</Link>
                  <Link to="/view-painting/1" className="btn btn-outline-primary">Demo Painting (simulate QR)</Link>
                  <Link to="/messages" className="btn btn-outline-primary">Go to Messages</Link>
                  <Link to="/my-orders" className="btn btn-outline-primary">Go to Orders</Link>
                  <Link to="/buy" className="btn btn-outline-success">Demo Purchase</Link>

                </div>
                <div className="text-muted small">You can instantly switch roles and access any part of the app for demo/testing.</div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default LandingPage;
