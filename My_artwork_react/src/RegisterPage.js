import React, { useState } from 'react';

function RegisterPage() {
  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
    userType: 'ARTYSTA',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/ogolne/rejestracja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: form.login,
          email: form.email,
          haslo: form.password,
          typUzytkownika: form.userType
        })
      });
      if (response.status === 201) {
        setMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      } else if (response.status === 400) {
        setMessage('Użytkownik o takim loginie lub e-mailu już istnieje.');
      } else {
        setMessage('Błąd rejestracji: ' + response.status);
      }
    } catch (err) {
      setMessage('Błąd sieci: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input type="text" className="form-control" name="login" value={form.login} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">User type</label>
          <select className="form-select" name="userType" value={form.userType} onChange={handleChange} required>
            <option value="ARTYSTA">Artist</option>
            <option value="HOTEL">Hotel</option>
            <option value="GOSC">Guest</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default RegisterPage; 