# MOTRIX (frontend only, mock data)

npm install && npm run dev

Admin: http://localhost:5173/#/admin  |  motrix@gmail.com / motrix@2255

Product images: public/products/1..6.png (replace with your own). Data: src/data.js. Saved in localStorage.

## Where things are

```
src/
  main.jsx          starts the app
  App.jsx           picks which page to show for the current URL
  router.jsx        tiny router: navigate(), useRoute(), <Link>
  store.jsx         cart / products / orders / admin login (saved in localStorage)
  data.js           starting products and sample orders
  utils.js          formatPrice()
  styles.css        all the styling (see the layer notes at the top)

  components/       things used on several pages
    Nav.jsx  Footer.jsx  ProductCard.jsx  SwipeButton.jsx  Icons.jsx

  pages/            one file per store page
    Home  Shop  Product  Cart  Checkout  Track  Contact

  admin/            the admin panel (sign in, dashboard, products, orders)
    Admin.jsx       holds the state and decides what to show
    LoginForm  DashboardTab  ProductsTab  OrdersTab  ProductModal  StatusSelect
```

Formatting: `.prettierrc` is included. Run `npx prettier --write src` to keep the style consistent.
