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
    <header className="header">
      <nav className="top-nav">
        <Link to="/" className="nav-logo">
          iLuvStuff
        </Link>
        <ul className="top-nav-icons">
          <li>
            <span class="material-icons">account_circle</span>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              <span class="material-icons">shopping_cart</span>
              {cartCount}
            </Link>
          </li>
          <li>
            <span class="material-icons">favorite</span>
          </li>
        </ul>
      </nav>
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/list" className="nav-link">
              Product Listing
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart: {cartCount}
            </Link>
          </li>
        </ul>

        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="search-bar">
          <input type="text" id="search" name="search" placeholder="search" />
          <button id="submit">
            <span class="material-icons">search</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};
export default connect(mapStateToProps)(Navbar);

/*
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


*/
