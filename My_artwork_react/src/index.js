import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Globalne style
import App from './App';
import { DemoModeProvider } from './DemoModeContext';

// Importuj Bootstrap CSS globalnie (zalecane)
import 'bootstrap/dist/css/bootstrap.min.css';
// Importuj ikony Bootstrapa globalnie (jeśli używasz ich przez klasy CSS)
import 'bootstrap-icons/font/bootstrap-icons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DemoModeProvider>
        <App />
      </DemoModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
