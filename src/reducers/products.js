const ADD_TO_CART = "ADD_TO_CART";
const ADJUST_ITEM_QTY = "ADJUST_ITEM_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";
const CLEAR_CART = "CLEAR_CART";
const ADD_TO_FAVE = "ADD_TO_FAVE";
const REMOVE_FROM_FAVE = "REMOVE_FROM_FAVE";

//There are three states here.. products, cart and currentItem
const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Super Cool Rubix",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Aliquam sem fringilla ut morbi tincidunt. Quis risus sed vulputate odio ut enim blandit volutpat. Sed turpis tincidunt id aliquet risus. Massa eget egestas purus viverra. Viverra aliquet eget sit amet tellus cras adipiscing. cube will keep you busy the entire day and it is very fun to play with",
      price: 15,
      rating: 3,
      attributes: {
        width: 5,
        depth: 5,
        height: 5,
        material: "Plastic",
      },
      image: [
        "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "https://placekitten.com/500/300",
        "https://placekitten.com/500/287",
        "https://placekitten.com/600/350",
        "https://placekitten.com/500/400",
      ],

      faved: false,
    },
    {
      id: 2,
      title: "Large Coffee Cup",
      description:
        "Consectetur adipiscing elit ut aliquam. Dui accumsan sit amet nulla facilisi. Dui accumsan sit amet nulla facilisi morbi. Integer enim neque volutpat ac tincidunt vitae. Morbi blandit cursus risus at ultrices mi tempus. ",
      price: 14.95,
      rating: 5,
      attributes: {
        width: 4.5,
        depth: 4.5,
        height: 6,
        material: "Ceramic",
      },
      image: [
        "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",

        "https://placekitten.com/500/300",
        "https://placekitten.com/500/287",
        "https://placekitten.com/600/350",
        "https://placekitten.com/500/400",
      ],

      faved: false,
    },
    {
      id: 3,
      title: "Books That CHANGED My Life",
      description:
        "Nunc faucibus a pellentesque sit amet porttitor eget. Erat imperdiet sed euismod nisi porta. In arcu cursus euismod quis viverra. Sed id semper risus in hendrerit. Praesent elementum facilisis leo vel fringilla. Eget nulla facilisi etiam dignissim. Ipsum consequat nisl vel pretium.",
      price: 65.99,
      rating: 3.5,
      attributes: {
        width: 8.5,
        depth: 11,
        height: 6,
        material: "Paper and Ink",
      },
      image: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
        "https://placekitten.com/500/300",
        "https://placekitten.com/500/287",
        "https://placekitten.com/600/350",
        "https://placekitten.com/500/400",
      ],
      faved: false,
    },
    {
      id: 4,
      title: "Hangry Seibah Plushie",
      description:
        "Haunted Arturia Pendragon doll that eats all your rice and calls you a mastah... Taken from a meme. Real description - Mochimochi Mascot M Fate/stay night [Unlimited Blade Works] Saber",
      price: 47.99,
      rating: 5,
      attributes: {
        width: 11.78,
        depth: 6.55,
        height: 6.55,
        material: "Cotton",
      },
      image: [
        "https://static.myfigurecollection.net/pics/figure/large/447232.jpg",
        "https://placekitten.com/500/300",
        "https://placekitten.com/500/287",
        "https://placekitten.com/600/350",
        "https://placekitten.com/500/400",
      ],
      faved: false,
    },
    {
      id: 5,
      title: "Kawaii Musashi Plush from FGO",
      description:
        "Aniplex is releasing a very limited edition Fate/Grand Order Saber Musashi Miyamoto Cushion, as seen in Osakabehime's room.",
      price: 46.95,
      rating: 5,
      attributes: {
        width: 11.78,
        depth: 6.55,
        height: 6.55,
        material: "Cotton",
      },
      image: [
        "https://i.ebayimg.com/images/g/D~YAAOSwRn9d-IlA/s-l1600.jpg",
        "https://placekitten.com/500/300",
        "https://placekitten.com/500/287",
        "https://placekitten.com/600/350",
        "https://placekitten.com/500/400",
      ],
      faved: false,
    },
  ],
  cart: [],
  fave: [],
  currentItem: null,
};

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

      //If in cart, adjust quantity. USE PARSEINT BC WE HAVE PAYLOAD AS KEY/VALUE PAIRS
      //If not in cart, return the state spreaded with the new state which contains the item.
      //Remember cart: is a property that takes array of items. So we are mapping items to the cart.
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + parseInt(action.payload.qty) }
                : item
            )
          : [...state.cart, { ...item, qty: parseInt(action.payload.qty) }],
      };
    case REMOVE_FROM_CART:
      //Filter out array to show everything EXCLUDING item you selected.
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case ADD_TO_FAVE:
      // Get Item data from products array above. Use the find method in JS to find the first matching.
      const faveItem = state.products.find(
        (product) => product.id === action.payload.id
      );
      faveItem.faved = true;

      // Check if Item is in fave array already. Returns true/false
      const inFave = state.fave.find((item) =>
        item.id === action.payload.id ? true : false
      );

      //If in fave, return the state of the fave. If NOT in fave, map it over and adjust the quantity of the item in fave
      return {
        ...state,
        fave: inFave ? [...state.fave] : [faveItem, ...state.fave],
      };

    case REMOVE_FROM_FAVE:
      const rmfaveItem = state.products.find(
        (product) => product.id === action.payload.id
      );
      rmfaveItem.faved = false;
      //Filter out array to show everything EXCLUDING item you selected.
      return {
        ...state,
        fave: state.fave.filter((item) => item.id !== action.payload.id),
      };

    case LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default shopReducer;
