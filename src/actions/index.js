const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";
const CLEAR_CART = "CLEAR_CART";
const ADD_TO_FAVE = "ADD_TO_FAVE";
const REMOVE_FROM_FAVE = "REMOVE_FROM_FAVE";

export const addToCart = (itemID, qty) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id: itemID,
      qty,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};
export const addToFave = (itemID) => {
  return {
    type: ADD_TO_FAVE,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromFave = (itemID) => {
  return {
    type: REMOVE_FROM_FAVE,
    payload: {
      id: itemID,
    },
  };
};

export const adjustItemQty = (itemID, qty) => {
  return {
    type: ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: LOAD_CURRENT_ITEM,
    payload: item,
  };
};
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
