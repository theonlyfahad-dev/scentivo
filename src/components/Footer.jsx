import React from 'react';

function Footer({ onHomeClick, onProductsClick, onContactClick, onCartClick }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>SENTIVA</h2>
        <p>Simple fragrances for every moment.</p>
        <ul className="footer-links">
          <li onClick={onHomeClick}>Home</li>
          <li onClick={onProductsClick}>Products</li>
          <li onClick={onContactClick}>Contact</li>
          <li onClick={onCartClick}>Cart</li>
        </ul>
        <p className="footer-email">hello@sentiva.com</p>
        <p className="footer-copyright">© 2026 SENTIVA</p>
      </div>
    </footer>
  );
}

export default Footer;
