//Import that reducer file in the same folder as this file.
import productsReducer from "./products";
//combine reducers
import { combineReducers } from "redux";

//Here is where we will store our state variables. You can name them however you like. The
//variables are stored as keys in the object. Its value is the Reducer name.
const allReducers = combineReducers({
  shop: productsReducer,
});

export default allReducers;
