// src/pages/MySales.js

import React, { useEffect, useState } from 'react';
import { useDemoMode } from '../hooks/useDemoMode';
import { useToast } from '../components/ToastContext';
import './MySales.css';

function MySales() {
    const { demoMode } = useDemoMode();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const DEMO_SALES = [ /* ... (Twoje dane demo – skopiuj z poprzedniego pliku) */ ];

    useEffect(() => {
        if (demoMode) {
            setSales(DEMO_SALES);
            setLoading(false);
            return;
        }
        setSales([]);
        setLoading(false);
    }, [demoMode]);

    const handleConfirmDemo = (id) => {
        setSales(sales => sales.map(s => s.id === id ? { ...s, status: 'Delivered' } : s));
        toast('Sale confirmed (demo).', 'success');
    };

    const handleCancelDemo = (id) => {
        setSales(sales => sales.filter(s => s.id !== id));
        toast('Sale cancelled (demo).', 'info');
    };

    const handleInsertDemo = () => {
        const newId = Math.max(...sales.map(s => s.id)) + 1;
        const newSale = {
            id: newId,
            sold_on: new Date().toISOString().slice(0, 10),
            price: '$999',
            buyer: 'Demo Buyer',
            status: 'In transit',
            image_url: `https://picsum.photos/300/300?random=${60 + newId}`,
        };
        setSales([newSale, ...sales]);
        toast('Sale inserted (demo).', 'info');
    };

    return (
        <div className="container my-sales-page">
            <h2 className="page-title text-center">My Sales</h2>
            <div className="text-center mb-4">
                <button className="btn btn-primary" onClick={handleInsertDemo}>Insert Sale</button>
            </div>
            <div className="row">
                {sales.map(sale => (
                    <div key={sale.id} className="col-md-6 mb-4">
                        <div className="card p-3 sale-card">
                            <div className="row align-items-center">
                                <div className="col-md-4 text-center">
                                    <img src={sale.image_url} alt="Artwork" className="img-fluid rounded" style={{ maxHeight: "150px" }} />
                                </div>
                                <div className="col-md-8 d-flex flex-column justify-content-center text-start">
                                    <p><strong>Sold on:</strong> {sale.sold_on}</p>
                                    <p><strong>Price:</strong> {sale.price}</p>
                                    <p><strong>Buyer:</strong> {sale.buyer}</p>
                                    <p><strong>Status:</strong> <span className={`sale-status ${sale.status.toLowerCase().replace(' ', '-')}`}>{sale.status}</span></p>
                                    <div className="sale-buttons">
                                        <button className="btn btn-success btn-sm me-2" onClick={() => handleConfirmDemo(sale.id)}>Confirm delivery</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleCancelDemo(sale.id)}>Cancel sale</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MySales;
