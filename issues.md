## Materialize CSS Notes

-https://stackoverflow.com/questions/51355020/materialize-css-sidenav-options-not-defined
-Add this code to a script tag in `index.html` or in your `app.js`
-Because there is no options variable in your js code. Instead, use {} for default options, like below:

```
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});
```

```
/*--- MATERIALIZE CSS -- for responsive nav. Adjusting screen size
@media only screen and (max-width: 992px) {
  .hide-on-med-and-down {
    display: block !important;
  }
}

@media only screen and (max-width: 715px) {
  .hide-on-med-and-down {
    display: none !important;
  }
}
*/
```

-Mobile don't need hover

```
a:hover {
  color: #a04661;
}

button:hover {
  background-color: rgb(87, 207, 157);
  cursor: pointer;
}

```

- ProductList old code

```
const mapStateToProps = (state) => {
  return {
    //In the reducers/index.js file we named the key 'shop'
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(ProductList);

```

- Styles for carousel...not working.

```

  /* .carousel-root {
    height: 400px;
  }

  .carousel.carousel-slider {
    height: 80%;
  }

  .carousel .thumbs {
    width: 100%;
    height: 60px;
  } */

  /* .carousel-root {
    display: flex;
    flex-direction: row-reverse;

    width: 50%;
    height: 400px;
    align-items: center;
    justify-content: flex-end;
  }

  .carousel .thumbs {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .carousel .thumbs-wrapper {
    margin: 0;
    overflow: hidden;
    height: 100%;
  }

  .carousel {
    width: 20%;
    height: 100%;
    margin-right: 2%;
  }

  .slide > div {
    height: 400px;
  } */
```

-SingleItem component stlyes for togglng accordian for desktop

```
  .item-details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .details-accord {
    grid-row: 1 / 2;
  }

  .details-accord:first-child {
    grid-column: 1 / 2;
  }

  .details-accord:nth-child(2) {
    grid-column: 2 / 3;
  }

  .details-accord:nth-child(3) {
    grid-column: 3/ 4;
  }

  .accordian-open {
    grid-column: 1 / 4;
  }
```
