import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaintingBuyPage.css';
const DEMO_PAINTING = {
    title: 'Abstract Dreams',
    artist: 'John Doe',
    price: '$1,200',
    dimensions: '100cm x 80cm',
    createdAt: '2024-05-01',
    imageUrl: 'https://picsum.photos/600/400?random=200',
};

function PaintingBuyPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSkip = () => setStep(2);
    const handleBuy = () => setStep(3);
    const goToLogin = () => navigate('/login');
    const goToRegister = () => navigate('/register');

    return (
        <div className="container py-4">
            {step === 1 && (
                <div className="text-center">
                    <h2 className="mb-4">Your desired painting "{DEMO_PAINTING.title}"</h2>
                    <img src={DEMO_PAINTING.imageUrl} alt="Demo" className="painting-buy-image mb-4" />

                    <div className="d-flex flex-column gap-2 col-md-4 offset-md-4">
                        <button className="btn btn-primary" onClick={goToLogin}>Log in</button>
                        <button className="btn btn-outline-primary" onClick={goToRegister}>Register</button>
                        <button className="btn btn-secondary" onClick={handleSkip}>Continue without login</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="card shadow-lg rounded-4 p-4 mb-4 painting-viewer-card">
                    <h3 className="mb-3 fw-bold text-center">{DEMO_PAINTING.title}</h3>
                    <div className="painting-image-wrapper mb-4">
                        <img src={DEMO_PAINTING.imageUrl} alt="Painting" className="painting-image w-100" />

                    </div>
                    <button className="btn btn-success btn-lg rounded-pill px-4 mx-auto button-reserve" onClick={handleBuy}>Make a reservation</button>

                    <div className="row reserve">
                            <p><strong>Artist:</strong> {DEMO_PAINTING.artist}</p>
                            <p><strong>Created:</strong> {DEMO_PAINTING.createdAt}</p>
                            <p><strong>Size:</strong> {DEMO_PAINTING.dimensions}</p>
                            <p><strong>Price:</strong> {DEMO_PAINTING.price}</p>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center py-5">
                    <h2 className="mb-4 text-success">Reservation Successful!</h2>
                    <p className="lead">Please contact the hotel reception.</p>
                    <img src={DEMO_PAINTING.imageUrl} alt="Thank you" className="img-fluid rounded mt-4" style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
}

export default PaintingBuyPage;
