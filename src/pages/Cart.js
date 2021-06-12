import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../actions";

const Cart = ({ cart, clearCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;

      setTotalPrice(price.toFixed(2));
      setTotalItems(items);
    });
  }, [cart, totalPrice, totalItems, setTotalItems, setTotalPrice]);

  const isCleared = () => {
    clearCart();
    setTotalItems(0);
    setTotalPrice(0);
  };
  return (
    <div className="cart">
      <div>
        <h2>YOUR CART</h2>
        <Link to="/list">
          <i class="las la-arrow-left"></i> Back to Shopping
        </Link>
      </div>

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
          <p>12345</p>
          <p>$2.35</p>
          <span>-$0.00</span>
        </div>

        <div>
          <h3>Total: </h3>
          <h3>{totalPrice}</h3>
        </div>
      </div>

      <button id="checkout">Begin to Checkout</button>
      <button onClick={() => isCleared()}>Clear Cart</button>

      <div>
        {cart.map((item) => (
          <CartItem key={item.id} itemData={item} />
        ))}
      </div>
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
