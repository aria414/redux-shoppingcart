import { useState } from "react";
//import the reviews data
import sampleReviews from "../datafiles/reviews";

const ItemDetails = ({ current }) => {
  //Toggle the state of the accordian divs.
  //Clicking on quickspecs div sends 'quickspecs' back to function as an ID and use ID to target the property of this state object
  //If quickspecs is clicked, state change to true and HTML will swap class.
  const [accordian, setAccordian] = useState({
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
  };

  return (
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
          accordian.specs ? "details-accord expand" : "details-accord collapse"
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
      <div className={accordian.reviews ? "accordian-open" : "accordian-close"}>
        {sampleReviews.map((review, index) => {
          return (
            <div className="item-review" key={index}>
              <h4>{review.title}</h4>
              <div className="review-date-stars">
                <div
                  className="Stars"
                  style={{ "--rating": review.rating }}
                  aria-label={`Rating of this product is ${review.rating} out of 5.`}
                ></div>
                <span>{review.date}</span>
              </div>

              <p>{review.content}</p>

              <div className="user-helpful-group">
                <div className="review-userinfo">
                  <p>{review.author}</p>
                  <p>{review.location}</p>
                </div>
                <div className="review-helpful">
                  <i className="las la-thumbs-up"></i>
                  <span>{review.helpful}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDetails;
