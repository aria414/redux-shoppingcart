import React from "react";
import "../App.css";
//This connects to the store so you don't have to pass it as a prop from App.js
//connect is a higher order function which is why you see (mapstate)(products)
import { connect } from "react-redux";
//import component OneProduct
import OneProduct from "../components/OneProduct";

//{products} Destructured from mapStateToProps
const ProductList = ({ products }) => {
  return (
    <div className="itemList">
      <h2>This is a list of products</h2>
      {products.map((item) => {
        return <OneProduct key={item.id} productData={item} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    //In the reducers/index.js file we named the key 'shop'
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(ProductList);
