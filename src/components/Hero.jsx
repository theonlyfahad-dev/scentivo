import React from 'react';

function Hero(props) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>SENTIVA</h1>
        <h2>Find Your Signature Scent</h2>
        <p>Simple fragrances for every moment.</p>
        <button className="button" onClick={props.onShopNow}>Shop Now</button>
      </div>
      <div className="hero-image-container">
        <img src="/images/hero-perfume.jpg" alt="Perfume" className="hero-image" />
      </div>
    </section>
  );
}

export default Hero;
