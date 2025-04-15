import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import AddArtworkForm from './AddArtworkForm';
import MyArtwork from './MyArtwork';
import MyOrders from './MyOrders';
import LandingPage from './LandingPage'; // Importuj LandingPage

import './App.css';
// Bootstrap i ikony importowane w index.js

// Placeholdery dla pozostałych stron
function MySales() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">My Sales Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }
function Messages() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">Messages Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }
// Placeholder dla strony rejestracji (używany w LandingPage)
function RegisterPage() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">Register Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }

function App() {
  const navLinkStyles = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <div className="app-container">
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
            <NavLink to="/posting" className={navLinkStyles}>Posting</NavLink>
            {/* Zmieniono ścieżkę dla My artwork */}
            <NavLink to="/my-artwork" className={navLinkStyles}>My artwork</NavLink>
            <NavLink to="/my-orders" className={navLinkStyles}>My orders</NavLink>
            <NavLink to="/my-sales" className={navLinkStyles}>My sales</NavLink>
            <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
          </nav>
          <div className="profile-icon">
            <button className="btn p-0 border-0">
              <img src="/pfp.png" alt="Profil" width="40" height="40" className="rounded-circle" />
            </button>
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
          <Route path="/messages" element={<Messages />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Dla przycisku Sign up */}
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
