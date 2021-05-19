import React from "react";

import { connect } from "react-redux";
import { addToCart } from "../actions";

const SingleItem = ({ current, addToCart }) => {
  return (
    <div className="product">
      <img src={current.image} alt={current.title} />
      <div className="product-details">
        <p>{current.title}</p>
        <p>{current.description}</p>
        <p>$ {current.price}</p>

        <div className="product-btns">
          <button className="add-item" onClick={() => addToCart(current.id)}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
