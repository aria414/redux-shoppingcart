import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "./actions";

const Cart = ({ cart, clearCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;

      setTotalPrice(price);
      setTotalItems(items);
    });
  }, [cart, totalPrice, totalItems, setTotalItems, setTotalPrice]);

  return (
    <div className="cart">
      <h2>Cart Page</h2>

      <div>
        {cart.map((item) => (
          <CartItem key={item.id} itemData={item} />
        ))}
      </div>

      <h4>Cart Summary</h4>
      <p>TOTAL: {totalItems}</p>
      <p>PICE: {totalPrice}</p>
      <button>Proceed to Checkout</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
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
