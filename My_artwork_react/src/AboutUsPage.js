import React from 'react';
import './AboutUsPage.css';

function AboutUsPage() {
  return (
    <div className="container mt-4">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h3>Our Mission</h3>
            <p>
              At myp@intings, we believe in the power of art to transform spaces and connect people. 
              Our platform bridges the gap between talented artists and unique spaces like hotels, 
              creating opportunities for both creators and businesses.
            </p>
            <p>
              We're dedicated to making art accessible while supporting artists in their creative journey. 
              Through our platform, hotels can enhance their spaces with original artwork, and artists can 
              reach new audiences and potential buyers.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h3>What We Do</h3>
            <p>
              We provide a seamless platform where artists can showcase their work, hotels can discover 
              unique pieces for their spaces, and art enthusiasts can find and purchase original artwork.
            </p>
            <ul>
              <li>Connect artists with hotels and art enthusiasts</li>
              <li>Facilitate artwork display and sales</li>
              <li>Support artists in their creative journey</li>
              <li>Help hotels create unique atmospheres</li>
            </ul>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h3>Our Values</h3>
            <p>
              We're committed to:
            </p>
            <ul>
              <li>Supporting artists and their creative expression</li>
              <li>Making art accessible to everyone</li>
              <li>Creating meaningful connections between artists and spaces</li>
              <li>Maintaining transparency in all transactions</li>
              <li>Providing excellent customer service</li>
            </ul>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h3>Join Our Community</h3>
            <p>
              Whether you're an artist looking to showcase your work, a hotel seeking to enhance your space, 
              or an art enthusiast looking to discover new pieces, we invite you to join our growing community.
            </p>
            <p>
              Together, we can create a world where art is accessible, appreciated, and integrated into our 
              everyday spaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage; 