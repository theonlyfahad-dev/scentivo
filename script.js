// Product list
const products = [
  {
    id: 1,
    name: "IBRAQ Black Diamond Incense",
    price: 5600,
    description: "A luxurious and deep incense fragrance for a bold statement.",
    notes: "Oud, Amber, Spices",
    image: "images/ibraq-black-diamond.jpg",
    size: "150 ml",
    stock: 5
  },
  {
    id: 2,
    name: "Blue by AHMED",
    price: 5000,
    description: "A fresh and captivating oud scent that leaves a lasting impression.",
    notes: "Bergamot, Marine Notes, Oud",
    image: "images/ahmed-blu-oud.jpg",
    size: "100 ml",
    stock: 3
  },
  {
    id: 3,
    name: "MARJ",
    price: 3499,
    description: "An elegant and sophisticated perfume for every occasion.",
    notes: "Floral, Musk, Vanilla",
    image: "images/marj.jpg",
    size: "100 ml",
    stock: 10
  },
  {
    id: 4,
    name: "OUD ARABIA DUBAI",
    price: 5990,
    description: "Premium rich fragrance inspired by the essence of Dubai.",
    notes: "Rose, Saffron, Oud",
    image: "images/oud-arabia.jpg",
    size: "100 ml",
    stock: 2
  },
  {
    id: 5,
    name: "IBRAQ Blue Oud",
    price: 4500,
    description: "A unique blend of fresh ocean breeze and traditional oud.",
    notes: "Citrus, Sea Salt, Agarwood",
    image: "images/ibraq-blue-oud.jpg",
    size: "100 ml",
    stock: 8
  }
];

// Cart State loaded from localStorage
let cart = [];
let savedCart = localStorage.getItem('sentivaCart');
if (savedCart !== null) {
  cart = JSON.parse(savedCart);
}

// Modal State
let currentProduct = null;
let currentModalQuantity = 1;
let toastTimeout = null;

// Initialize on page load
window.onload = function() {
  renderProducts();
  updateCartCount();
};

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    let p = products[i];

    let stockText = '';
    if (p.stock > 5) {
      stockText = 'In Stock';
    } else {
      stockText = 'Only ' + p.stock + ' left';
    }

    let card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-subtitle">Eau de Parfum • ${p.size}</p>
        <p class="product-price">₹${p.price}</p>
        <p class="product-stock">${stockText}</p>
        <div class="product-buttons">
          <button class="button" onclick="addToCart(${p.id}, 1)">Add to Cart</button>
          <button class="button button-outline" onclick="openProductModal(${p.id})">View Details</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  }
}

// Save Cart to LocalStorage and update count
function saveCart() {
  localStorage.setItem('sentivaCart', JSON.stringify(cart));
  updateCartCount();
}

// Update Cart Count in Navbar
function updateCartCount() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  document.getElementById('cart-count').innerText = count;
}

// Show Toast Message
function showAddedToast() {
  const toast = document.getElementById('added-toast');
  toast.style.display = 'block';

  if (toastTimeout !== null) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(function() {
    toast.style.display = 'none';
  }, 2000);
}

// Add to Cart
function addToCart(productId, quantity) {
  let product = null;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
    }
  }

  if (product === null) return;

  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      if (cart[i].quantity + quantity <= product.stock) {
        cart[i].quantity = cart[i].quantity + quantity;
      } else {
        cart[i].quantity = product.stock;
      }
      found = true;
    }
  }

  if (found === false) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: quantity
    });
  }

  saveCart();
  showAddedToast();
}

// Increase Quantity in Cart
function increaseQuantity(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      if (cart[i].quantity < cart[i].stock) {
        cart[i].quantity = cart[i].quantity + 1;
      }
    }
  }
  saveCart();
  renderCart();
}

// Decrease Quantity in Cart (minimum 1)
function decreaseQuantity(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      if (cart[i].quantity > 1) {
        cart[i].quantity = cart[i].quantity - 1;
      }
    }
  }
  saveCart();
  renderCart();
}

// Remove from Cart
function removeFromCart(productId) {
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  saveCart();
  renderCart();
}

