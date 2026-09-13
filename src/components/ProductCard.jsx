import React from 'react';

function ProductCard({ product, addToCart, showDetails }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-subtitle">Eau de Parfum • {product.size}</p>
        <p className="product-price">₹{product.price}</p>
        <div className="product-buttons">
          <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="button button-outline" onClick={() => showDetails(product)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
