import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer w-100 mt-auto">
      <div className="container-fluid text-center">
        <span className="me-2">myp@intings © 2024</span> |
        <a href="#" className="footer-link">Support</a> |
        <a href="#" className="footer-link">Terms of use</a> |
        <a href="#" className="footer-link">Privacy policy</a> |
        <a href="#" className="footer-link">Cookie policy</a> |
        <a href="#" className="footer-link">Copyrights policy</a>
      </div>
    </footer>
  );
}

export default Footer; 