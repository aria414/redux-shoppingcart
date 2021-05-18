import React, { useState } from "react";

import { connect } from "react-redux";
import { removeFromCart, adjustItemQty } from "../actions";

//itemData was passed in from Cart.
const CartItem = ({ itemData, removeFromCart, adjustQty }) => {
  const [input, setInput] = useState(itemData.qty);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
    //use the event target value cause its faster.
    adjustQty(itemData.id, e.target.value);
  };

  return (
    <div className="product">
      <img src={itemData.image} alt={itemData.title} />

      <div className="product-details">
        <p>{itemData.title}</p>
        <p>{itemData.description}</p>
        <p>$ {itemData.price}</p>
      </div>

      <div className="product-details">
        <div>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={itemData.qty}
            onChange={onChangeHandler}
          />
        </div>

        <button onClick={() => removeFromCart(itemData.id)}>
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
