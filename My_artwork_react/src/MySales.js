import React, { useState, useEffect } from 'react';
import './MySales.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import apiRequest from './api';
import { useSession } from './hooks/useSession';
import { useToast } from './Toaster';
import { useDemoMode } from './DemoModeContext';


function MySales() {
    const { demoMode } = useDemoMode();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const DEMO_SALES = [
        {
            id: 1,
            sold_on: '2024-05-01',
            price: '$1,200',
            buyer: 'Grand Hotel',
            likes: '2',
            image_url: 'https://picsum.photos/300/300?random=101',
        },
        {
            id: 2,
            sold_on: '2024-04-15',
            price: '$800',
            buyer: 'Seaside Resort',
            likes: '3',
            image_url: 'https://picsum.photos/300/300?random=102',
        },
        {
            id: 3,
            sold_on: '2024-03-20',
            price: '$1,500',
            buyer: 'Urban Inn',
            likes: '21',
            image_url: 'https://picsum.photos/300/300?random=103',
        },
        {
            id: 4,
            sold_on: '2024-04-20',
            price: '$1,700',
            buyer: 'Countryside Motel',
            likes: '1',
            image_url: 'https://picsum.photos/300/300?random=104',
        },
    ];


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
            likes: '3',
            image_url: `https://picsum.photos/300/300?random=${60 + newId}`,
        };
        setSales([newSale, ...sales]);
        toast('Sale inserted (demo).', 'info');
    };

    return (
        <div className="my-sales-page">
            <h1 className="page-title offset-1">My sales</h1>
            <div className="mb-3 text-end">
                <button className="demo-button" onClick={handleInsertDemo}></button>
            </div>
            <div className="row">
                {sales.map(sale => (
                    <div key={sale.id} className="col-md-4 mb-4">
                        <div className="card p-3 sale-card img-container offset-1">
                            <div className="row align-items-center">
                                <div className="col-md-4 text-center">
                                    <img src={sale.image_url} alt="Artwork" className="img-fluid rounded" style={{ maxHeight: "150px" }} />
                                </div>
                                <div className="col-md-8 d-flex flex-column justify-content-center text-start">
                                    <p><strong>Sold on:</strong> {sale.sold_on}</p>
                                    <p><strong>Price:</strong> {sale.price}</p>
                                    <p><strong>Buyer:</strong> {sale.buyer}</p>
                                    <p><strong>Likes:</strong> {sale.likes}</p>
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
