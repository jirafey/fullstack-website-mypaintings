import React, { useState, useEffect } from 'react';
import './MyOrders.css'; // Importuj dedykowane style

const placeholderImg = '/img.png'; // Używamy tego samego placeholdera

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Pobieramy dane z pliku orders.json z folderu public
        fetch('/orders.json') // Ścieżka względna do roota public
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Sprawdź, czy dane mają oczekiwaną strukturę
                if (data && Array.isArray(data.zamowienia)) {
                    setOrders(data.zamowienia);
                } else {
                    console.error("Nieprawidłowy format danych w orders.json:", data);
                    setError("Otrzymano nieprawidłowy format danych zamówień.");
                }
            })
            .catch(err => {
                console.error("Błąd pobierania orders.json:", err);
                setError(`Nie można załadować danych zamówień: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Pusta tablica zależności - uruchom tylko raz przy montowaniu

    // Funkcja do określania klasy CSS dla statusu
    const getStatusClass = (statusText) => {
        const lowerStatus = statusText.toLowerCase();
        if (lowerStatus.includes('waiting for payment')) return 'status-waiting-payment';
        if (lowerStatus.includes('waiting to be sent')) return 'status-waiting-sent';
        if (lowerStatus.includes('sent by the hotel')) return 'status-sent';
        if (lowerStatus.includes('confirmed')) return 'status-confirmed';
        return 'status-unknown'; // Domyślny styl
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
        if (error) {
            return <div className="alert alert-danger">Błąd: {error}</div>;
        }
        if (orders.length === 0) {
            return <div className="alert alert-info">Nie masz jeszcze żadnych zamówień.</div>;
        }

        return (
            <div className="row">
                {orders.map((order, index) => ( // Używamy index jako klucza, jeśli brakuje unikalnego ID
                    <div className="col-lg-6 mb-4" key={index}> {/* Lepszy byłby `order.id` jeśli istnieje */}
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
