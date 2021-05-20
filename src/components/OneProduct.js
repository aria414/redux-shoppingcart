import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import actions
import { addToCart, loadCurrentItem } from "../actions";

//productData passed in as prop
//addToCart and loadCurrentItem are from the keys below in the function mapDispatchToProps
const OneProduct = ({ productData, addToCart, loadCurrentItem }) => {
  //Build a string representing the attributes.
  const productAttr = `${productData.attributes.width}"W x ${productData.attributes.depth}"D x ${productData.attributes.width}"H. Made of: ${productData.attributes.material}`;

  return (
    <div className="product">
      <img src={productData.image} alt={productData.title} />

      <div className="product-details">
        <h3>{productData.title}</h3>
        <p>Attributes: {productAttr}</p>
        <p>{productData.description}</p>
        <h3>${productData.price}</h3>
        <p>Rating: {productData.rating}</p>
      </div>

      <div className="product-btns">
        <Link to={`product/${productData.id}`}>
          <button
            className="view-item"
            onClick={() => loadCurrentItem(productData)}
          >
            View Item
          </button>
        </Link>
        <button className="add-item" onClick={() => addToCart(productData.id)}>
          {" "}
          Add to Cart
        </button>
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
