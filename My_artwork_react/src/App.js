import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { Toaster } from './Toaster';

import AddArtworkForm from './AddArtworkForm';
import MyArtwork from './MyArtwork';
import MyOrders from './MyOrders';
import LandingPage from './LandingPage'; // Importuj LandingPage
import RegisterPage from './RegisterPage';
import MessagesPage from './MessagesPage';
import HotelFeed from './HotelFeed';
import PaintingViewerPage from './PaintingViewerPage';

import './App.css';
// Bootstrap i ikony importowane w index.js

// Placeholdery dla pozostałych stron
function MySales() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">My Sales Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }
function Messages() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">Messages Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }

function App() {
  const navLinkStyles = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
  const { logout, userType, login: fakeLogin } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // DEV: Switch profile handler
  const handleSwitchProfile = (role) => {
    // Set a dummy JWT and userType
    fakeLogin('dev-jwt-token-' + role, role);
    if (role === 'ARTYSTA') navigate('/my-artwork');
    else if (role === 'HOTEL') navigate('/hotel-feed');
    else if (role === 'ADMIN') navigate('/admin');
    else navigate('/my-orders');
  };

  // Dynamic nav links based on userType
  const renderNavLinks = () => {
    if (userType === 'ARTYSTA') {
      return <>
        <NavLink to="/posting" className={navLinkStyles}>Posting</NavLink>
        <NavLink to="/my-artwork" className={navLinkStyles}>My artwork</NavLink>
        <NavLink to="/my-orders" className={navLinkStyles}>My orders</NavLink>
        <NavLink to="/my-sales" className={navLinkStyles}>My sales</NavLink>
        <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
      </>;
    } else if (userType === 'HOTEL') {
      return <>
        <NavLink to="/hotel-feed" className={navLinkStyles}>Gallery</NavLink>
        <NavLink to="/my-orders" className={navLinkStyles}>My orders</NavLink>
        <NavLink to="/my-sales" className={navLinkStyles}>My sales</NavLink>
        <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
      </>;
    } else if (userType === 'ADMIN') {
      return <>
        <NavLink to="/admin" className={navLinkStyles}>Admin panel</NavLink>
        <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
      </>;
    } else if (userType === 'GOSC') {
      return <>
        <NavLink to="/hotel-feed" className={navLinkStyles}>Gallery</NavLink>
        <NavLink to="/my-orders" className={navLinkStyles}>My orders</NavLink>
        <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
      </>;
    } else {
      // Not logged in
      return <>
        <NavLink to="/hotel-feed" className={navLinkStyles}>Gallery</NavLink>
        <NavLink to="/login" className={navLinkStyles}>Login</NavLink>
        <NavLink to="/register" className={navLinkStyles}>Register</NavLink>
      </>;
    }
  };

  return (
    <div className="app-container">
      <Toaster />
      {/* ----- Header ----- */}
      <header className="app-header w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="logo">
            {/* Zmieniono link logo na /landing */}
            <NavLink to="/landing" className="header-title text-decoration-none">
              myp@intings
            </NavLink>
          </div>
          <nav className="main-nav d-none d-md-flex align-items-center">
            {renderNavLinks()}
          </nav>
          <div className="profile-icon">
            {userType ? (
              <div className="dropdown">
                <button className="btn p-0 border-0 me-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/pfp.png" alt="Profil" width="40" height="40" className="rounded-circle" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><NavLink to="/profile" className="dropdown-item">Profile</NavLink></li>
                  <li><NavLink to="/change-password" className="dropdown-item">Change password</NavLink></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li className="dropdown-header">Switch profile (DEV)</li>
                  <li><button className="dropdown-item" onClick={() => handleSwitchProfile('ARTYSTA')}>Artist</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSwitchProfile('HOTEL')}>Hotel</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSwitchProfile('GOSC')}>Guest</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSwitchProfile('ADMIN')}>Admin</button></li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* ----- Główna zawartość - Routing ----- */}
      {/* Usunięto klasę container z main, bo komponenty mogą ją dodawać same */}
      <main className="flex-grow-1"> {/* Usunięto container i mt-4 */}
        <Routes>
          {/* Dodano ścieżkę dla Landing Page */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/posting" element={<AddArtworkForm />} />
          {/* Zmieniono ścieżkę dla My Artwork */}
          <Route path="/my-artwork" element={<MyArtwork />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-sales" element={<MySales />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Dla przycisku Sign up */}
          <Route path="/hotel-feed" element={<HotelFeed />} />
          <Route path="/view-painting/:paintingId" element={<PaintingViewerPage />} />
          {/* Przekierowanie ze ścieżki głównej '/' na '/landing' */}
          <Route path="/" element={<LandingPage />} /> {/* Domyślnie pokazuj Landing Page */}
          <Route path="*" element={<div className='container mt-4 text-center'><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>

      {/* ----- Footer ----- */}
      <footer className="app-footer w-100 mt-auto">
        {/* ... (reszta footera bez zmian) ... */}
         <div className="container-fluid text-center">
          <span className="me-2">myp@intings © 2024</span> |
          <a href="#" className="footer-link">Support</a> |
          <a href="#" className="footer-link">Terms of use</a> |
          <a href="#" className="footer-link">Privacy policy</a> |
          <a href="#" className="footer-link">Cookie policy</a> |
          <a href="#" className="footer-link">Copyrights policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
