import { useState, useEffect } from "react";
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

  //set toggle for fave icon
  const [faveClicked, setFaveClicked] = useState(false);
  const [faveIcon, setFaveIcon] = useState("");

  const handleFave = (id) => {
    let isClicked = !faveClicked;
    setFaveClicked(!faveClicked);

    //the isClicked variable is to make the if statements easier to read.
    //Otherwise I have to use if(!favedClicked) which is bad to read
    if (isClicked === true) {
      addToFave(id);
    }
    if (isClicked === false) {
      removeFromFave(id);
    }
  };

  useEffect(() => {
    //First load the boolean to see if product was faved
    setFaveClicked(productData.faved);

    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (productData.faved) setFaveIcon("las la-heart");
    else setFaveIcon("lar la-heart");

    //Re-render everytime productData.faved is changed
  }, [productData.faved]);

  console.log(faveIcon);

  return (
    <div className="product">
      <div className="fave-icons" onClick={() => handleFave(productData.id)}>
        <i class={faveIcon}></i>
      </div>

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

/*

      {productData.faved ? (
        <div
          className="fave-icons"
          onClick={() => handleFave(productData.id)}
        >
          <i class={"las la-heart"}></i>
        </div>
      ) : (
        <div className="fave-icons" onClick={() => handleFave(productData.id)}>
          <i class="lar la-heart"></i>
        </div>
      )}

*/
