import React from "react";

import { connect } from "react-redux";
import { addToCart, addToFave } from "../actions";

const SingleItem = ({ current, addToCart, addToFave }) => {
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
          <button className="fave-item" onClick={() => addToFave(current.id)}>
            Add To Fave
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
    addToFave: (id) => dispatch(addToFave(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
