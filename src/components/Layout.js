import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="body-container">
      <div className="sidebar">
        <h3>Quick Links</h3>
        <a href="#mission">Our Mission</a>
        <a href="#services">Services We Offer</a>
        <a href="#testimonials">What Our Members Say</a>
        <h3>Follow Us</h3>
        <div className="social-media-icons">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </div>
      </div>
      
      <div className="main-content">
        <Outlet />
      </div>
      
      <div className="sidebar">
        <h3>Latest News</h3>
        <p>Stay updated with the latest news from KMS SACCO.</p>
        <p>New service offerings are available now!</p>
        <p>Don't miss our upcoming events.</p>
      </div>
    </div>
  );
}

export default Layout;
