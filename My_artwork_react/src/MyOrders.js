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
        reserved_on: '2024-04-30',
        paid_on: '-',
        buyer: 'Anna Kowalska',
        dimensions: '100cm x 80cm',
        price: '$1,200',
        hotel: 'Grand Hotel',
        status: 'Waiting for payment',
        image_url: 'https://picsum.photos/300/300?random=41',
    },
    {
        id: 2,
        bought_on: '2024-04-15',
        reserved_on: '2024-04-10',
        paid_on: '2024-05-01',
        buyer: 'John Smith',
        dimensions: '90cm x 60cm',
        price: '$800',
        hotel: 'Seaside Resort',
        status: 'Waiting to be sent',
        image_url: 'https://picsum.photos/300/300?random=42',
    },
    {
        id: 3,
        bought_on: '2024-03-20',
        reserved_on: '2024-03-18',
        paid_on: '2024-03-20',
        buyer: 'Emily Davis',
        dimensions: '120cm x 100cm',
        price: '$1,500',
        hotel: 'Urban Inn',
        status: 'Sent by the hotel',
        image_url: 'https://picsum.photos/300/300?random=43',
    },
    {
        id: 4,
        bought_on: '2024-02-10',
        reserved_on: '2024-02-09',
        paid_on: '2024-02-10',
        buyer: 'Michael Johnson',
        dimensions: '80cm x 70cm',
        price: '$950',
        hotel: 'Forest Lodge',
        status: 'Confirmed',
        image_url: 'https://picsum.photos/300/300?random=44',
    },
    {
        id: 5,
        bought_on: '2024-01-05',
        reserved_on: '2024-01-02',
        paid_on: '-',
        buyer: 'Sara Lee',
        dimensions: '70cm x 70cm',
        price: '$2,000',
        hotel: 'Sunset Suites',
        status: 'Waiting for payment',
        image_url: 'https://picsum.photos/300/300?random=45',
    },
    {
        id: 6,
        bought_on: '2023-12-22',
        reserved_on: '2023-12-20',
        paid_on: '2024-05-02',
        buyer: 'David Kim',
        dimensions: '100cm x 120cm',
        price: '$1,100',
        hotel: 'City Center Hotel',
        status: 'Waiting to be sent',

        image_url: 'https://picsum.photos/300/300?random=46',
    },
    {
        id: 7,
        bought_on: '2023-11-30',
        reserved_on: '2023-11-28',
        paid_on: '2023-11-30',
        buyer: 'Laura Wilson',
        dimensions: '75cm x 60cm',
        price: '$1,800',
        hotel: 'Boulevard Hotel',
        status: 'Sent by the hotel',
        image_url: 'https://picsum.photos/300/300?random=47',
    },
    {
        id: 8,
        bought_on: '2023-10-18',
        reserved_on: '2023-10-17',
        paid_on: '2023-10-18',
        buyer: 'Robert Brown',
        dimensions: '65cm x 85cm',
        price: '$1,300',
        hotel: 'Blue Lagoon',
        status: 'Confirmed',
        image_url: 'https://picsum.photos/300/300?random=48',
    },
    {
        id: 9,
        bought_on: '2023-09-05',
        reserved_on: '2023-09-01',
        paid_on: '-',
        buyer: 'Natalie Adams',
        dimensions: '90cm x 90cm',
        price: '$1,600',
        hotel: 'Mountain Retreat',
        status: 'Waiting for payment',
        image_url: 'https://picsum.photos/300/300?random=49',
    },
    {
        id: 10,
        bought_on: '2023-08-12',
        reserved_on: '2023-08-10',
        paid_on: '2024-05-01',
        buyer: 'William Harris',
        dimensions: '60cm x 60cm',
        price: '$1,400',
        hotel: 'Desert Oasis',
        status: 'Waiting to be sent',
        image_url: 'https://picsum.photos/300/300?random=50',
    },
    {
        id: 11,
        bought_on: '2023-07-01',
        reserved_on: '2023-06-29',
        paid_on: '2023-07-01',
        buyer: 'Chloe Martinez',
        dimensions: '50cm x 70cm',
        price: '$1,700',
        hotel: 'Night Hotel',
        status: 'Sent by the hotel',
        image_url: 'https://picsum.photos/300/300?random=51',
    },
    {
        id: 12,
        bought_on: '2023-06-15',
        reserved_on: '2023-06-12',
        paid_on: '2023-06-15',
        buyer: 'Daniel Thompson',
        dimensions: '80cm x 60cm',
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
            <div className="container py-4">
                {/*{demoMode && (*/}
                {/*    <div className="mb-3 text-end">*/}
                {/*        <button className="demo-button" onClick={handleInsertDemo}></button>*/}
                {/*    </div>*/}
                {/*)}*/}
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg rounded-4 p-4 mb-4 orders-card">
                            <h2 className="mb-4 fw-bold">My Orders</h2>
                            <div className="row g-4">
                                {orders.map(order => (
                                    <div key={order.id} className="col-md-6 col-lg-4">
                                        <div className="order-card rounded-4 shadow-sm">
                                            <img src={order.image_url || placeholderImg} alt="Order" className="order-image rounded-4" style={{ width: '100%', height: 200, objectFit: 'cover' }} />

                                            <div className="order-details p-3">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div>
                                                        <div className="text-muted"> From: {order.hotel}</div>
                                                        <div className="text-muted">Bought on: {order.bought_on}</div>
                                                        {userType === 'HOTEL' && (
                                                            <>
                                                                {order.buyer && <div className="text-muted">Buyer: {order.buyer}</div>}
                                                                {order.dimensions && <div className="text-muted">Size: {order.dimensions}</div>}
                                                                {order.reserved_on && <div className="text-muted">Reserved: {order.reserved_on}</div>}
                                                                {order.paid_on && <div className="text-muted">Paid: {order.paid_on}</div>}
                                                            </>
                                                        )}

                                                        <div className="mb-2"><span className="text-muted">Price: {order.price}</span></div>
                                                        <div className={`status-badge ${getStatusClass(order.status)} mb-4`}>{order.status}</div>
                                                    </div>

                                                </div>
                                                <div className="d-flex gap-2">
                                                    {userType !== 'GOSC' && (
                                                        <>
                                                            {userType === 'HOTEL' && (
                                                                <>
                                                                    <button className="btn btn-outline-success btn-sm rounded-pill flex-fill" onClick={() => handleConfirmDeliveryDemo(order.id)}>
                                                                        Confirm Delivery
                                                                    </button>
                                                                    <button className="btn btn-outline-warning btn-sm rounded-pill flex-fill" onClick={() => toast('Payment processed (demo)', 'success')}>
                                                                        Proceed with Payment
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
