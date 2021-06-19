import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Connect the component with the states.
import { connect } from "react-redux";
//import actions
import { loadCurrentItem, addToFave, removeFromFave } from "../actions";
//import styles
import "./productstyle.css";

//productData passed in as prop
//loadCurrentItem are from the keys below in the function mapDispatchToProps
const OneProduct = ({
  productData,
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
    setFaveClicked(isClicked);

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
    const isFaved = productData.faved;
    setFaveClicked(isFaved);

    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (isFaved) setFaveIcon("las la-heart");
    else setFaveIcon("lar la-heart");

    //Re-render everytime productData.faved is changed
  }, [productData.faved]);

  return (
    <div className="product">
      <div className="fave-icons" onClick={() => handleFave(productData.id)}>
        <i className={faveIcon}></i>
      </div>

      <Link
        to={`product/${productData.id}`}
        onClick={() => loadCurrentItem(productData)}
      >
        <img src={productData.image[0]} alt={productData.title} />
      </Link>

      <div className="product-details">
        <h3>{productData.title}</h3>
        <p>Attributes: {productAttr}</p>
        <h4>${productData.price}</h4>
        <div
          className="Stars"
          style={{ "--rating": productData.rating }}
          aria-label={`Rating of this product is ${productData.rating} out of 5.`}
        ></div>
        <span>(278)</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    addToFave: (id) => dispatch(addToFave(id)),
    removeFromFave: (id) => dispatch(removeFromFave(id)),
  };
};
//Use Null since i'm not mapping states...
export default connect(null, mapDispatchToProps)(OneProduct);
