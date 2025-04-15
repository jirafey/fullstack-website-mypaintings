import React, { useState, useEffect } from 'react';
import './MyArtwork.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const getToken = () => localStorage.getItem('jwtToken');
const placeholderImg = '/img.png';

const MOCK_ARTWORKS_DATA = { /* ... (dane testowe jak w poprzedniej odpowiedzi) ... */
    dziela: [
        { id: 101, date_of_post: "2024-12-11", price: "$600", hotel: "@NY_Hotel_Star", viewers: 139, likes: 12, image_url: "https://via.placeholder.com/150/771796", title: "Testowe Dzieło 1" },
        { id: 102, date_of_post: "2024-12-10", price: "$800", hotel: "@AR_Hotel_VIP", viewers: 131, likes: 16, image_url: "https://via.placeholder.com/150/24f355", title: "Inny Obrazek Testowy" },
        { id: 103, date_of_post: "2024-12-10", price: "$700", hotel: null, viewers: 221, likes: 61, image_url: "https://via.placeholder.com/150/d32776", title: "Dzieło bez hotelu" },
        { id: 104, date_of_post: "2024-12-10", price: "$700", hotel: "@AR_Hotel_VIP", viewers: 220, likes: 68, image_url: "https://via.placeholder.com/150/f66b97", title: "Kolejne Arcydzieło" },
        { id: 105, date_of_post: "2024-11-21", price: "$500", hotel: "Jakiś Hotel", viewers: 131, likes: 33, image_url: null, title: "Obraz bez URL" },
        { id: 106, date_of_post: "2024-11-15", price: 500.50, hotel: "@TestHotel", viewers: 125, likes: 32, image_url: "https://via.placeholder.com/150/56a8c2", title: "Cena jako liczba" }
    ]
};


function MyArtwork() {
    const [artworks, setArtworks] = useState(MOCK_ARTWORKS_DATA.dziela);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
    // Stany tokena pozostają
    const [jwtToken, setJwtToken] = useState(getToken());
    const [tokenInput, setTokenInput] = useState('');
    const [tokenStatus, setTokenStatus] = useState('');

     useEffect(() => { setTokenStatus(getToken() ? 'Token jest w localStorage.' : 'Brak tokena w localStorage.'); }, []);

    const handleDelete = (artworkId) => {
        if (!window.confirm(`Czy na pewno chcesz (symulacyjnie) usunąć dzieło o ID: ${artworkId}?`)) return;
        setActionMessage({ type: 'success', text: `Symulacja: Dzieło ${artworkId} usunięte z widoku.` });
        console.log(`Simulating delete for artwork ID: ${artworkId}`);
        setArtworks(prevArtworks => prevArtworks.filter(art => art.id !== artworkId));
        // Nie wysyłamy fetch DELETE
    };

     const formatPrice = (price) => { /* ... (bez zmian) ... */
        if (typeof price === 'number') { return `$${price.toFixed(2)}`; }
        if (typeof price === 'string' && price.startsWith('$')) { return price; }
        return price || 'N/A';
    };
     const formatDate = (dateString) => { /* ... (bez zmian) ... */
         if (!dateString) return 'N/A';
         try { return new Date(dateString).toLocaleDateString('pl-PL'); }
         catch (e) { return dateString; }
     };
     const handleTokenInputChange = (event) => { setTokenInput(event.target.value); };
     const saveTokenToStorage = () => { /* ... (bez zmian, używa setActionMessage) ... */
        const trimmedToken = tokenInput.trim();
        if (trimmedToken) { localStorage.setItem('jwtToken', trimmedToken); setJwtToken(trimmedToken); setTokenStatus('Token zapisany.'); setActionMessage({ type: 'success', text: 'Token JWT zapisany.' }); console.log('Token saved.'); }
        else { localStorage.removeItem('jwtToken'); setJwtToken(null); setTokenStatus('Token usunięty.'); setActionMessage({ type: 'warning', text: 'Token JWT usunięty.' }); console.log('Token removed.'); }
        setTokenInput('');
    };

    const renderContent = () => {
        if (artworks.length === 0) { return <div className="alert alert-info">Brak testowych dzieł.</div>; }
        return (
            <div className="row">
                {artworks.map(artwork => (
                    <div className="col-md-6 mb-4" key={artwork.id}>
                        <div className="artwork-item d-flex p-2 border rounded bg-white shadow-sm">
                            <div className="artwork-image me-3">
                                <img src={artwork.image_url || placeholderImg} alt={artwork.title || 'Dzieło'} className="img-fluid rounded"
                                     style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }} />
                            </div>
                            <div className="artwork-details d-flex flex-column flex-grow-1">
                                {artwork.title && <p className="fw-bold mb-1">{artwork.title}</p>}
                                <p><strong>Date of post:</strong> {formatDate(artwork.date_of_post)}</p>
                                <p><strong>Price:</strong> {formatPrice(artwork.price)}</p>
                                <p><strong>Hotel:</strong> <span className="hotel-link">{artwork.hotel || 'Brak'}</span></p>
                                <p><small>Viewers: {artwork.viewers || 0}</small></p>
                                <p><small>Likes: {artwork.likes || 0}</small></p>
                                <div className="mt-auto text-end">
                                    <button className="btn btn-outline-danger btn-sm delete-button" onClick={() => handleDelete(artwork.id)} title="Usuń post (symulacja)">
                                        <i className="bi bi-x-lg me-1"></i> Delete post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
         <> {/* Zwracamy tylko zawartość */}
            {/* Sekcja tokena może tu zostać dla testów */}
             <div className="token-section card card-body bg-light p-2 mb-4">
                 <div className="d-flex flex-wrap align-items-center ">
                     <label htmlFor="jwtTokenInput" className="form-label me-2 mb-1 mb-md-0 small fw-bold">Token JWT (testowy):</label>
                     <input type="password" id="jwtTokenInput" placeholder="Wklej token (nieużywany do fetch)" value={tokenInput} onChange={handleTokenInputChange}
                            className="form-control form-control-sm me-2 mb-1 mb-md-0 flex-grow-1" style={{ minWidth: '200px' }} />
                     <button onClick={saveTokenToStorage} className="btn btn-secondary btn-sm"><i className="bi bi-save me-1"></i> Zapisz</button>
                 </div>
                 <div className="mt-1 small text-muted">{tokenStatus}</div>
             </div>

            <h1 className="text-center mb-4 page-title">My artwork (Test Data)</h1>

            {actionMessage.text && (
                <div className={`alert alert-${actionMessage.type} alert-dismissible fade show`} role="alert">
                    {actionMessage.text}
                    <button type="button" className="btn-close" onClick={() => setActionMessage({ type: '', text: '' })} aria-label="Close"></button>
                </div>
            )}

            {renderContent()}
         </>
    );
}
export default MyArtwork;
