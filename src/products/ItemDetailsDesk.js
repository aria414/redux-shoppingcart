import { useState, useEffect } from "react";
//import the reviews data
import sampleReviews from "../datafiles/reviews";

const ItemDetailsDesk = ({ current }) => {
  //Object used for the default state
  const accordObj = {
    desc: false,
    specs: false,
    reviews: false,
  };

  //Set desc to be true by default since its the first thing we see.
  const [accordian, setAccordian] = useState({ ...accordObj, desc: true });

  //Set desc/specs/reviews to true if clicked. Set everything else false.
  const toggleAccord = (id) => {
    setAccordian({
      ...accordObj,
      [id]: true,
    });
  };

  useEffect(() => {
    console.log("accordian state: ", accordian);
  }, [accordian]);

  return (
    <div className="item-details-desk">
      <ul className="details-option">
        <li
          onClick={() => {
            toggleAccord("desc");
          }}
          className="details-accord"
        >
          <h3>DESCRIPTION</h3>
        </li>
        <li
          onClick={() => {
            toggleAccord("specs");
          }}
          className="details-accord"
        >
          <h3>SPECIFICATIONS</h3>
        </li>
        <li
          onClick={() => {
            toggleAccord("reviews");
          }}
          className="details-accord"
        >
          <h3>REVIEWS</h3>
        </li>
      </ul>

      <div className="details-expand">
        <div className={accordian.desc ? "accordian-open" : "accordian-close"}>
          <p>{current.description}</p>
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
          className={accordian.reviews ? "accordian-open" : "accordian-close"}
        >
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
    </div>
  );
};

export default ItemDetailsDesk;
