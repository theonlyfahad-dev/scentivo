import React, { useState } from 'react';

function ProductModal({ product, closeDetails, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    closeDetails();
  }

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={closeDetails}>X</button>
        <div className="modal-content">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-price">₹{product.price}</p>
            <p className="modal-description">{product.description}</p>
            <p className="modal-notes"><strong>Notes:</strong> {product.notes}</p>
            
            <div className="modal-quantity">
              <span>Quantity: </span>
              <button onClick={handleDecrease}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
            
            <button className="button modal-add-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
