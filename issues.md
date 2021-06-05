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

```
