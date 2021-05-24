import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import actions
import {
  addToCart,
  loadCurrentItem,
  addToFave,
  removeFromFave,
} from "../actions";

//productData passed in as prop
//addToCart and loadCurrentItem are from the keys below in the function mapDispatchToProps
const OneProduct = ({
  productData,
  addToCart,
  loadCurrentItem,
  addToFave,
  removeFromFave,
}) => {
  //Build a string representing the attributes.
  const productAttr = `${productData.attributes.width}"W x ${productData.attributes.depth}"D x ${productData.attributes.width}"H. Made of: ${productData.attributes.material}`;

  return (
    <div className="product">
      {productData.faved ? (
        <div
          className="fave-icons"
          onClick={() => removeFromFave(productData.id)}
        >
          <span className="material-icons" style={{ color: "#ff7171" }}>
            favorite
          </span>
        </div>
      ) : (
        <div className="fave-icons" onClick={() => addToFave(productData.id)}>
          <span className="material-icons">favorite_border</span>
        </div>
      )}

      <Link
        to={`product/${productData.id}`}
        onClick={() => loadCurrentItem(productData)}
      >
        <img src={productData.image} alt={productData.title} />
      </Link>

      <div className="product-details">
        <h4>{productData.title}</h4>
        <p>Attributes: {productAttr}</p>
        <h3>${productData.price}</h3>
        <div
          className="Stars"
          style={{ "--rating": productData.rating }}
          aria-label={`Rating of this product is ${productData.rating} out of 5.`}
        ></div>
        <span>(278 Reviews)</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    addToFave: (id) => dispatch(addToFave(id)),
    removeFromFave: (id) => dispatch(removeFromFave(id)),
  };
};
//Use Null since i'm not mapping states...
export default connect(null, mapDispatchToProps)(OneProduct);
