import React, { useState, useEffect } from 'react';
import './MyOrders.css'; // Importuj dedykowane style
import apiRequest from './api';
import { useToast } from './Toaster';
import { useSession } from './hooks/useSession';
import { useDemoMode } from './DemoModeContext';

const placeholderImg = '/img.png'; // Używamy tego samego placeholdera

// Demo orders data
const DEMO_ORDERS = [
  {
    id: 1,
    bought_on: '2024-05-01',
    price: '$1,200',
    hotel: 'Grand Hotel',
    status: 'Waiting for payment',
    image_url: 'https://picsum.photos/300/300?random=41',
  },
  {
    id: 2,
    bought_on: '2024-04-15',
    price: '$800',
    hotel: 'Seaside Resort',
    status: 'Waiting to be sent',
    image_url: 'https://picsum.photos/300/300?random=42',
  },
  {
    id: 3,
    bought_on: '2024-03-20',
    price: '$1,500',
    hotel: 'Urban Inn',
    status: 'Sent by the hotel',
    image_url: 'https://picsum.photos/300/300?random=43',
  },
  {
    id: 4,
    bought_on: '2024-02-10',
    price: '$950',
    hotel: 'Forest Lodge',
    status: 'Confirmed',
    image_url: 'https://picsum.photos/300/300?random=44',
  },
  {
    id: 5,
    bought_on: '2024-01-05',
    price: '$2,000',
    hotel: 'Sunset Suites',
    status: 'Waiting for payment',
    image_url: 'https://picsum.photos/300/300?random=45',
  },
  {
    id: 6,
    bought_on: '2023-12-22',
    price: '$1,100',
    hotel: 'City Center Hotel',
    status: 'Waiting to be sent',
    image_url: 'https://picsum.photos/300/300?random=46',
  },
  {
    id: 7,
    bought_on: '2023-11-30',
    price: '$1,800',
    hotel: 'Boulevard Hotel',
    status: 'Sent by the hotel',
    image_url: 'https://picsum.photos/300/300?random=47',
  },
  {
    id: 8,
    bought_on: '2023-10-18',
    price: '$1,300',
    hotel: 'Blue Lagoon',
    status: 'Confirmed',
    image_url: 'https://picsum.photos/300/300?random=48',
  },
  {
    id: 9,
    bought_on: '2023-09-05',
    price: '$1,600',
    hotel: 'Mountain Retreat',
    status: 'Waiting for payment',
    image_url: 'https://picsum.photos/300/300?random=49',
  },
  {
    id: 10,
    bought_on: '2023-08-12',
    price: '$1,400',
    hotel: 'Desert Oasis',
    status: 'Waiting to be sent',
    image_url: 'https://picsum.photos/300/300?random=50',
  },
  {
    id: 11,
    bought_on: '2023-07-01',
    price: '$1,700',
    hotel: 'Night Hotel',
    status: 'Sent by the hotel',
    image_url: 'https://picsum.photos/300/300?random=51',
  },
  {
    id: 12,
    bought_on: '2023-06-15',
    price: '$1,250',
    hotel: 'Spring Inn',
    status: 'Confirmed',
    image_url: 'https://picsum.photos/300/300?random=52',
  },
];

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const { userType } = useSession();
    const { demoMode } = useDemoMode();

    useEffect(() => {
        if (demoMode) {
            setOrders(DEMO_ORDERS);
            setLoading(false);
            return;
        }
        setLoading(true);
        apiRequest('/hotel/ownedpaintings')
            .then(data => {
                if (data && Array.isArray(data.zamowienia)) {
                    setOrders(data.zamowienia);
                } else {
                    toast('Nieprawidłowy format danych z backendu.', 'danger');
                }
            })
            .catch(err => {
                toast(`Nie można załadować danych zamówień: ${err.message}`, 'danger');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [demoMode, toast]);

    // Funkcja do określania klasy CSS dla statusu
    const getStatusClass = (statusText) => {
        const lowerStatus = statusText.toLowerCase();
        if (lowerStatus.includes('waiting for payment')) return 'status-waiting-payment';
        if (lowerStatus.includes('waiting to be sent')) return 'status-waiting-sent';
        if (lowerStatus.includes('sent by the hotel')) return 'status-sent';
        if (lowerStatus.includes('confirmed')) return 'status-confirmed';
        return 'status-unknown'; // Domyślny styl
    };

    // Demo actions
    const handleConfirmDeliveryDemo = (orderId) => {
        setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: 'Confirmed' } : o));
        toast('Potwierdzono dostawę (demo).', 'success');
    };
    const handleCancelReservationDemo = (orderId) => {
        setOrders(orders => orders.filter(o => o.id !== orderId));
        toast('Rezerwacja anulowana (demo).', 'info');
    };
    const handleAcceptReservationDemo = (orderId) => {
        setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: 'Waiting to be sent' } : o));
        toast('Rezerwacja potwierdzona (demo).', 'success');
    };
    const handleInsertDemo = () => {
        const newId = Math.max(...orders.map(o => o.id)) + 1;
        const newOrder = {
            id: newId,
            bought_on: new Date().toISOString().slice(0, 10),
            price: '$999',
            hotel: 'Demo Hotel',
            status: 'Waiting for payment',
            image_url: `https://picsum.photos/300/300?random=${40 + newId}`,
        };
        setOrders([newOrder, ...orders]);
        toast('Zamówienie dodane (demo).', 'info');
    };

    // Real API actions (as before)
    const handleConfirmDelivery = async (orderId) => {
        try {
            await apiRequest(`/wiadomosci/confirmdelivery/${orderId}`, { method: 'POST' });
            toast('Potwierdzono dostawę.', 'success');
            window.location.reload();
        } catch (err) {
            toast('Błąd potwierdzania dostawy: ' + err.message, 'danger');
        }
    };
    const handleCancelReservation = async (orderId) => {
        try {
            await apiRequest(`/wiadomosci/cancelreservation/${orderId}`, { method: 'POST' });
            toast('Rezerwacja anulowana.', 'info');
            window.location.reload();
        } catch (err) {
            toast('Błąd anulowania rezerwacji: ' + err.message, 'danger');
        }
    };
    const handleAcceptReservation = async (orderId) => {
        try {
            await apiRequest(`/wiadomosci/acceptreservation/${orderId}`, { method: 'POST' });
            toast('Rezerwacja potwierdzona.', 'success');
            window.location.reload();
        } catch (err) {
            toast('Błąd potwierdzania rezerwacji: ' + err.message, 'danger');
        }
    };

    // Renderowanie zawartości
    const renderContent = () => {
         if (loading) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                    <p className="mt-2">Ładowanie zamówień...</p>
                </div>
            );
        }
        if (orders.length === 0) {
            return <div className="alert alert-info">Nie masz jeszcze żadnych zamówień.</div>;
        }

        return (
            <>
                {demoMode && (
                    <div className="mb-3 text-end">
                        <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Order</button>
                    </div>
                )}
                <div className="row">
                    {orders.map((order, index) => (
                        <div className="col-lg-6 mb-4" key={index}>
                            <div className="order-item d-flex p-3 border rounded bg-white shadow-sm">
                                <div className="order-image me-3">
                                    <img
                                        src={order.image_url || placeholderImg}
                                        alt="Obraz zamówienia"
                                        className="img-fluid rounded"
                                        style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }}
                                    />
                                </div>
                                <div className="order-details flex-grow-1">
                                    <p><strong>Bought on:</strong> {order.bought_on || 'N/A'}</p>
                                    <p><strong>Price:</strong> {order.price || 'N/A'}</p>
                                    <p><strong>Hotel:</strong> <span className="hotel-link">{order.hotel || 'N/A'}</span></p>
                                    <p><strong>Status:</strong> <span className={`status-label ${getStatusClass(order.status || '')}`}>{order.status || 'Unknown'}</span></p>
                                    {demoMode ? (
                                        <>
                                            <button className="btn btn-success btn-sm mt-2 me-2" onClick={() => handleConfirmDeliveryDemo(order.id)}>
                                                Confirm delivery
                                            </button>
                                            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancelReservationDemo(order.id)}>
                                                Cancel reservation
                                            </button>
                                            {(userType === 'HOTEL' && order.status && order.status.toLowerCase().includes('waiting')) && (
                                                <button className="btn btn-primary btn-sm mt-2 me-2" onClick={() => handleAcceptReservationDemo(order.id)}>
                                                    Potwierdź rezerwację
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-success btn-sm mt-2 me-2" onClick={() => handleConfirmDelivery(order.id)}>
                                                Confirm delivery
                                            </button>
                                            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancelReservation(order.id)}>
                                                Cancel reservation
                                            </button>
                                            {(userType === 'HOTEL' && order.status && order.status.toLowerCase().includes('waiting')) && (
                                                <button className="btn btn-primary btn-sm mt-2 me-2" onClick={() => handleAcceptReservation(order.id)}>
                                                    Potwierdź rezerwację
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <>
             <h1 className="text-center mb-4 page-title-orders">My orders</h1>
             {renderContent()}
        </>
    );
}

export default MyOrders;
