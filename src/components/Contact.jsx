import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (name === '' || email === '' || message === '') {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We would love to hear from you.</p>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        {error === true && <div className="error-message">Please fill all fields.</div>}
        {success === true && <div className="success-message">Message sent successfully!</div>}
        
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="5"></textarea>
        </div>
        
        <button type="submit" className="button">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
