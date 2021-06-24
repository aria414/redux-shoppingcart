import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
//Connect the component with the states.
import { connect } from "react-redux";
//import styles
import "./productstyle.css";

//Import Actions
import {
  addToCart,
  addToFave,
  removeFromFave,
  adjustItemQty,
} from "../actions";

//Import the ItemDetails mobile component
import ItemDetails from "./ItemDetails";
import ItemDetailsDesk from "./ItemDetailsDesk";

//=========== FUNCTIONAL COMPONENT START =============
const SingleItem = ({
  current,
  addToCart,
  addToFave,
  removeFromFave,
  adjustQty,
}) => {
  // ====== set toggle for fave icon ======
  const [faveClicked, setFaveClicked] = useState(false);
  const [faveIcon, setFaveIcon] = useState("");
  const [qtyVal, setQtyVal] = useState(1);

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

  const onChangeHandler = (e) => {
    let inputval = e.target.value;
    setQtyVal(inputval);
  };

  const handleQty = (operation) => {
    if (operation === "plus") {
      setQtyVal(qtyVal + 1);
      if (qtyVal >= 10) setQtyVal(10);
    }
    if (operation === "minus") {
      setQtyVal(qtyVal - 1);
      if (qtyVal <= 1) setQtyVal(1);
    }
  };
  const handleAddItem = (id, val) => {
    adjustItemQty(id, val);
    addToCart(id, val);
  };

  //============ USEEFFECT ==============
  useEffect(() => {
    //First load the boolean to see if product was faved
    const isFaved = current.faved;
    setFaveClicked(isFaved);

    //If it was faved, display the filled heart icon. Else, display the line heart icon
    if (isFaved) setFaveIcon("las la-heart");
    else setFaveIcon("lar la-heart");

    const itemQty = qtyVal;

    setQtyVal(itemQty);
    //Re-render everytime current.faved is changed
  }, [current.faved, qtyVal]);

  return (
    <section className="single-item">
      <div className="item-top-details">
        <div className="carousel-container">
          <Carousel autoPlay={false} showIndicators={false} showStatus={false}>
            {current.image.map((picture, index) => {
              return (
                <div key={index}>
                  <img alt={`product photo ${index + 1}`} src={picture} />
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="item-summary">
          <h3>{current.title}</h3>
          <h4>$ {current.price}</h4>

          <div className="item-rating">
            <div
              className="Stars"
              style={{ "--rating": current.rating }}
              aria-label={`Rating of this product is ${current.rating} out of 5.`}
            ></div>
            <span>(278 Reviews)</span>
          </div>

          <div className="item-summary-ship">
            <p>
              IN STOCK
              <i className="las la-check-circle"></i>
            </p>

            <span>Ship To - 12345 NY - Free</span>
          </div>

          <div className="details-accord expand">
            <h3>QUICK SPECS</h3>
          </div>
          <div className="accordian-open">
            <div className="attributes">
              <div className="attr-key">
                {Object.keys(current.attributes).map((elem) => (
                  <p key={elem.id}>{elem}:</p>
                ))}
              </div>
              <div className="attr-value">
                {Object.values(current.attributes).map((elem) => (
                  <p key={elem.id}>{elem}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="item-btns">
            <div className="qty-btn">
              <button onClick={() => handleQty("minus")}>-</button>
              <input
                min="1"
                type="number"
                id="qty"
                name="qty"
                value={qtyVal}
                onChange={onChangeHandler}
              />
              <button onClick={() => handleQty("plus")}>+</button>
            </div>

            <button
              id="add-item"
              onClick={() => handleAddItem(current.id, qtyVal)}
            >
              Add To Cart
            </button>

            <button id="fave-item" onClick={() => handleFave(current.id)}>
              <i className={faveIcon}></i>
            </button>
          </div>
        </div>
      </div>

      <ItemDetails current={current} />
      <ItemDetailsDesk current={current} />
    </section>
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
