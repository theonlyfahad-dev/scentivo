import React, { useState } from 'react';

function Cart(props) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    total = total + (props.cart[i].price * props.cart[i].quantity);
  }

  function handleCheckout() {
    setCheckoutSuccess(true);
    props.clearCart();
  }

  let cartContentHtml;

  if (checkoutSuccess === true) {
    cartContentHtml = (
      <div className="checkout-success">
        <h3>Order placed successfully!</h3>
        <p>Thank you for shopping with SENTIVA.</p>
        <button className="button" onClick={props.closeCart}>Close</button>
      </div>
    );
  } else if (props.cart.length === 0) {
    cartContentHtml = (
      <div className="cart-empty">
        <p>Your cart is empty.</p>
        <button className="button" onClick={props.closeCart}>Continue Shopping</button>
      </div>
    );
  } else {
    cartContentHtml = (
      <div>
        <div className="cart-items">
          {props.cart.map((item, index) => {
            return (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => props.decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => props.increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => props.removeFromCart(item.id)}>Remove</button>
              </div>
            );
          })}
        </div>
        <div className="cart-footer">
          <h3>Total: ₹{total}</h3>
          <button className="button checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={props.closeCart}>X</button>
        </div>
        
        <div className="cart-content">
          {cartContentHtml}
        </div>
      </div>
    </div>
  );
}

export default Cart;
