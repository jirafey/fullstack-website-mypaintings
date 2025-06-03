// api.js
const API_URL = 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('jwtToken');
}

async function apiRequest(endpoint, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const token = getToken();
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  };
  if (body) config.body = JSON.stringify(body);
  const response = await fetch(`${API_URL}${endpoint}`, config);
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`;
    try { const err = await response.json(); errorMsg += ': ' + (err.message || JSON.stringify(err)); } catch {}
    throw new Error(errorMsg);
  }
  if (response.status === 204) return null;
  return response.json();
}

export default apiRequest; 