import React, { useState } from 'react';
import { useDemoMode } from './DemoModeContext';

function LoginPage() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { demoMode } = useDemoMode();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        if (demoMode) {
            setTimeout(() => {
                setMessage('Demo login successful! You are now logged in.');
                setLoading(false);
            }, 800);
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/ogolne/logowanie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: form.login,
                    haslo: form.password
                })
            });
            if (response.status === 200) {
                setMessage('Logowanie zakończone sukcesem!');
                // Można tu np. przekierować do strony głównej
                // window.location.href = '/home';
            } else if (response.status === 401) {
                setMessage('Nieprawidłowy login lub hasło.');
            } else {
                setMessage('Błąd logowania: ' + response.status);
            }
        } catch (err) {
            setMessage('Błąd sieci: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
                <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input type="text" className="form-control" name="login" value={form.login} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            {demoMode && <div className="alert alert-info mt-3">Demo mode is ON. No real login is performed.</div>}
        </div>
    );
}

export default LoginPage;
