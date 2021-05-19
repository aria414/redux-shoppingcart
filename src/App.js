import "./App.css";
//Component imports...
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import SingleItem from "./pages/SingleItem";
//Router imports
import { Route, Switch, Link, Redirect } from "react-router-dom";
//Access the states in the store
import { useSelector } from "react-redux";
import { connect } from "react-redux";

//Destructure 'current' in the mapstate func below.
function App({ current }) {
  //Access the products state from the Store
  const shop = useSelector((state) => state.shop);

  console.log(shop);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="sale-banner">
          20% off on all clearance items. Free shipping for orders over $50.Use
          code SHIPFREE at checkout for shipping discount
        </div>
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
          <Route path="/list">
            <ProductList />
          </Route>
          <Route path="/cart">
            <Cart />
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
    </div>
  );
}

//Fix problem where item crash when refresh. If the current is null, the page will redirect to main path.
const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(App);
