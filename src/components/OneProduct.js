import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import actions
import { addToCart, loadCurrentItem } from "../actions";

//productData passed in as prop
//addToCart and loadCurrentItem are from the keys below in the function mapDispatchToProps
const OneProduct = ({ productData, addToCart, loadCurrentItem }) => {
  return (
    <div className="product">
      <img src={productData.image} alt={productData.title} />

      <div className="product-details">
        <h3>{productData.title}</h3>
        <p>{productData.description}</p>
        <h3>${productData.price}</h3>
      </div>

      <div className="product-btns">
        <Link to={`product/${productData.id}`}>
          <button onClick={() => loadCurrentItem(productData)}>
            View Item
          </button>
        </Link>
        <button onClick={() => addToCart(productData.id)}> Add to Cart</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};
//Use Null since i'm not mapping states...
export default connect(null, mapDispatchToProps)(OneProduct);
