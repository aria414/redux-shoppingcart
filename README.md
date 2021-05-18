# Project Overview

## Project Links

- Comming Soon!
- Comming Soon!

## Project Description

Simple shopping cart application built with redux to manage states. Thanks to [The Full Stack Junkie](https://www.youtube.com/watch?v=MNs_7avLIJ4&t=2s) For this amazing tutorial!

## API

No API for now. Used hardcoded data for simplicity stake. Stay tuned for the next project will be an e-commerce site!

## Product Data

```js
const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "This is the COOLEST Cube Ever",
      description:
        "This cube will keep you busy the entire day and it is very fun to play with",
      price: 15.0,
      image:
        "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      title: "Large Coffee Cup",
      description:
        "Get a big cup of coffee every morning before the day starts",
      price: 20.0,
      image:
        "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
  ],
  cart: [],
  currentItem: null,
};
```

## Wireframes

- [Wireframes](https://github.com/aria414/redux-shoppingcart/tree/master/images)

- [React Architecture]

### TIME PROXIMITY TABLES

Wanna see how long it took to build?

#### MVP

| Component                     | Priority | Estimated Time | Actual Time |
| ----------------------------- | :------: | :------------: | :---------: |
| Simple Redux tutorial - Built |    H     |     3 hrs      |    2 hrs    |
| Shoping Cart Tutorial - Built |    H     |     5 hrs      |    4 hrs    |
| Mobile Product List Page      |    H     |     2 hrs      |    2 hrs    |
| Tablet Product List Page      |    H     |     3 hrs      |    3 hrs    |
| Desktop Product List Page     |    H     |     4 hrs      |    4 hrs    |
| Mobile Single Product Page    |    H     |     4 hrs      |     hrs     |
| Tablet Single Product Page    |    H     |     3 hrs      |     hrs     |
| Desktop Single Product Page   |    H     |     2 hrs      |     hrs     |
| Mobile Cart Page              |    H     |     4 hrs      |     hrs     |
| Tablet Cart Page              |    H     |     3 hrs      |     hrs     |
| Desktop Cart Page             |    H     |     2 hrs      |     hrs     |
| Total Hrs                     |          |     --hrs      |   -- hrs    |

#### PostMVP - Mainly styling and layouting the app

| Component                          | Priority | Estimated Time | Actual Time |
| ---------------------------------- | :------: | :------------: | :---------: |
| Animate icons                      |    L     |     3 hrs      |     hrs     |
| Accordian for product descriptions |    M     |     3 hrs      |     hrs     |
| Slider for product images          |    H     |     5 hrs      |     hrs     |
| Total Hrs                          |          |     11 hrs     |             |

## Components/pages

### App Component

- Access the products state from the Store
- Set up routes for the links

```
//Fix problem where item crash when refresh. If the current is null, the page will redirect to main path.
const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};

export default connect(mapStateToProps)(App);
```

### NavBar Component

- Mobile and desktop navigation
- Maps the state of the cart to get the number of items in cart.

```js
<Link to="/cart">Cart: {cartCount}</Link>
```

```js
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};
```

### Cart Page

- Displays the current items in cart.
- Items are rendered in CartItem component.
- Displays total price and total items.
- Has button to clear cart.

### CartItem Component

- Displays the individual item data in the Cart page.
- Has a button that will remove item from cart
- Can adjust item quantity in cart
- Does not map any state. Maps dispatch (for qty and remove functions)
- Receives item data prop passed in from Cart

### ProductList Page

- Renders a list of products
- Maps the products state into a bunch of OneProduct components.

### OneProduct Component

- Has a thumbnail of the product image
- Button to add to cart
- Some description, title and price.
- Receives props from ProductList
- Basically its the individual cards for each product. The cards will be displayed in the ProductList page

### SingleItem Component/Page

- Displays full data for 1 product on the page.
- Similar information as the Oneproduct Component. Just bigger images
- More text displayed.

## Actions/Reducers

### Actions

- Contrary to the name, **Actions** are more like flags. They signal our reducers to do something.
- Here are the list of **signals** sent to the reducers via the actions index file

```js
const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";
const CLEAR_CART = "CLEAR_CART";

export const addToCart = (itemID) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};
```

### Reducers

- In this project the reducer file has the product state and the data for that state.
- Reducers contain the functionalities that will be performed onto the state.
- The functionalities are wrapped in a switch statement.
- Reducers will receive the case for the switch - which was sent from the actions or the "flags" as i like to call it.

```js
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Get Item data from products array above. Use the find method in JS to find the first matching.
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already. Returns true/false
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
    /*
       ...
       more code in project
       ...
    */
    default:
      return state;
  }
};
```
