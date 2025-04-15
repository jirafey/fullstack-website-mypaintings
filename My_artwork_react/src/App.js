import React from 'react';
import AddArtworkForm from './AddArtworkForm'; // Poprawna ścieżka
import './App.css'; // Style dla App

// Importuj Bootstrap CSS i Icons TUTAJ
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Jeśli używasz ikon w AddArtworkForm.js

function App() {
  return (
    // Usunięto klasę "App" z diva, aby AddArtworkForm mógł kontrolować całą strukturę
    <AddArtworkForm />
    // Jeśli chcesz zachować diva App jako kontener:
    // <div className="App">
    //   <AddArtworkForm />
    // </div>
  );
}

export default App;
