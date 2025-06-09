import React from 'react';
import './TermsOfUsePage.css';

function TermsOfUsePage() {
  return (
    <div className="container mt-4">
      <h2>Terms of Use</h2>
      <div className="terms-content">
        <section>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using myp@intings, you agree to be bound by these Terms of Use and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h3>2. User Accounts</h3>
          <p>
            To use certain features of the platform, you must register for an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Notify us immediately of any unauthorized use</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h3>3. Artist Responsibilities</h3>
          <p>
            Artists using the platform agree to:
          </p>
          <ul>
            <li>Provide accurate information about their artwork</li>
            <li>Maintain the quality and condition of displayed works</li>
            <li>Fulfill orders in a timely manner</li>
            <li>Handle shipping and delivery responsibly</li>
          </ul>
        </section>

        <section>
          <h3>4. Hotel Responsibilities</h3>
          <p>
            Hotels using the platform agree to:
          </p>
          <ul>
            <li>Display artwork as agreed with artists</li>
            <li>Maintain proper insurance coverage</li>
            <li>Handle artwork with care</li>
            <li>Facilitate sales through the platform</li>
          </ul>
        </section>

        <section>
          <h3>5. Intellectual Property</h3>
          <p>
            All content on the platform, including artwork, is protected by copyright and other intellectual property rights. 
            Users may not reproduce, distribute, or use any content without proper authorization.
          </p>
        </section>

        <section>
          <h3>6. Payment and Fees</h3>
          <p>
            The platform charges a commission on sales. All fees are clearly displayed before transactions are completed. 
            Payment processing is handled through secure third-party providers.
          </p>
        </section>

        <section>
          <h3>7. Limitation of Liability</h3>
          <p>
            myp@intings is not liable for any damages arising from the use of the platform, including but not limited to:
          </p>
          <ul>
            <li>Loss of artwork or property</li>
            <li>Disputes between users</li>
            <li>Technical issues or service interruptions</li>
          </ul>
        </section>

        <section>
          <h3>8. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms at any time. Users will be notified of significant changes. 
            Continued use of the platform after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h3>9. Contact</h3>
          <p>
            For questions about these terms, please contact us through our <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfUsePage; 