import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ cart }) => {
  const [cartCount, setCartCount] = useState(0);

  //State change if cart changes or cart count.
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/">Logo</Link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Product Listing</Link>
            </li>
            <li>
              <Link to="/cart">Cart: {cartCount}</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/list">Product Listing</Link>
        </li>
        <li>
          <Link to="/product">Product Item</Link>
        </li>
        <li>
          <Link to="/cart">Cart: {cartCount}</Link>
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};
export default connect(mapStateToProps)(Navbar);
