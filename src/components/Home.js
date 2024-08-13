import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <img src="/assets/logo.svg" alt="KMS Logo" />
        </div>
      </header>

      <section id="mission" className="section">
        <h2>Our Mission</h2>
        <p>Empowering our members through sustainable financial solutions.</p>
      </section>

      <section id="services" className="section">
        <h2>Services We Offer</h2>
        <p>Explore the range of services we provide to our members.</p>
      </section>

      <section id="testimonials" className="section">
        <h2>What Our Members Say</h2>
        <p>Read testimonials from our satisfied members.</p>
      </section>

      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default Home;
