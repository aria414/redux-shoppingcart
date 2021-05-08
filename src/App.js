import "./App.css";
//Component imports...
import ProductList from "./ProductList";
import Cart from "./Cart";
import SingleItem from "./SingleItem";
//Router imports
import { Route, Switch, Link, Redirect } from "react-router-dom";
//Access the states in the store
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Navbar from "./Navbar";

//Destructure 'current' in the mapstate func below.
function App({ current }) {
  //Access the products state from the Store
  const shop = useSelector((state) => state.shop);

  console.log(shop);
  return (
    <div>
      <Navbar />
      <div className="container">
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
