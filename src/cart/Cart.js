import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../actions";
import "./cartstyle.css";

const Cart = ({ cart, clearCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;

      setTotalPrice(price.toFixed(2)); //fixed 2 decimal places
      setTotalItems(items);
    });
  }, [cart, totalPrice, totalItems, setTotalItems, setTotalPrice]);

  const isCleared = () => {
    clearCart();
    setTotalItems(0);
    setTotalPrice(0);
  };

  //Passed down to CartItem component, use this to detect which item was removed.
  //Then deduct the product price and qty from the cart summary for this component.
  const removeCart = (item) => {
    setTotalItems(totalItems - item.qty);
    setTotalPrice((totalPrice - item.qty * item.price).toFixed(2));
  };

  return (
    <div className="cart">
      <div>
        <h2>YOUR CART</h2>
        <Link to="/list">
          <i className="las la-arrow-left"></i> Back to Shopping
        </Link>
      </div>

      <div className="cart-content">
        <div className="cart-summary">
          <div>
            <p>Number of Items: </p>
            <p>Subtotal: </p>
            <p>Ship to: </p>
            <p>Tax: </p>
            <span>Discount: </span>
          </div>

          <div>
            <p>{totalItems}</p>
            <p>{totalPrice}</p>
            <p>Zip: 12345</p>
            <p>$0.00</p>
            <span>-$0.00</span>
          </div>

          <div>
            <h3>Total: </h3>
            <h3>{totalPrice}</h3>
          </div>

          <button id="checkout">Begin to Checkout</button>
        </div>

        <div className="cart-products">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              productData={item}
              removeCart={removeCart}
            />
          ))}
        </div>
      </div>

      <button id="clear-cart" onClick={() => isCleared()}>
        Clear Cart
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
