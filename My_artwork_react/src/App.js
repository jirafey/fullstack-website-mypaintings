import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { Toaster } from './Toaster';
import { DemoModeProvider, useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import { FaPalette, FaHotel, FaUser, FaUserShield, FaChevronDown } from 'react-icons/fa';

import AddArtworkForm from './AddArtworkForm';
import MyArtwork from './MyArtwork';
import MyOrders from './MyOrders';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import MessagesPage from './MessagesPage';
import HotelFeed from './HotelFeed';
import PaintingViewerPage from './PaintingViewerPage';
import ProfilePage from './ProfilePage';
import PostsPage from './PostsPage';
import OwnedPaintingsPage from './OwnedPaintingsPage';
import ContactPage from './ContactPage';
import FAQPage from './FAQPage';
import AboutUsPage from './AboutUsPage';
import TermsOfUsePage from './TermsOfUsePage';
import MySales from './MySales';

import './App.css';
// Bootstrap i ikony importowane w index.js

// Placeholdery dla pozostałych stron

function Messages() { return <div className="container mt-4 placeholder-page"><h2 className="text-center">Messages Page</h2><p className='text-center text-muted'>(Placeholder)</p></div>; }

function DemoToggleButton() {
  const { demoMode, toggleDemoMode } = useDemoMode();
  return (
    <button className={"btn btn-sm " + (demoMode ? 'btn-warning' : 'btn-outline-secondary')} onClick={toggleDemoMode} style={{marginLeft: 8}}>
      {demoMode ? 'Demo mode: ON' : 'Demo mode: OFF'}
    </button>
  );
}

function AdminPanelPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const [users, setUsers] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Demo data
  const DEMO_USERS = [
    { id: 1, username: 'DemoArtist', role: 'ARTYSTA' },
    { id: 2, username: 'DemoHotel', role: 'HOTEL' },
    { id: 3, username: 'DemoGuest', role: 'GOSC' },
    { id: 4, username: 'DemoAdmin', role: 'ADMIN' },
  ];
  const DEMO_POSTS = [
    { id: 101, title: 'Abstract Dreams', artist: 'DemoArtist' },
    { id: 102, title: 'Ocean Waves', artist: 'DemoArtist' },
    { id: 103, title: 'City Lights', artist: 'DemoArtist' },
  ];
  const DEMO_TICKETS = [
    { id: 201, subject: 'Payment issue', user: 'DemoGuest', status: 'Open' },
    { id: 202, subject: 'Artwork not delivered', user: 'DemoHotel', status: 'Closed' },
    { id: 203, subject: 'Profile update', user: 'DemoArtist', status: 'Open' },
  ];

  React.useEffect(() => {
    if (demoMode) {
      setUsers(DEMO_USERS);
      setPosts(DEMO_POSTS);
      setTickets(DEMO_TICKETS);
      setLoading(false);
      return;
    }
    // TODO: Replace with real API calls
    setUsers([]);
    setPosts([]);
    setTickets([]);
    setLoading(false);
  }, [demoMode]);

  // Demo actions
  const handleDeleteUser = (id) => {
    setUsers(users => users.filter(u => u.id !== id));
    toast('User deleted (demo).', 'warning');
  };
  const handleChangeRole = (id, newRole) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, role: newRole } : u));
    toast('User role changed (demo).', 'info');
  };
  const handleDeletePost = (id) => {
    setPosts(posts => posts.filter(p => p.id !== id));
    toast('Post deleted (demo).', 'warning');
  };
  const handleDeleteTicket = (id) => {
    setTickets(tickets => tickets.filter(t => t.id !== id));
    toast('Ticket deleted (demo).', 'warning');
  };

  if (loading) return <div className="text-center py-5">Loading admin panel...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 page-title">Admin Panel</h1>
      <div className="row">
        <div className="col-md-4">
          <h4>Users</h4>
          <ul className="list-group mb-4">
            {users.length === 0 ? <li className="list-group-item">No users.</li> : users.map(user => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{user.username} <span className="badge bg-secondary ms-2">{user.role}</span></span>
                {demoMode && (
                  <span>
                    <select value={user.role} onChange={e => handleChangeRole(user.id, e.target.value)} className="form-select form-select-sm d-inline-block w-auto me-2">
                      <option value="ARTYSTA">ARTYSTA</option>
                      <option value="HOTEL">HOTEL</option>
                      <option value="GOSC">GOSC</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Posts</h4>
          <ul className="list-group mb-4">
            {posts.length === 0 ? <li className="list-group-item">No posts.</li> : posts.map(post => (
              <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{post.title} <span className="badge bg-secondary ms-2">{post.artist}</span></span>
                {demoMode && <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.id)}>Delete</button>}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Tickets</h4>
          <ul className="list-group mb-4">
            {tickets.length === 0 ? <li className="list-group-item">No tickets.</li> : tickets.map(ticket => (
              <li key={ticket.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{ticket.subject} <span className="badge bg-secondary ms-2">{ticket.user}</span> <span className="badge bg-info ms-2">{ticket.status}</span></span>
                {demoMode && <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SupportPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [newSubject, setNewSubject] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');

  // Demo tickets data
  const DEMO_TICKETS = [
    { id: 1, subject: 'Payment issue', user: 'DemoGuest', status: 'Open', message: 'I have a problem with my payment.' },
    { id: 2, subject: 'Artwork not delivered', user: 'DemoHotel', status: 'Closed', message: 'My artwork has not arrived.' },
    { id: 3, subject: 'Profile update', user: 'DemoArtist', status: 'Open', message: 'I want to update my profile.' },
    { id: 4, subject: 'General question', user: 'DemoGuest', status: 'Open', message: 'How do I contact an artist?' },
  ];

  React.useEffect(() => {
    if (demoMode) {
      setTickets(DEMO_TICKETS);
      setLoading(false);
      return;
    }
    // TODO: Replace with real API call
    setTickets([]);
    setLoading(false);
  }, [demoMode]);

  // Demo actions
  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    const newId = Math.max(0, ...tickets.map(t => t.id)) + 1;
    setTickets([{ id: newId, subject: newSubject, user: 'DemoUser', status: 'Open', message: newMessage }, ...tickets]);
    setNewSubject('');
    setNewMessage('');
    toast('Ticket added (demo).', 'success');
  };
  const handleCloseTicket = (id) => {
    setTickets(tickets => tickets.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
    toast('Ticket closed (demo).', 'info');
  };
  const handleDeleteTicket = (id) => {
    setTickets(tickets => tickets.filter(t => t.id !== id));
    toast('Ticket deleted (demo).', 'warning');
  };

  if (loading) return <div className="text-center py-5">Loading support tickets...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 page-title">Support / Tickets</h1>
      {demoMode && (
        <form className="mb-4" onSubmit={handleAddTicket}>
          <div className="row g-2 align-items-end">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Subject" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Message" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" type="submit">Add Ticket</button>
            </div>
          </div>
        </form>
      )}
      <ul className="list-group">
        {tickets.length === 0 ? <li className="list-group-item">No tickets.</li> : tickets.map(ticket => (
          <li key={ticket.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
            <div>
              <strong>{ticket.subject}</strong> <span className="badge bg-secondary ms-2">{ticket.user}</span> <span className={`badge ms-2 ${ticket.status === 'Open' ? 'bg-success' : 'bg-info'}`}>{ticket.status}</span>
              <div className="text-muted small mt-1">{ticket.message}</div>
            </div>
            {demoMode && (
              <div className="mt-2 mt-md-0">
                {ticket.status === 'Open' && <button className="btn btn-success btn-sm me-2" onClick={() => handleCloseTicket(ticket.id)}>Close</button>}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ROLE_OPTIONS = [
  { value: 'ARTYSTA', label: 'Artist', icon: <FaPalette /> },
  { value: 'HOTEL', label: 'Hotel', icon: <FaHotel /> },
  { value: 'GOSC', label: 'Guest', icon: <FaUser /> },
  { value: 'ADMIN', label: 'Admin', icon: <FaUserShield /> },
];

function ProfileDropdown({ userType, onSwitch, onLogout }) {
  const [open, setOpen] = React.useState(false);
  const currentRole = ROLE_OPTIONS.find(r => r.value === userType);
  return (
    <div className="profile-dropdown position-relative ms-3">
      <button className="btn btn-light d-flex align-items-center rounded-pill shadow-sm px-3 py-1" onClick={() => setOpen(o => !o)}>
        <img src="/pfp.png" alt="Profile" width="32" height="32" className="rounded-circle me-2" />
        <span className="me-2">{currentRole ? currentRole.label : 'Profile'}</span>
        <FaChevronDown />
      </button>
      {open && (
        <div className="dropdown-menu show mt-2 shadow rounded" style={{ minWidth: 200, right: 0, left: 'auto', position: 'absolute', zIndex: 1000 }}>
          <div className="dropdown-header">Switch profile (DEV)</div>
          {ROLE_OPTIONS.map(role => (
            <button key={role.value} className={`dropdown-item d-flex align-items-center${userType === role.value ? ' active' : ''}`} onClick={() => { onSwitch(role.value); setOpen(false); }}>
              <span className="me-2">{role.icon}</span> {role.label}
            </button>
          ))}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item text-danger" onClick={() => { onLogout(); setOpen(false); }}>Logout</button>
        </div>
      )}
    </div>
  );
}

// Helper: role-based route access
const ROLE_ROUTES = {
  ARTYSTA: [
    '/posting', '/my-artwork', '/my-sales', '/messages', '/profile', '/landing', '/view-painting', '/support'
  ],
  HOTEL: [
    '/hotel-feed', '/posts', '/owned-paintings', '/my-orders', '/messages', '/profile', '/landing', '/view-painting', '/support'
  ],
  GOSC: [
    '/my-orders', '/profile', '/landing', '/view-painting', '/support'
  ],
  ADMIN: [
    '/admin', '/posts', '/messages', '/profile', '/landing', '/view-painting', '/support'
  ],
};

function isRouteAllowed(userType, path) {
  if (!userType) return true; // allow landing, login, register, etc.
  const allowed = ROLE_ROUTES[userType] || [];
  // Allow dynamic routes like /view-painting/:id
  return allowed.some(route => path.startsWith(route));
}

function ForbiddenPage() {
  return <div className="container py-5 text-center"><h2>Access Forbidden</h2><p className="text-muted">You do not have permission to view this page.</p></div>;
}

function App() {
  const { userType, login, logout } = useSession();
  const navigate = useNavigate();
  const { demoMode, toggleDemoMode } = useDemoMode();

  const navLinkStyles = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  const handleSwitchProfile = (role) => {
    login('dev-jwt-token-' + role, role);
    navigate('/landing');
  };

  const renderNavLinks = () => {
    if (!userType) return null;

    switch (userType) {
      case 'ARTYSTA':
        return (
          <>
            <NavLink to="/posting" className={navLinkStyles}>Posting</NavLink>
            <NavLink to="/my-artwork" className={navLinkStyles}>My Artwork</NavLink>
            <NavLink to="/my-sales" className={navLinkStyles}>My Sales</NavLink>
            <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
          </>
        );
      case 'HOTEL':
        return (
          <>
            <NavLink to="/hotel-feed" className={navLinkStyles}>Hotel Feed</NavLink>
            <NavLink to="/owned-paintings" className={navLinkStyles}>Owned Paintings</NavLink>
            <NavLink to="/my-orders" className={navLinkStyles}>My Orders</NavLink>
          </>
        );
      case 'GOSC':
        return (
          <>
            <NavLink to="/my-orders" className={navLinkStyles}>My Orders</NavLink>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <NavLink to="/admin" className={navLinkStyles}>Admin</NavLink>
            <NavLink to="/posts" className={navLinkStyles}>Posts</NavLink>
            <NavLink to="/messages" className={navLinkStyles}>Messages</NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DemoModeProvider>
      <Toaster>
        <div className="app-container">
          <header className="app-header w-100">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <div className="logo">
                <NavLink to="/landing" className="header-title text-decoration-none">
                  myp@intings
                </NavLink>
              </div>
              <nav className="main-nav d-none d-md-flex align-items-center">
                {renderNavLinks()}
              </nav>
              <div className="d-flex align-items-center">
                <button 
                  className={"btn btn-sm " + (demoMode ? 'btn-warning' : 'btn-outline-secondary')} 
                  onClick={toggleDemoMode} 
                  style={{marginRight: 8}}
                >
                  {demoMode ? 'Demo mode: ON' : 'Demo mode: OFF'}
                </button>
                <ProfileDropdown userType={userType} onSwitch={handleSwitchProfile} onLogout={handleLogout} />
              </div>
            </div>
          </header>

          <main className="flex-grow-1">
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/posting" element={isRouteAllowed(userType, '/posting') ? <AddArtworkForm /> : <ForbiddenPage />} />
              <Route path="/my-artwork" element={isRouteAllowed(userType, '/my-artwork') ? <MyArtwork /> : <ForbiddenPage />} />
              <Route path="/my-orders" element={isRouteAllowed(userType, '/my-orders') ? <MyOrders /> : <ForbiddenPage />} />
              <Route path="/my-sales" element={isRouteAllowed(userType, '/my-sales') ? <MySales /> : <ForbiddenPage />} />
              <Route path="/messages" element={isRouteAllowed(userType, '/messages') ? <MessagesPage /> : <ForbiddenPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/hotel-feed" element={isRouteAllowed(userType, '/hotel-feed') ? <HotelFeed /> : <ForbiddenPage />} />
              <Route path="/posts" element={isRouteAllowed(userType, '/posts') ? <PostsPage /> : <ForbiddenPage />} />
              <Route path="/owned-paintings" element={isRouteAllowed(userType, '/owned-paintings') ? <OwnedPaintingsPage /> : <ForbiddenPage />} />
              <Route path="/view-painting/:paintingId" element={isRouteAllowed(userType, '/view-painting') ? <PaintingViewerPage /> : <ForbiddenPage />} />
              <Route path="/profile" element={isRouteAllowed(userType, '/profile') ? <ProfilePage /> : <ForbiddenPage />} />
              <Route path="/admin" element={isRouteAllowed(userType, '/admin') ? <AdminPanelPage /> : <ForbiddenPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </main>

          <footer className="app-footer w-100 mt-auto">
            <div className="container-fluid text-center">
              <span className="me-2">myp@intings © 2024</span> |
              <NavLink to="/support" className="footer-link">Support</NavLink> |
              <NavLink to="/terms-of-use" className="footer-link">Terms of use</NavLink> |
              <NavLink to="/contact" className="footer-link">Contact</NavLink> |
              <NavLink to="/faq" className="footer-link">FAQ</NavLink> |
              <NavLink to="/about-us" className="footer-link">About us</NavLink>
            </div>
          </footer>
        </div>
      </Toaster>
    </DemoModeProvider>
  );
}

export default App;
