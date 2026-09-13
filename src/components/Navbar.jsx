import React from 'react';

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={props.onHomeClick}>SENTIVA</div>
      <ul className="navbar-links">
        <li onClick={props.onHomeClick}>Home</li>
        <li onClick={props.onProductsClick}>Products</li>
        <li onClick={props.onContactClick}>Contact</li>
        <li onClick={props.onCartClick}>Cart ({props.cartCount})</li>
      </ul>
    </nav>
  );
}

export default Navbar;
