import React, { useState, useEffect } from 'react';
import './MyArtwork.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';

const getToken = () => localStorage.getItem('jwtToken');
const placeholderImg = '/img.png';

function MyArtwork() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jwtToken, setJwtToken] = useState(getToken());
    const [tokenInput, setTokenInput] = useState('');
    const [tokenStatus, setTokenStatus] = useState('');
    const { userType } = useSession();
    const toast = useToast();

    useEffect(() => {
        setTokenStatus(getToken() ? 'Token jest w localStorage.' : 'Brak tokena w localStorage.');
    }, []);

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiRequest('/artysta/mojedziela');
                if (data && Array.isArray(data.dziela)) {
                    setArtworks(data.dziela);
                } else {
                    setError('Nieprawidłowy format danych z backendu.');
                }
            } catch (err) {
                setError(`Błąd pobierania dzieł: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [jwtToken]);

    const handleDelete = async (artworkId) => {
        if (!window.confirm(`Czy na pewno chcesz usunąć dzieło o ID: ${artworkId}?`)) return;
        try {
            await apiRequest(`/artysta/dzielo/${artworkId}`, { method: 'DELETE' });
            toast('Dzieło usunięte.', 'success');
            setArtworks(prevArtworks => prevArtworks.filter(art => art.id !== artworkId));
        } catch (err) {
            toast(`Błąd usuwania dzieła: ${err.message}`, 'danger');
        }
    };

    const handleLike = async (artworkId) => {
        try {
            await apiRequest(`/hotel/painting/like/${artworkId}`, { method: 'POST' });
            setArtworks(arts => arts.map(a => a.id === artworkId ? { ...a, likes: (a.likes || 0) + 1 } : a));
            toast('Polubiono dzieło.', 'success');
        } catch (err) {
            toast(`Błąd polubienia: ${err.message}`, 'danger');
        }
    };

    const handleUnlike = async (artworkId) => {
        try {
            await apiRequest(`/hotel/painting/like/${artworkId}`, { method: 'DELETE' });
            setArtworks(arts => arts.map(a => a.id === artworkId ? { ...a, likes: Math.max((a.likes || 1) - 1, 0) } : a));
            toast('Usunięto polubienie.', 'info');
        } catch (err) {
            toast(`Błąd usuwania polubienia: ${err.message}`, 'danger');
        }
    };

    const handleReserve = async (artworkId) => {
        try {
            await apiRequest(`/wiadomosci/reservepainting/${artworkId}`, { method: 'POST' });
            toast('Obraz zarezerwowany!', 'success');
        } catch (err) {
            toast(`Błąd rezerwacji: ${err.message}`, 'danger');
        }
    };

    const formatPrice = (price) => {
        if (typeof price === 'number') { return `$${price.toFixed(2)}`; }
        if (typeof price === 'string' && price.startsWith('$')) { return price; }
        return price || 'N/A';
    };
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try { return new Date(dateString).toLocaleDateString('pl-PL'); }
        catch (e) { return dateString; }
    };
    const handleTokenInputChange = (event) => { setTokenInput(event.target.value); };
    const saveTokenToStorage = () => {
        const trimmedToken = tokenInput.trim();
        if (trimmedToken) { localStorage.setItem('jwtToken', trimmedToken); setJwtToken(trimmedToken); setTokenStatus('Token zapisany.'); console.log('Token saved.'); }
        else { localStorage.removeItem('jwtToken'); setJwtToken(null); setTokenStatus('Token usunięty.'); console.log('Token removed.'); }
        setTokenInput('');
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                    <p className="mt-2">Ładowanie dzieł...</p>
                </div>
            );
        }
        if (error) {
            return <div className="alert alert-danger">Błąd: {error}</div>;
        }
        if (artworks.length === 0) { return <div className="alert alert-info">Brak dzieł.</div>; }
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
                                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleLike(artwork.id)} title="Like">
                                        <i className="bi bi-hand-thumbs-up me-1"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleUnlike(artwork.id)} title="Unlike">
                                        <i className="bi bi-hand-thumbs-down me-1"></i> Unlike
                                    </button>
                                    {(userType === 'GOSC' || userType === 'HOTEL') && (
                                        <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleReserve(artwork.id)} title="Reserve">
                                            <i className="bi bi-cart-plus me-1"></i> Reserve
                                        </button>
                                    )}
                                    <button className="btn btn-outline-danger btn-sm delete-button" onClick={() => handleDelete(artwork.id)} title="Usuń post">
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

            <h1 className="text-center mb-4 page-title">My artwork</h1>

            {renderContent()}
         </>
    );
}

export default MyArtwork;
