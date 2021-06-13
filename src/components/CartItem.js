import { useState, useEffect } from "react";
//Connect to the redux store
import { connect } from "react-redux";

//Import Actions
import {
  removeFromCart,
  adjustItemQty,
  addToFave,
  removeFromFave,
} from "../actions";

//productData was passed in from Cart.
const CartItem = ({
  productData,
  removeFromCart,
  adjustQty,
  addToFave,
  removeFromFave,
  removeCart,
  fave,
}) => {
  const [input, setInput] = useState(productData.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    //use the event target value cause its faster.
    adjustQty(productData.id, e.target.value);
  };

  // ====== set toggle for fave icon ======
  const [faveClicked, setFaveClicked] = useState(false);
  const [faveIcon, setFaveIcon] = useState("");
  const [isFaved, setIsFaved] = useState(false);

  const handleFave = (id) => {
    let isClicked = !faveClicked;
    setFaveClicked(isClicked);

    console.log("is faved: ", isFaved);
    //the isClicked variable is to make the if statements easier to read.
    //Otherwise I have to use if(!favedClicked) which is bad to read
    if (isClicked === true) {
      addToFave(id);
    }
    if (isClicked === false) {
      removeFromFave(id);
    }
  };

  const handleRemove = (item) => {
    //call the removeCart function from parent component Cart
    //Pass in the current product. Use this info to deduct item price and qty from Cart component
    removeCart(item);

    //Then call the reducer for RemoveFromCart
    removeFromCart(item.id);
  };

  useEffect(() => {
    const inFaved = fave.findIndex((elem) => elem.id == productData.id);
    console.log("found in fave ", inFaved);

    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (inFaved >= 0) {
      setIsFaved(true);
      setFaveIcon("las la-heart");
    } else {
      setIsFaved(false);
      setFaveIcon("lar la-heart");
    }

    //Trigger a re-render everytime the fave button is clicked
  }, [faveClicked]);

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={productData.image[0]} alt={productData.title} />

        <div className="cart-details-txt">
          <h3>{productData.title}</h3>
          <p>WTGTAFSD81</p>
          <div className="item-rating">
            <div
              className="Stars"
              style={{ "--rating": productData.rating }}
              aria-label={`Rating of this product is ${productData.rating} out of 5.`}
            ></div>
            <span>(278)</span>
          </div>
        </div>

        <div className="cart-price-qty">
          <h4>$ {productData.price}</h4>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={productData.qty}
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <div className="cart-btns">
        <button id="remove-cart" onClick={() => handleRemove(productData)}>
          <i className="las la-trash-alt"></i>
          Remove
        </button>

        <button id="fave-item" onClick={() => handleFave(productData.id)}>
          <i className={faveIcon}></i>
          Save
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fave: state.shop.fave,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    addToFave: (id) => dispatch(addToFave(id)),
    removeFromFave: (id) => dispatch(removeFromFave(id)),
  };
};

//Use Null since i'm not mapping states...
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
