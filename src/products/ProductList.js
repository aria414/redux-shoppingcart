import React from "react";
//This connects to the store so you don't have to pass it as a prop from App.js
//connect is a higher order function which is why you see (mapstate)(products)
import { connect } from "react-redux";
//import component OneProduct
import OneProduct from "./OneProduct";
//import styles
import "./productstyle.css";
//{products} Destructured from mapStateToProps

const ProductList = ({ listing }) => {
  // console.log("listing ", listing);

  return listing ? (
    <>
      <h2 className="headline">All Products</h2>
      <section className="product-list">
        {listing.map((item) => {
          return <OneProduct key={item.id} productData={item} />;
        })}
      </section>
    </>
  ) : (
    <h2>Loading....</h2>
  );
};

export default ProductList;
