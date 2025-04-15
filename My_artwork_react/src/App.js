import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

// Importuj komponenty widoków
import AddArtworkForm from './AddArtworkForm';
import MyArtwork from './MyArtwork';
import MyOrders from './MyOrders'; // Import nowego komponentu

// Importuj style dla App
import './App.css';

// Bootstrap i ikony są importowane w index.js

// --- Proste komponenty zastępcze ---
function MySales() {
  return <div className="container mt-4 placeholder-page"><h2 className="text-center">My Sales Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>;
}
function Messages() {
  return <div className="container mt-4 placeholder-page"><h2 className="text-center">Messages Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>;
}
// ------------------------------------

function App() {
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "nav-link active" : "nav-link";
  };

  return (
    <div className="app-container">
      {/* ----- Header ----- */}
      <header className="app-header w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="logo">
            <NavLink to="/" className="header-title text-decoration-none">
              myp@intings
            </NavLink>
          </div>
          <nav className="main-nav d-none d-md-flex align-items-center">
            <NavLink to="/posting" className={navLinkStyles}>Posting</NavLink>
            <NavLink to="/" className={navLinkStyles} end>My artwork</NavLink>
            {/* Dodaj link do My Orders */}
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
      <main className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/posting" element={<AddArtworkForm />} />
          <Route path="/" element={<MyArtwork />} />
          <Route path="/my-orders" element={<MyOrders />} /> {/* Dodano route dla My Orders */}
          <Route path="/my-sales" element={<MySales />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<div className='text-center'><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>

      {/* ----- Footer ----- */}
      <footer className="app-footer w-100 mt-auto">
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
