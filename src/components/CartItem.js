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

  const handleFave = (id) => {
    let isClicked = !faveClicked;
    setFaveClicked(isClicked);
    console.log("isClicked ", isClicked);
    //the isClicked variable is to make the if statements easier to read.
    //Otherwise I have to use if(!favedClicked) which is bad to read
    if (isClicked === true) {
      addToFave(id);
      setFaveIcon("las la-heart");
    }
    if (isClicked === false) {
      removeFromFave(id);
      setFaveIcon("lar la-heart");
    }
  };

  useEffect(() => {
    const isFaved = productData.faved;
    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (isFaved) setFaveIcon("las la-heart");
    else setFaveIcon("lar la-heart");

    console.log("isFaved ", isFaved);
  }, [productData.faved]);

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
            <span>(278 Reviews)</span>
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
        <button id="remove-cart" onClick={() => removeFromCart(productData.id)}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    addToFave: (id) => dispatch(addToFave(id)),
    removeFromFave: (id) => dispatch(removeFromFave(id)),
  };
};

//Use Null since i'm not mapping states...
export default connect(null, mapDispatchToProps)(CartItem);
