import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Footer from './components/Footer';
import productsData from './data/products';

let initialCart = [];
let savedCart = localStorage.getItem('sentivaCart');
if (savedCart !== null) {
  initialCart = JSON.parse(savedCart);
}

function App() {
  const [cart, setCart] = useState(initialCart);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  function updateCartAndSave(newCart) {
    setCart(newCart);
    localStorage.setItem('sentivaCart', JSON.stringify(newCart));
  }

  function addToCart(product, quantity = 1) {
    let newCart = [...cart];
    let found = false;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === product.id) {
        newCart[i].quantity += quantity;
        found = true;
      }
    }

    if (found === false) {
      newCart.push({ ...product, quantity: quantity });
    }

    updateCartAndSave(newCart);
  }

  function removeFromCart(productId) {
    let newCart = cart.filter(item => item.id !== productId);
    updateCartAndSave(newCart);
  }

  function increaseQuantity(productId) {
    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === productId) {
        newCart[i].quantity += 1;
      }
    }
    updateCartAndSave(newCart);
  }

  function decreaseQuantity(productId) {
    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === productId) {
        if (newCart[i].quantity > 1) {
          newCart[i].quantity -= 1;
        }
      }
    }
    updateCartAndSave(newCart);
  }

  function clearCart() {
    updateCartAndSave([]);
  }

  function scrollToProducts() {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToContact() {
    const section = document.getElementById('contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  let cartCount = 0;
  for (let i = 0; i < cart.length; i++) {
    cartCount += cart[i].quantity;
  }

  return (
    <div>
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setShowCart(true)} 
        onHomeClick={scrollToTop}
        onProductsClick={scrollToProducts}
        onContactClick={scrollToContact}
      />
      
      <Hero onShopNow={scrollToProducts} />
      
      <section id="products" className="products-section">
        <div className="products-header">
          <h2>Our Perfumes</h2>
          <p>Explore our collection of fragrances.</p>
        </div>
        
        <div className="products-grid">
          {productsData.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={(p) => addToCart(p, 1)} 
              showDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>
      </section>

      <Contact />

      <Footer 
        onHomeClick={scrollToTop}
        onProductsClick={scrollToProducts}
        onContactClick={scrollToContact}
        onCartClick={() => setShowCart(true)}
      />

      {selectedProduct !== null && (
        <ProductModal 
          product={selectedProduct} 
          closeDetails={() => setSelectedProduct(null)} 
          addToCart={addToCart} 
        />
      )}

      {showCart === true && (
        <Cart 
          cart={cart} 
          closeCart={() => setShowCart(false)} 
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      )}
    </div>
  );
}

export default App;
