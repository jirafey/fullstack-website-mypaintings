import React from 'react';
import './OrderItemCard.css';

function OrderItemCard({ order, onAction }) {
  return (
    <div className="order-item d-flex p-3 border rounded bg-white shadow-sm mb-3">
      <div className="order-image me-3">
        <img
          src={order.image_url || '/img.png'}
          alt={order.title || 'Order'}
          className="img-fluid rounded"
          style={{ width: '130px', height: '130px', objectFit: 'cover' }}
        />
      </div>
      <div className="order-details flex-grow-1">
        <p><strong>Bought on:</strong> {order.bought_on || 'N/A'}</p>
        <p><strong>Price:</strong> {order.price || 'N/A'}</p>
        <p><strong>Hotel:</strong> <span className="hotel-link">{order.hotel || 'N/A'}</span></p>
        <p><strong>Artist:</strong> <span className="artist-link">{order.artist || 'N/A'}</span></p>
        <p><strong>Status:</strong> <span className={`status-label status-${(order.status || '').toLowerCase().replace(/\s/g, '-')}`}>{order.status || 'Unknown'}</span></p>
        {onAction && (
          <div className="mt-2">
            <button className="btn btn-primary btn-sm me-2" onClick={() => onAction(order, 'details')}>Details</button>
            {/* Dodaj inne przyciski akcji wg potrzeb */}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItemCard; 