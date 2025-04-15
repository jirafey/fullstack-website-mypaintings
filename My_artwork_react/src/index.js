import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importuj globalne style
import App from './App';
// Opcjonalnie importuj raportowanie metryk
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jeśli chcesz mierzyć wydajność:
// reportWebVitals(console.log);
