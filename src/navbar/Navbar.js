import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./navstyle.css";

const Navbar = ({ cart, fave, handleSearch, clickHome }) => {
  const [cartCount, setCartCount] = useState(0);
  const [faveCount, setFaveCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const subitForm = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

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
        <div className="nav-logo" onClick={clickHome}>
          iLuvStuff
        </div>
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
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Sale
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Blog
            </Link>
          </li>
        </ul>

        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="nav-logo tablet-view" onClick={clickHome}>
          iLuvStuff
        </div>

        <form onSubmit={subitForm} className="search-bar">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="search"
            onChange={handleChange}
            value={searchTerm}
          />
          <button id="submit" type="submit">
            <span className="material-icons">search</span>
          </button>
        </form>

        <ul className="top-nav-icons tablet-view">
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
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    fave: state.shop.fave,
    products: state.shop.products,
  };
};
export default connect(mapStateToProps)(Navbar);
