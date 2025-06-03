import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { Toaster } from './Toaster';
import { DemoModeProvider, useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';

import AddArtworkForm from './AddArtworkForm';
import MyArtwork from './MyArtwork';
import MyOrders from './MyOrders';
import LandingPage from './LandingPage'; // Importuj LandingPage
import RegisterPage from './RegisterPage';
import MessagesPage from './MessagesPage';
import HotelFeed from './HotelFeed';
import PaintingViewerPage from './PaintingViewerPage';
import ProfilePage from './ProfilePage';

import './App.css';
// Bootstrap i ikony importowane w index.js

// Placeholdery dla pozostałych stron
function MySales() {
  const { demoMode } = useDemoMode();
  const [sales, setSales] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  // Demo sales data
  const DEMO_SALES = [
    { id: 1, sold_on: '2024-05-01', price: '$1,200', buyer: 'Grand Hotel', status: 'Delivered', image_url: 'https://picsum.photos/300/300?random=61' },
    { id: 2, sold_on: '2024-04-15', price: '$800', buyer: 'Seaside Resort', status: 'In transit', image_url: 'https://picsum.photos/300/300?random=62' },
    { id: 3, sold_on: '2024-03-20', price: '$1,500', buyer: 'Urban Inn', status: 'Awaiting pickup', image_url: 'https://picsum.photos/300/300?random=63' },
    { id: 4, sold_on: '2024-02-10', price: '$950', buyer: 'Forest Lodge', status: 'Delivered', image_url: 'https://picsum.photos/300/300?random=64' },
    { id: 5, sold_on: '2024-01-05', price: '$2,000', buyer: 'Sunset Suites', status: 'In transit', image_url: 'https://picsum.photos/300/300?random=65' },
    { id: 6, sold_on: '2023-12-22', price: '$1,100', buyer: 'City Center Hotel', status: 'Awaiting pickup', image_url: 'https://picsum.photos/300/300?random=66' },
    { id: 7, sold_on: '2023-11-30', price: '$1,800', buyer: 'Boulevard Hotel', status: 'Delivered', image_url: 'https://picsum.photos/300/300?random=67' },
    { id: 8, sold_on: '2023-10-18', price: '$1,300', buyer: 'Blue Lagoon', status: 'In transit', image_url: 'https://picsum.photos/300/300?random=68' },
    { id: 9, sold_on: '2023-09-05', price: '$1,600', buyer: 'Mountain Retreat', status: 'Awaiting pickup', image_url: 'https://picsum.photos/300/300?random=69' },
    { id: 10, sold_on: '2023-08-12', price: '$1,400', buyer: 'Desert Oasis', status: 'Delivered', image_url: 'https://picsum.photos/300/300?random=70' },
  ];

  React.useEffect(() => {
    if (demoMode) {
      setSales(DEMO_SALES);
      setLoading(false);
      return;
    }
    // TODO: Replace with real API call
    setSales([]);
    setLoading(false);
  }, [demoMode]);

  // Demo actions
  const handleConfirmDemo = (id) => {
    setSales(sales => sales.map(s => s.id === id ? { ...s, status: 'Delivered' } : s));
    toast('Sale confirmed (demo).', 'success');
  };
  const handleCancelDemo = (id) => {
    setSales(sales => sales.filter(s => s.id !== id));
    toast('Sale cancelled (demo).', 'info');
  };
  const handleInsertDemo = () => {
    const newId = Math.max(...sales.map(s => s.id)) + 1;
    const newSale = {
      id: newId,
      sold_on: new Date().toISOString().slice(0, 10),
      price: '$999',
      buyer: 'Demo Buyer',
      status: 'In transit',
      image_url: `https://picsum.photos/300/300?random=${60 + newId}`,
    };
    setSales([newSale, ...sales]);
    toast('Sale inserted (demo).', 'info');
  };

  if (loading) return <div className="text-center py-5">Loading sales...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 page-title">My Sales</h1>
      {demoMode && (
        <div className="mb-3 text-end">
          <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Sale</button>
        </div>
      )}
      <div className="row">
        {sales.length === 0 ? (
          <div className="alert alert-info">No sales yet.</div>
        ) : (
          sales.map(sale => (
            <div className="col-md-6 mb-4" key={sale.id}>
              <div className="order-item d-flex p-3 border rounded bg-white shadow-sm">
                <div className="order-image me-3">
                  <img src={sale.image_url} alt="Sale artwork" className="img-fluid rounded" style={{ width: '130px', height: '130px', objectFit: 'cover' }} />
                </div>
                <div className="order-details flex-grow-1">
                  <p><strong>Sold on:</strong> {sale.sold_on}</p>
                  <p><strong>Price:</strong> {sale.price}</p>
                  <p><strong>Buyer:</strong> {sale.buyer}</p>
                  <p><strong>Status:</strong> {sale.status}</p>
                  {demoMode && (
                    <>
                      <button className="btn btn-success btn-sm mt-2 me-2" onClick={() => handleConfirmDemo(sale.id)}>
                        Confirm delivery
                      </button>
                      <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancelDemo(sale.id)}>
                        Cancel sale
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

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
              <div className="profile-icon d-flex align-items-center">
                <DemoToggleButton />
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

          <main className="flex-grow-1">
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/posting" element={<AddArtworkForm />} />
              <Route path="/my-artwork" element={<MyArtwork />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/my-sales" element={<MySales />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/hotel-feed" element={<HotelFeed />} />
              <Route path="/view-painting/:paintingId" element={<PaintingViewerPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPanelPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<div className='container mt-4 text-center'><h2>404 - Page Not Found</h2></div>} />
            </Routes>
          </main>

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
      </Toaster>
    </DemoModeProvider>
  );
}

export default App;
