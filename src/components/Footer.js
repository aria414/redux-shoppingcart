import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
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

      <div className="social-media">
        <i class="lab la-facebook-f"></i>
        <i class="lab la-twitter"></i>
        <i class="lab la-instagram"></i>
        <i class="lab la-youtube"></i>
        <i class="lab la-pinterest"></i>
      </div>

      <p className="footnotes">
        © 2021 Site design by Anny. All rights reserved. I do not own any images
        or products.
      </p>
    </footer>
  );
};

export default Footer;
