import React from "react";
import { Link } from "react-router-dom";
import "./footerstyle.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h3>ABOUT</h3>
          <ul>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Testimonials</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CUSTOMER SERVICE</h3>
          <ul>
            <li>
              <Link to="#">Account</Link>
            </li>
            <li>
              <Link to="#">Orders</Link>
            </li>
            <li>
              <Link to="#">Track an Order</Link>
            </li>
            <li>
              <Link to="#">Shipping & Delivery</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CONTACT</h3>
          <ul>
            <li>
              <button>Message Us</button>
            </li>
            <li>
              <button>Call Us</button>
            </li>
          </ul>
        </div>

        <div className="footnotes">
          <div className="social-media">
            <i className="lab la-facebook-f"></i>
            <i className="lab la-twitter"></i>
            <i className="lab la-instagram"></i>
            <i className="lab la-youtube"></i>
            <i className="lab la-pinterest"></i>
          </div>

          <p>
            © 2021 Site design by Anny. All rights reserved. I do not own any
            images or products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
