import React from "react";
//This connects to the store so you don't have to pass it as a prop from App.js
//connect is a higher order function which is why you see (mapstate)(products)
import { connect } from "react-redux";
//import component OneProduct
import OneProduct from "../components/OneProduct";

//{products} Destructured from mapStateToProps
const ProductList = ({ products }) => {
  return (
    <>
      <h2>All Products</h2>
      <section className="product-list">
        {products.map((item) => {
          return <OneProduct key={item.id} productData={item} />;
        })}
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    //In the reducers/index.js file we named the key 'shop'
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(ProductList);
