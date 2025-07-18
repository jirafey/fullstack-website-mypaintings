import React, { useState, useEffect } from 'react';
import './AddArtworkForm.css'; // Importuj dedykowany CSS
import apiRequest from './api';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';

// Helper function to get JWT token from localStorage
const getToken = () => localStorage.getItem('jwtToken');

function AddArtworkForm() {
    // State for form fields
    const [formData, setFormData] = useState({
        title: '', dimensions: '', price: '', category: '', medium: '', style: '', date: '', description: '', imageUrl: ''
    });
    // State for image preview URL
    const [imagePreview, setImagePreview] = useState('');
    // State for JWT token management
    const [jwtToken, setJwtToken] = useState(getToken());
    const [tokenInput, setTokenInput] = useState('');
    const [tokenStatus, setTokenStatus] = useState('');
    // State for API messages
    const [message, setMessage] = useState({ type: '', text: '' });
    const toast = useToast();
    const { demoMode } = useDemoMode();
    // Demo: track added artworks
    const [demoArtworks, setDemoArtworks] = useState([]);

    // Update token status on initial load
    useEffect(() => {
        setTokenStatus(getToken() ? 'Token jest w localStorage.' : 'Brak tokena w localStorage.');
    }, []);

    // Update image preview when imageUrl changes
    useEffect(() => {
        setImagePreview(formData.imageUrl.trim());
    }, [formData.imageUrl]);

    // --- Handlers ---
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleReset = () => {
        setFormData({ title: '', dimensions: '', price: '', category: '', medium: '', style: '', date: '', description: '', imageUrl: '' });
        setImagePreview('');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (demoMode) {
            // Validate fields
            if (!formData.title || !formData.dimensions || !formData.price || !formData.category || !formData.medium || !formData.style || !formData.date || !formData.description || !formData.imageUrl) {
                toast('All fields are required. (demo)', 'danger');
                return;
            }
            setDemoArtworks([{
                ...formData,
                id: Date.now(),
                price: `$${parseFloat(formData.price).toFixed(2)}`,
                imageUrl: formData.imageUrl
            }, ...demoArtworks]);
            toast('Artwork added (demo)!', 'success');
            handleReset();
            return;
        }
        const currentToken = getToken();
        if (!currentToken) {
            toast('Błąd: Musisz być zalogowany (brak tokena JWT). Zapisz token.', 'danger');
            return;
        }
        const apiData = {
            title: formData.title, dimensions: formData.dimensions, price: parseFloat(formData.price),
            category: formData.category, medium: formData.medium, style: formData.style,
            date: formData.date, description: formData.description, image_url: formData.imageUrl
        };
        if (!apiData.title || !apiData.dimensions || isNaN(apiData.price) || apiData.price <= 0 || !apiData.category || !apiData.medium || !apiData.style || !apiData.date || !apiData.description || !apiData.image_url) {
            toast('Błąd: Wszystkie pola formularza są wymagane. Cena musi być poprawną liczbą dodatnią. Musisz podać URL obrazu.', 'danger');
            return;
        }
        try {
            await apiRequest('/artysta/dzielo', {
                method: 'POST',
                body: apiData
            });
            toast('Dzieło dodane pomyślnie!', 'success');
            handleReset();
        } catch (error) {
            toast(`Błąd: ${error.message}`, 'danger');
        }
    };
    const handleTokenInputChange = (event) => { setTokenInput(event.target.value); };
    const saveTokenToStorage = () => {
        const trimmedToken = tokenInput.trim();
        if (trimmedToken) { localStorage.setItem('jwtToken', trimmedToken); setJwtToken(trimmedToken); setTokenStatus('Token zapisany.'); console.log('Token saved.'); }
        else { localStorage.removeItem('jwtToken'); setJwtToken(null); setTokenStatus('Token usunięty.'); console.log('Token removed.'); }
        setTokenInput('');
    };

    // --- Render JSX ---
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg rounded-4 p-4 mb-4 post-artwork-card">
                        <div className="d-flex align-items-center mb-4">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Artist Avatar" className="rounded-circle me-3" width={56} height={56} />
                            <div>
                                <h3 className="mb-0 fw-bold">Post New Artwork</h3>
                                <div className="text-muted small">as Demo Artist</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <div className="row g-4">
                                <div className="col-md-5 mb-3">
                                    <div className="image-preview-box border rounded-4 p-2 text-center bg-light d-flex flex-column justify-content-center" style={{ minHeight: '350px' }}>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Artwork Preview" className="img-fluid mb-2 mx-auto rounded-4" style={{ maxHeight: '280px', objectFit: 'contain' }} onError={(e) => { e.target.onerror = null; e.target.src = '/img.png'; }} />
                                        ) : (
                                            <div className="text-muted">No preview</div>
                                        )}
                                        <input type="url" id="imageUrl" name="imageUrl" placeholder="Paste artwork image URL..." value={formData.imageUrl} onChange={handleInputChange} className="form-control form-control-sm mt-auto rounded-pill" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <div className="mb-2"><label htmlFor="title" className="form-label form-label-sm">Title</label><input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="form-control form-control-sm rounded-pill" required /></div>
                                            <div className="mb-2"><label htmlFor="dimensions" className="form-label form-label-sm">Dimensions</label><input type="text" id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleInputChange} placeholder="e.g. 100x150 cm" className="form-control form-control-sm rounded-pill" required /></div>
                                            <div className="mb-2"><label htmlFor="price" className="form-label form-label-sm">Price</label><div className="input-group input-group-sm"><span className="input-group-text">$</span><input type="number" step="0.01" min="0.01" id="price" name="price" value={formData.price} onChange={handleInputChange} className="form-control form-control-sm rounded-pill" required /></div></div>
                                            <div className="mb-2"><label htmlFor="category" className="form-label form-label-sm">Category</label><input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g. Painting" className="form-control form-control-sm rounded-pill" required /></div>
                                            <div className="mb-2"><label htmlFor="medium" className="form-label form-label-sm">Medium</label><input type="text" id="medium" name="medium" value={formData.medium} onChange={handleInputChange} placeholder="e.g. Oil on canvas" className="form-control form-control-sm rounded-pill" required /></div>
                                            <div className="mb-2"><label htmlFor="style" className="form-label form-label-sm">Style</label><input type="text" id="style" name="style" value={formData.style} onChange={handleInputChange} placeholder="e.g. Realism" className="form-control form-control-sm rounded-pill" required /></div>
                                            <div className="mb-2"><label htmlFor="date" className="form-label form-label-sm">Date</label><input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className="form-control form-control-sm rounded-pill" required /></div>
                                        </div>
                                        <div className="col-lg-6 d-flex flex-column">
                                            <div className="mb-2 flex-grow-1 d-flex flex-column"><label htmlFor="description" className="form-label form-label-sm">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="form-control form-control-sm flex-grow-1 rounded-4" rows="10" required style={{ resize: 'vertical' }}></textarea></div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 d-flex justify-content-end gap-2">
                                            <button type="reset" className="btn btn-outline-secondary btn-sm rounded-pill"><i className="bi bi-x-lg me-1"></i> Reset</button>
                                            <button type="submit" className="btn btn-primary btn-sm rounded-pill"><i className="bi bi-check-lg me-1"></i> Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* Demo: Show added artworks */}
                        {demoMode && demoArtworks.length > 0 && (
                            <div className="mt-4">
                                <h4>Recently Added Artworks (Demo)</h4>
                                <div className="row g-3">
                                    {demoArtworks.map(art => (
                                        <div className="col-md-4 mb-3" key={art.id}>
                                            <div className="card h-100 rounded-4 shadow-sm">
                                                <img src={art.imageUrl} alt={art.title} className="card-img-top rounded-4" style={{ height: 180, objectFit: 'cover' }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{art.title}</h5>
                                                    <p className="card-text">{art.description}</p>
                                                    <p className="card-text"><strong>Price:</strong> {art.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArtworkForm;
