import "./reset.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Component imports...
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import ProductList from "./products/ProductList";
import Cart from "./cart/Cart";
import Fave from "./favorites/Fave";
import SingleItem from "./products/SingleItem";
import adbanner from "./adbanner.png";

//Router imports
import { Route, Switch, Redirect } from "react-router-dom";
//Access the states in the store
// import { useSelector } from "react-redux";
import { connect } from "react-redux";

//Destructure 'current' in the mapstate func below.
function App({ current, products }) {
  const history = useHistory();
  //state with the current product listing. Will change when search is used
  const [listing, setListing] = useState(products);

  //Taking result from Navbar component's search bar
  const handleSearch = (value) => {
    const data = products.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });

    console.log("searched ", value);

    setListing(data);

    history.push(`/list/search/${value}`);
  };

  //Function embeded to the Logo to return to main page and reset listing state to all products
  const clickLogo = () => {
    history.push("/");
    setListing(products);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} clickHome={clickLogo} />
      <div className="container">
        <div className="sale-banner">
          20% off on all clearance items. Free shipping for orders over $50.Use
          code SHIPFREE at checkout for shipping discount
        </div>
        <div className="advertise-banner">
          <img src={adbanner} alt="Sale banner" />

          <h2>SHOP HOME DECOR</h2>
          <p>20% off on all clearance items</p>
          <button>Shop Sale</button>
        </div>
        <Switch>
          <Route exact path="/">
            <ProductList listing={listing} />
          </Route>
          <Route path="/list">
            <ProductList listing={listing} />
          </Route>

          <Route path="/list/search/:search">
            <ProductList listing={listing} />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/fave">
            <Fave />
          </Route>
          {!current ? (
            <Redirect to="/" />
          ) : (
            <Route path="/product/:id">
              <SingleItem />
            </Route>
          )}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

//Fix problem where item crash when refresh. If the current is null, the page will redirect to main path.
const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(App);
