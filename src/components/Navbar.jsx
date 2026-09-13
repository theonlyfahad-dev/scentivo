import React from 'react';

function Navbar({ cartCount, onCartClick, onHomeClick, onProductsClick, onContactClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onHomeClick}>SENTIVA</div>
      <ul className="navbar-links">
        <li onClick={onHomeClick}>Home</li>
        <li onClick={onProductsClick}>Products</li>
        <li onClick={onContactClick}>Contact</li>
        <li onClick={onCartClick}>Cart ({cartCount})</li>
      </ul>
    </nav>
  );
}

export default Navbar;
