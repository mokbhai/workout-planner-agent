import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Airia</h3>
          <p>
            Your personal AI workout coach that adapts to your fitness journey.
          </p>
          <div className="mt-4">
            <a
              href="/auth?tab=login"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Log In
            </a>
          </div>
          {/* <div className="social-links">
            <a
              href="https://twitter.com/airia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/airia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/airia"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div> */}
        </div>

        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            {/* <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/demo">Request Demo</a>
            </li> */}
          </ul>
        </div>

        {/* <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            {/* <li>
              <a href="/cookies">Cookie Policy</a>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Airia Technologies Private Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
