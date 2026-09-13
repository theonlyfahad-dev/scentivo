import React, { useState } from 'react';

function ProductModal(props) {
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
    props.addToCart(props.product, quantity);
    props.closeDetails();
  }

  if (props.product === null) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={props.closeDetails}>X</button>
        <div className="modal-content">
          <img src={props.product.image} alt={props.product.name} className="modal-image" />
          <div className="modal-info">
            <h2>{props.product.name}</h2>
            <p className="modal-price">₹{props.product.price}</p>
            <p className="modal-description">{props.product.description}</p>
            <p className="modal-notes"><strong>Notes:</strong> {props.product.notes}</p>
            
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
