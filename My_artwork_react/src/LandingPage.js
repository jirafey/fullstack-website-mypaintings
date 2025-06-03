import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Użyj Link do nawigacji wewnątrz aplikacji
import './LandingPage.css'; // Dedykowany CSS dla tej strony
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';

function LandingPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { login: doLogin, userType } = useSession();
  const navigate = useNavigate();
  const { demoMode } = useDemoMode();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const data = await apiRequest('/ogolne/logowanie', {
        method: 'POST',
        body: { username: login, password: password }
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
            <h1 className="display-4 text-center"><strong>{demoMode ? '1,234' : '1000+'}</strong></h1> <h4 className="text-center"> artists </h4>
            <h1 className="display-4 text-center mt-md-5"><strong>{demoMode ? '5,678' : '5000+'}</strong></h1> <h4 className="text-center"> paintings sold </h4>
            <h1 className="display-4 text-center mt-md-5"><strong>{demoMode ? '12,345' : '10000+'}</strong></h1> <h4 className="text-center"> users </h4>
          </div>
          {/* Przyciski Rejestracji */}
          <div className="col-md-3 offset-md-1 btns"> {/* Zmieniono offset i szerokość dla lepszego dopasowania */}
            <h1 className="display-5 mb-4"> Join us now! </h1> {/* Dodano margines dolny */}
            {/* Używamy Link z react-router-dom do przejścia do strony rejestracji (lub logowania) */}
            {!demoMode && <Link to="/register" className="btn btn-light sign-up-btn d-block mb-3 w-100">Sign up</Link>}
            {!demoMode && <button className="btn btn-light sign-up-btn btn-google d-block mb-3 w-100">
              <img src="/google_icon.png" width="25" height="25" alt="Google icon" className="me-2 google-icon" /> {/* Zmniejszono ikonkę i dodano klasę */}
              Sign up with Google
            </button>}
            {!demoMode && <form onSubmit={handleLogin} className="mt-3">
              <input type="text" className="form-control mb-2" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} required />
              <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
            </form>}
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
