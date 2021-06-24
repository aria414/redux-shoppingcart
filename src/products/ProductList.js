import React from "react";

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
