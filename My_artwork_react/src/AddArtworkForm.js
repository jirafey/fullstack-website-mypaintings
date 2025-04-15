import React, { useState, useEffect } from 'react';
import './AddArtworkForm.css'; // Importuj dedykowany CSS

// Helper function to get JWT token from localStorage
const getToken = () => localStorage.getItem('jwtToken');

function AddArtworkForm() {
    // State for form fields
    const [formData, setFormData] = useState({
        title: '', dimensions: '', price: '', category: '', medium: '', style: '', date: '', description: '', imageUrl: ''
    });
    // State for image preview URL
    const [imagePreview, setImagePreview] = useState('/img.png'); // Używamy /img.png z public
    // State for JWT token management
    const [jwtToken, setJwtToken] = useState(getToken());
    const [tokenInput, setTokenInput] = useState('');
    const [tokenStatus, setTokenStatus] = useState('');
    // State for API messages
    const [message, setMessage] = useState({ type: '', text: '' });

    // Update token status on initial load
    useEffect(() => {
        setTokenStatus(getToken() ? 'Token jest w localStorage.' : 'Brak tokena w localStorage.');
    }, []);

    // Update image preview when imageUrl changes
    useEffect(() => {
        setImagePreview(formData.imageUrl.trim() ? formData.imageUrl : '/img.png');
    }, [formData.imageUrl]);

    // --- Handlers ---
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleReset = () => {
        setFormData({ title: '', dimensions: '', price: '', category: '', medium: '', style: '', date: '', description: '', imageUrl: '' });
        setMessage({ type: '', text: '' });
        console.log('Form reset.');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage({ type: '', text: '' });
        const currentToken = getToken();
        if (!currentToken) {
            setMessage({ type: 'danger', text: 'Błąd: Musisz być zalogowany (brak tokena JWT). Zapisz token.' });
            return;
        }
        const apiData = {
            title: formData.title, dimensions: formData.dimensions, price: parseFloat(formData.price),
            category: formData.category, medium: formData.medium, style: formData.style,
            date: formData.date, description: formData.description
        };
        if (!apiData.title || !apiData.dimensions || isNaN(apiData.price) || apiData.price <= 0 || !apiData.category || !apiData.medium || !apiData.style || !apiData.date || !apiData.description) {
            setMessage({ type: 'danger', text: 'Błąd: Wszystkie pola formularza są wymagane. Cena musi być poprawną liczbą dodatnią.' });
            return;
        }
        console.log('Submitting data to API:', JSON.stringify(apiData));
        setMessage({ type: 'info', text: 'Wysyłanie danych...' });
        try {
            const response = await fetch('http://localhost:8080/artysta/dzielo', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
                body: JSON.stringify(apiData)
            });
            if (response.status === 201) {
                const result = await response.json();
                setMessage({ type: 'success', text: `Dzieło dodane pomyślnie! ID: ${result.id}` });
                handleReset();
            } else {
                let errorText = `Błąd dodawania dzieła: ${response.status} ${response.statusText}`;
                try { const errorResult = await response.json(); errorText += ` - ${errorResult.message || errorResult.error || JSON.stringify(errorResult)}`; }
                catch (e) { console.debug("Could not parse error response body:", e); }
                setMessage({ type: 'danger', text: errorText }); console.error('API Error:', errorText);
                 if (response.status === 401 || response.status === 403) {setMessage({ type: 'danger', text: `${errorText}. Sprawdź, czy token jest poprawny.` });}
            }
        } catch (error) {
            console.error('Network or fetch error:', error);
            setMessage({ type: 'danger', text: `Błąd sieci lub serwera: ${error.message}. Sprawdź połączenie i czy serwer API działa.` });
        }
    };
    const handleTokenInputChange = (event) => { setTokenInput(event.target.value); };
    const saveTokenToStorage = () => {
        const trimmedToken = tokenInput.trim();
        if (trimmedToken) { localStorage.setItem('jwtToken', trimmedToken); setJwtToken(trimmedToken); setTokenStatus('Token zapisany.'); setMessage({ type: 'success', text: 'Token JWT zapisany.' }); console.log('Token saved.'); }
        else { localStorage.removeItem('jwtToken'); setJwtToken(null); setTokenStatus('Token usunięty.'); setMessage({ type: 'warning', text: 'Token JWT usunięty.' }); console.log('Token removed.'); }
        setTokenInput('');
    };

    // --- Render JSX ---
    return (
        <> {/* Zwracamy tylko zawartość */}
            {/* Sekcja zarządzania tokenem */}
            <div className="token-section card card-body bg-light p-2 mb-4"> {/* Zwiększony margines dolny */}
                <div className="d-flex flex-wrap align-items-center ">
                    <label htmlFor="jwtTokenInput" className="form-label me-2 mb-1 mb-md-0 small fw-bold">Token JWT:</label>
                    <input type="password" id="jwtTokenInput" placeholder="Wklej token JWT" value={tokenInput} onChange={handleTokenInputChange}
                           className="form-control form-control-sm me-2 mb-1 mb-md-0 flex-grow-1" style={{ minWidth: '200px' }} />
                    <button onClick={saveTokenToStorage} className="btn btn-secondary btn-sm"><i className="bi bi-save me-1"></i> Zapisz</button>
                </div>
                <div className="mt-1 small text-muted">{tokenStatus}</div>
            </div>

            <h1 className="text-center mb-4">Posting</h1> {/* Dodajemy tytuł strony */}

            {/* Komunikaty */}
            {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })} aria-label="Close"></button>
                </div>
            )}

            {/* Formularz */}
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="row">
                    {/* Lewa Kolumna */}
                    <div className="col-md-5 mb-3">
                        <div className="image-preview-box border rounded p-2 text-center bg-light d-flex flex-column justify-content-center" style={{ minHeight: '350px' }}>
                            <img src={imagePreview} alt="Podgląd dzieła" className="img-fluid mb-2 mx-auto"
                                 style={{ maxHeight: '280px', objectFit: 'contain' }}
                                 onError={(e) => { e.target.onerror = null; e.target.src = '/img.png'; }} />
                            <input type="url" id="imageUrl" name="imageUrl" placeholder="Wklej URL obrazu do podglądu..."
                                   value={formData.imageUrl} onChange={handleInputChange} className="form-control form-control-sm mt-auto" />
                        </div>
                    </div>
                    {/* Prawa Kolumna */}
                    <div className="col-md-7">
                        <div className="row">
                            {/* Sub-kolumna 1 */}
                            <div className="col-lg-6">
                                <div className="mb-2"><label htmlFor="title" className="form-label form-label-sm">Title</label><input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="form-control form-control-sm" required /></div>
                                <div className="mb-2"><label htmlFor="dimensions" className="form-label form-label-sm">Dimensions</label><input type="text" id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleInputChange} placeholder="np. 100x150 cm" className="form-control form-control-sm" required /></div>
                                <div className="mb-2"><label htmlFor="price" className="form-label form-label-sm">Price</label><div className="input-group input-group-sm"><span className="input-group-text">$</span><input type="number" step="0.01" min="0.01" id="price" name="price" value={formData.price} onChange={handleInputChange} className="form-control form-control-sm" required /></div></div>
                                <div className="mb-2"><label htmlFor="category" className="form-label form-label-sm">Category</label><input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} placeholder="np. Malarstwo" className="form-control form-control-sm" required /></div>
                                <div className="mb-2"><label htmlFor="medium" className="form-label form-label-sm">Medium</label><input type="text" id="medium" name="medium" value={formData.medium} onChange={handleInputChange} placeholder="np. Olej na płótnie" className="form-control form-control-sm" required /></div>
                                <div className="mb-2"><label htmlFor="style" className="form-label form-label-sm">Style</label><input type="text" id="style" name="style" value={formData.style} onChange={handleInputChange} placeholder="np. Realizm" className="form-control form-control-sm" required /></div>
                                <div className="mb-2"><label htmlFor="date" className="form-label form-label-sm">Date</label><input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} className="form-control form-control-sm" required /></div>
                            </div>
                            {/* Sub-kolumna 2 */}
                            <div className="col-lg-6 d-flex flex-column">
                                <div className="mb-2 flex-grow-1 d-flex flex-column"><label htmlFor="description" className="form-label form-label-sm">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="form-control form-control-sm flex-grow-1" rows="10" required style={{ resize: 'vertical' }}></textarea></div>
                            </div>
                        </div>
                        {/* Przyciski */}
                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-end">
                                <button type="reset" className="btn btn-outline-secondary btn-sm me-2"><i className="bi bi-x-lg me-1"></i> Reset</button>
                                <button type="submit" className="btn btn-primary btn-sm"><i className="bi bi-check-lg me-1"></i> Submit</button>
                            </div>
                        </div>
                    </div> {/* End Right Column */}
                </div> {/* End Main Row */}
            </form>
        </>
    );
}
export default AddArtworkForm;
