import React, { useEffect, useState } from 'react';
import OrderItemCard from '../components/OrderItemCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiRequest from '../api';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiRequest('/hotel/ownedpaintings')
      .then(data => setOrders(data?.zamowienia || []))
      .catch(err => setError('Błąd pobierania zamówień: ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1 py-4">
        <h1 className="text-center mb-4 page-title-orders">My orders</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {orders.length === 0 && !loading && <div className="alert alert-info">No orders found.</div>}
        {orders.map(order => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default MyOrdersPage; 