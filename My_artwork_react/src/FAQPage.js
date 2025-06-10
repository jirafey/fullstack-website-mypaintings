import React, { useState } from 'react';
import './FAQPage.css';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "What is myp@intings?",
      answer: "Myp@intings is a platform connecting artists with hotels and businesses to showcase and sell original artwork. It supports both custom orders and curated collections, creating unique atmospheres while giving artists exposure and guests the opportunity to purchase one-of-a-kind souvenirs from their stay."
    },
    {
      question: "How do hotels benefit?",
      answer: "Hotels can transform their interiors with original artwork at minimal cost, only paying for delivery. They get access to a diverse selection of artists and pieces, creating a constantly evolving, unique atmosphere. The platform handles all logistics, and hotels receive a share of sales when guests purchase displayed artwork."
    },
    {
      question: "Are there any fees?",
      answer: "There are no upfront fees to join the platform. A small commission is taken only when an artwork is sold, which is split between the platform, the hotel, and the artist to cover shipping costs and provide fair compensation to all parties."
    },
    {
      question: "How can I sell my artwork on the platform?",
      answer: "Artists can create an account and upload their artworks with descriptions and prices. The platform provides free exhibition space in hotels, allowing artists to promote their work and earn from sales. The platform handles payment processing and shipping logistics."
    },
    {
      question: "How do guests purchase artwork?",
      answer: "Guests can purchase displayed artwork by scanning the QR code in the corner of each piece. This allows them to reserve the artwork, pay at the hotel reception, and either collect it personally or have it shipped to their preferred address."
    },
    {
      question: "Can I order a custom artwork?",
      answer: "Yes, you can request a custom piece by contacting the artist through their profile. Simply describe your vision and agree on details before ordering. The platform facilitates this communication and ensures secure transactions."
    },
    {
      question: "How is the artwork shipped?",
      answer: "Artworks are securely packaged and shipped via trusted courier services with tracking provided. Shipping costs and delivery times may vary by location. The platform ensures safe delivery and handles all shipping logistics."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach customer support through the contact form on our website or by emailing mpcontact@mypaintings.com. We respond within 24–48 hours to assist with any questions or concerns."
    },
    {
      question: "What features are available on the website?",
      answer: "The platform offers artist profiles, search filters, direct messaging, order tracking, QR code generation for displayed artwork, and custom request tools. It provides a seamless experience for artists, hotels, and guests."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className={`faq-question ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.question}</h3>
              <span className="toggle-icon">▼</span>
            </div>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage; 