import React from 'react';

function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.product.image} alt={props.product.name} className="product-image" />
      <div className="product-info">
        <h3>{props.product.name}</h3>
        <p className="product-subtitle">Eau de Parfum • {props.product.size}</p>
        <p className="product-price">₹{props.product.price}</p>
        <div className="product-buttons">
          <button className="button" onClick={() => props.addToCart(props.product)}>Add to Cart</button>
          <button className="button button-outline" onClick={() => props.showDetails(props.product)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
