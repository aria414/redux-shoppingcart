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

//=========== FUNCTIONAL COMPONENT START =============
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
    console.log("qtyVal changed: ", inputval);
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
    console.log("qtyVal value after click: ", val);
    adjustItemQty(id, val);
    addToCart(id, val);
  };

  //Toggle the state of the accordian divs. If you click on quickspecs div, it sends 'quickspecs' back to function as an ID and use ID to target the key of this state object
  //If quickspecs was clicked, change its state to true. And in HTML if it is true, swap class.
  const [accordian, setAccordian] = useState({
    quickspecs: false,
    desc: false,
    specs: false,
    reviews: false,
  });

  //Set toggle for accordian in product details
  const toggleAccord = (id) => {
    let val = !accordian[id];

    setAccordian({
      ...accordian,
      [id]: val,
    });

    console.log("statei is: ", accordian);
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
    <section className="single-item">
      <img src={current.image} alt={current.title} />
      <div className="item-summary">
        <h3>{current.title}</h3>
        <h4>$ {current.price}</h4>

        <div
          className="Stars"
          style={{ "--rating": current.rating }}
          aria-label={`Rating of this product is ${current.rating} out of 5.`}
        ></div>
        <span>(278 Reviews)</span>

        <div className="item-summary-ship">
          <p>
            IN STOCK
            <i className="las la-check-circle"></i>
          </p>

          <span>Ship To - 12345 NY - Free</span>
        </div>

        <div
          className="details-accord expand"
          onClick={() => toggleAccord("quickspecs")}
        >
          <h3>QUICK SPECS</h3>
        </div>
        <div className="accordian-open">
          <div className="attributes">
            <div className="attr-key">
              {Object.keys(current.attributes).map((elem) => (
                <p>{elem}:</p>
              ))}
            </div>
            <div className="attr-value">
              {Object.values(current.attributes).map((elem) => (
                <p>{elem}</p>
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
      <div className="item-details">
        <div
          className={
            accordian.desc ? "details-accord expand" : "details-accord collapse"
          }
          onClick={() => toggleAccord("desc")}
        >
          <h3>DESCRIPTION</h3>
          <i className={accordian.desc ? "arrow up" : "arrow down"}></i>
        </div>
        <div className={accordian.desc ? "accordian-open" : "accordian-close"}>
          <p>{current.description}</p>
        </div>

        <div
          className={
            accordian.specs
              ? "details-accord expand"
              : "details-accord collapse"
          }
          onClick={() => toggleAccord("specs")}
        >
          <h3>SPECIFICATION</h3>
          <i className={accordian.specs ? "arrow up" : "arrow down"}></i>
        </div>
        <div className={accordian.specs ? "accordian-open" : "accordian-close"}>
          <div className="attributes">
            <div className="attr-key">
              {Object.keys(current.attributes).map((elem) => (
                <p>{elem}:</p>
              ))}
            </div>
            <div className="attr-value">
              {Object.values(current.attributes).map((elem) => (
                <p>{elem}</p>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            accordian.reviews
              ? "details-accord expand"
              : "details-accord collapse"
          }
          onClick={() => toggleAccord("reviews")}
        >
          <h3>REVIEWS</h3>
          <i className={accordian.reviews ? "arrow up" : "arrow down"}></i>
        </div>
        <div
          className={accordian.reviews ? "accordian-open" : "accordian-close"}
        >
          <div className="item-review">
            <h4>Love this item!</h4>
            <div
              className="Stars"
              style={{ "--rating": current.rating }}
              aria-label={`Rating of this product is ${current.rating} out of 5.`}
            ></div>
            <span>01/25/2021</span>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <p>Emiya Shirou</p>
            <p>Kyoto, Japan</p>
            <i className="las la-thumbs-up"></i>
          </div>
          <div className="item-review">
            <hr />
            <h4>Best for fans</h4>
            <div
              className="Stars"
              style={{ "--rating": "5" }}
              aria-label="Rating of this product is 5 out of 5"
            ></div>
            <span>01/25/2021</span>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <p>Emiya Shirou</p>
            <p>Kyoto, Japan</p>
            <i className="las la-thumbs-up"></i>
          </div>
          <div className="item-review">
            <hr />
            <h4>Cichue notice me</h4>
            <div
              className="Stars"
              style={{ "--rating": "3.5" }}
              aria-label="Rating of this product is 3.5 out of 5"
            ></div>
            <span>01/25/2021</span>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <p>Emiya Shirou</p>
            <p>Kyoto, Japan</p>
            <i className="las la-thumbs-up"></i>
          </div>
        </div>
      </div>
      {/*End of item-details div*/}
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
