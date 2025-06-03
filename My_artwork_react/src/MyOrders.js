import React, { useState, useEffect } from 'react';
import './MyOrders.css'; // Importuj dedykowane style
import apiRequest from './api';
import { useToast } from './Toaster';
import { useSession } from './hooks/useSession';

const placeholderImg = '/img.png'; // Używamy tego samego placeholdera

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const { userType } = useSession();

    useEffect(() => {
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
    }, []);

    // Funkcja do określania klasy CSS dla statusu
    const getStatusClass = (statusText) => {
        const lowerStatus = statusText.toLowerCase();
        if (lowerStatus.includes('waiting for payment')) return 'status-waiting-payment';
        if (lowerStatus.includes('waiting to be sent')) return 'status-waiting-sent';
        if (lowerStatus.includes('sent by the hotel')) return 'status-sent';
        if (lowerStatus.includes('confirmed')) return 'status-confirmed';
        return 'status-unknown'; // Domyślny styl
    };

    // Funkcja do potwierdzania dostawy
    const handleConfirmDelivery = async (orderId) => {
        try {
            await apiRequest(`/wiadomosci/confirmdelivery/${orderId}`, { method: 'POST' });
            toast('Potwierdzono dostawę.', 'success');
            window.location.reload();
        } catch (err) {
            toast('Błąd potwierdzania dostawy: ' + err.message, 'danger');
        }
    };

    // Funkcja do anulowania rezerwacji
    const handleCancelReservation = async (orderId) => {
        try {
            await apiRequest(`/wiadomosci/cancelreservation/${orderId}`, { method: 'POST' });
            toast('Rezerwacja anulowana.', 'info');
            window.location.reload();
        } catch (err) {
            toast('Błąd anulowania rezerwacji: ' + err.message, 'danger');
        }
    };

    // Funkcja do potwierdzania rezerwacji
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <> {/* Zwracamy tylko zawartość */}
             <h1 className="text-center mb-4 page-title-orders">My orders</h1>
             {renderContent()}
        </>
    );
}

export default MyOrders;
