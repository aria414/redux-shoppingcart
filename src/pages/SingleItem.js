import { useState, useEffect } from "react";
//Connect the component with the states.
import { connect } from "react-redux";
//Import Actions
import {
  addToCart,
  addToFave,
  removeFromFave,
  adjustItemQty,
} from "../actions";

const SingleItem = ({
  current,
  addToCart,
  addToFave,
  removeFromFave,
  adjustQty,
}) => {
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

  const [qtyVal, setQtyVal] = useState(1);

  const onChangeHandler = (e) => {
    let inputval = e.target.value;
    setQtyVal(inputval);
    console.log("qtyVal changed: ", inputval);
  };

  const handleAddItem = (id, val) => {
    console.log("qtyVal value after click: ", val);
    adjustItemQty(id, val);
    addToCart(id, val);
  };

  useEffect(() => {
    //First load the boolean to see if product was faved
    const isFaved = current.faved;
    setFaveClicked(isFaved);

    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (isFaved) setFaveIcon("las la-heart");
    else setFaveIcon("lar la-heart");

    const itemQty = qtyVal;
    console.log("useEff qty: ", itemQty);

    setQtyVal(itemQty);
    //Re-render everytime current.faved is changed
  }, [current.faved, qtyVal]);

  return (
    <div className="product">
      <img src={current.image} alt={current.title} />
      <div className="product-details">
        <h2>{current.title}</h2>
        <p>{current.description}</p>
        <h3>$ {current.price}</h3>

        <div className="product-btns">
          <div>
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={qtyVal}
              onChange={onChangeHandler}
            />
          </div>

          <button
            id="add-item"
            onClick={() => handleAddItem(current.id, qtyVal)}
          >
            Add To Cart
          </button>

          <button id="fave-item" onClick={() => handleFave(current.id)}>
            <i class={faveIcon}></i>
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
    addToCart: (id, value) => dispatch(addToCart(id, value)),
    addToFave: (id) => dispatch(addToFave(id)),
    removeFromFave: (id) => dispatch(removeFromFave(id)),
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
