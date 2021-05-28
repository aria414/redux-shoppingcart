import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ cart, fave }) => {
  const [cartCount, setCartCount] = useState(0);
  const [faveCount, setFaveCount] = useState(0);

  //State change if cart changes or cart count.
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += parseInt(item.qty);
    });

    let faveCount = 0;
    fave.forEach((item) => {
      faveCount += 1;
    });

    setCartCount(count);
    setFaveCount(faveCount);
  }, [cart, cartCount, fave, faveCount]);

  return (
    <header className="header">
      <nav className="top-nav">
        <Link to="/" className="nav-logo">
          iLuvStuff
        </Link>
        <ul className="top-nav-icons">
          <li>
            <span className="material-icons">account_circle</span>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              <span className="material-icons">shopping_cart</span>
              {cartCount}
            </Link>
          </li>
          <li>
            <Link to="/fave" className="nav-link">
              <span className="material-icons">favorite</span>
              {faveCount}
            </Link>
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
          <li className="nav-item">
            <Link to="/fave" className="nav-link">
              Fave: {faveCount}
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
            <span className="material-icons">search</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    fave: state.shop.fave,
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
