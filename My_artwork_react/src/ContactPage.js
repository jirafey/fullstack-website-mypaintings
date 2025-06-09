import React from 'react';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import './ContactPage.css';

function ContactPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (demoMode) {
      toast('Message sent (demo).', 'success');
    } else {
      // TODO: Implement real contact form submission
      toast('Message sent.', 'success');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="contact-details">
              <p><strong>Email:</strong> contact@mypaintings.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Art Street, Art City, AR, USA</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" id="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 