// Render Cart Modal Content
function renderCart() {
  const content = document.getElementById('cart-content');

  if (cart.length === 0) {
    content.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <button class="button" onclick="closeCart()">Continue Shopping</button>
      </div>
    `;
    return;
  }

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }

  let itemsHtml = '<div class="cart-items">';
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    itemsHtml += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <div class="cart-item-quantity">
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${item.id})">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  }
  itemsHtml += '</div>';

  itemsHtml += `
    <div class="cart-footer">
      <h3>Total: ₹${total}</h3>
      <button class="button checkout-btn" onclick="openCheckoutForm()">Checkout</button>
    </div>
  `;

  content.innerHTML = itemsHtml;
}

// Open / Close Cart Modal
function openCart() {
  renderCart();
  document.getElementById('cart-modal-overlay').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-modal-overlay').style.display = 'none';
}

// Show Checkout Form
function openCheckoutForm() {
  const content = document.getElementById('cart-content');
  content.innerHTML = `
    <div class="checkout-form-container">
      <h3>Checkout</h3>
      <form onsubmit="handlePlaceOrder(event)">
        <div id="checkout-error" class="error-message" style="display: none;"></div>
        
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="order-name">
        </div>
        
        <div class="form-group">
          <label>Phone Number</label>
          <input type="text" id="order-phone" maxlength="10" placeholder="10-digit number">
        </div>
        
        <div class="form-group">
          <label>Address</label>
          <textarea id="order-address" rows="3"></textarea>
        </div>
        
        <div class="checkout-buttons">
          <button type="submit" class="button">Place Order</button>
          <button type="button" class="button button-outline" onclick="renderCart()">Back to Cart</button>
        </div>
      </form>
    </div>
  `;
}

// Handle Place Order
function handlePlaceOrder(event) {
  event.preventDefault();

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const errorBox = document.getElementById('checkout-error');

  if (name === '' || phone === '' || address === '') {
    errorBox.innerText = 'Please fill all fields.';
    errorBox.style.display = 'block';
    return;
  }

  if (phone.length !== 10) {
    errorBox.innerText = 'Phone number must be exactly 10 digits.';
    errorBox.style.display = 'block';
    return;
  }

  errorBox.style.display = 'none';

  // Calculate total and copy items
  let total = 0;
  let itemsCopy = [];
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
    itemsCopy.push({
      name: cart[i].name,
      quantity: cart[i].quantity
    });
  }

  // Clear cart and clear localStorage
  cart = [];
  saveCart();

  // Show Order Confirmation
  const content = document.getElementById('cart-content');
  let itemsListHtml = '<ul class="order-items-list">';
  for (let i = 0; i < itemsCopy.length; i++) {
    itemsListHtml += `<li>${itemsCopy[i].name} x ${itemsCopy[i].quantity}</li>`;
  }
  itemsListHtml += '</ul>';

  content.innerHTML = `
    <div class="checkout-success">
      <h3>Order placed successfully!</h3>
      <p>Thank you for shopping with SENTIVA.</p>
      
      <div class="order-details-box">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        
        <h4 class="order-summary-title">Order Summary:</h4>
        ${itemsListHtml}
        <p class="order-total-text"><strong>Total: ₹${total}</strong></p>
      </div>
      
      <button class="button" onclick="closeCart()">Close</button>
    </div>
  `;
}

// Product Details Modal
function openProductModal(productId) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      currentProduct = products[i];
    }
  }

  if (currentProduct === null) return;

  currentModalQuantity = 1;

  let stockText = '';
  if (currentProduct.stock > 5) {
    stockText = 'In Stock';
  } else {
    stockText = 'Only ' + currentProduct.stock + ' left';
  }

  document.getElementById('modal-image').src = currentProduct.image;
  document.getElementById('modal-image').alt = currentProduct.name;
  document.getElementById('modal-title').innerText = currentProduct.name;
  document.getElementById('modal-price').innerText = '₹' + currentProduct.price;
  document.getElementById('modal-stock').innerText = stockText;
  document.getElementById('modal-description').innerText = currentProduct.description;
  document.getElementById('modal-notes').innerText = currentProduct.notes;
  document.getElementById('modal-quantity-value').innerText = currentModalQuantity;

  document.getElementById('product-modal-overlay').style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('product-modal-overlay').style.display = 'none';
  currentProduct = null;
}

function increaseModalQuantity() {
  if (currentProduct !== null && currentModalQuantity < currentProduct.stock) {
    currentModalQuantity = currentModalQuantity + 1;
    document.getElementById('modal-quantity-value').innerText = currentModalQuantity;
  }
}

function decreaseModalQuantity() {
  if (currentModalQuantity > 1) {
    currentModalQuantity = currentModalQuantity - 1;
    document.getElementById('modal-quantity-value').innerText = currentModalQuantity;
  }
}

function addModalProductToCart() {
  if (currentProduct !== null) {
    addToCart(currentProduct.id, currentModalQuantity);
    closeProductModal();
  }
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const errorBox = document.getElementById('contact-error');
  const successBox = document.getElementById('contact-success');

  if (name === '' || email === '' || message === '') {
    errorBox.style.display = 'block';
    successBox.style.display = 'none';
  } else {
    errorBox.style.display = 'none';
    successBox.style.display = 'block';

    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
  }
}

// Navigation Scrolling
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProducts() {
  const section = document.getElementById('products');
  if (section !== null) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToContact() {
  const section = document.getElementById('contact');
  if (section !== null) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
