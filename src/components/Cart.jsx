import React, { useState } from 'react';

function Cart({ cart, closeCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  function handleCheckout() {
    setCheckoutSuccess(true);
    clearCart();
  }

  return (
    <div className="modal-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={closeCart}>X</button>
        </div>
        
        <div className="cart-content">
          {checkoutSuccess ? (
            <div className="checkout-success">
              <h3>Order placed successfully!</h3>
              <p>Thank you for shopping with SENTIVA.</p>
              <button className="button" onClick={closeCart}>Close</button>
            </div>
          ) : cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <button className="button" onClick={closeCart}>Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>
                      <div className="cart-item-quantity">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <h3>Total: ₹{total}</h3>
                <button className="button checkout-btn" onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
