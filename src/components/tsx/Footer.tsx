import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Airia</h3>
          <p className="text-gray-600">
            Your personal AI workout coach that adapts to your fitness journey.
          </p>
          <div className="mt-4">
            <a
              href="/auth?tab=login"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
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

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Product</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </a>
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

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </a>
            </li>
            {/* <li>
              <a href="/cookies">Cookie Policy</a>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Airia Technologies Private Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
