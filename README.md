## Challenge (34) - AddItem Reducer

- display cartItems in Navbar
- setup addItem functionality

## Building the `addItem` Reducer

1. **Purpose**:

- This reducer updates the cart state when a product is added.

2. **Extract Product from Action**:

- Extract the `product` object from `action.payload`.

3. **Check for Existing Item**:

- Search for the product in the `cartItems` array based on the `cartID`.
- If the item already exists in the cart:
  - Increment the `amount` of the item in the cart by the `amount` of the `product`.

4. **Add New Item**:

- If the product does not exist in the cart:
  - Push the `product` directly into the `cartItems` array.

5. **Update Cart Totals**:

- Increase the `numItemsInCart` by the `amount` of the product.
- Increase the `cartTotal` by the product's `price` multiplied by its `amount`.

6. **Calculate Tax and Order Total**:

- Set `tax` as 10% of the `cartTotal`.
- Calculate the `orderTotal` as the sum of `cartTotal`, `shipping`, and `tax`.

7. **Save to Local Storage**:

- Convert the current state to a JSON string and store it in the browser's local storage under the key 'cart'.

8. **Notify User**:

- Use the `toast.success` method to display a success message: 'Item added to cart'.

## Solution (34) - AddItem Reducer

Navbar.jsx

```js
import { useSelector } from "react-redux";
const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
```

cartSlice.js

```js
{
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
      toast.success('Item added to cart');
    },
}

```

## Challenge (35) - Refactor and Setup Local Storage

- refactor addItem and get default state from local storage

### calculateTotals Reducer:

1. **Purpose**:

- Re-calculates the tax and order total for the cart.

2. **Calculate Tax and Order Total**:

- Set `tax` as 10% of the `cartTotal`.
- Determine the `orderTotal` as the sum of `cartTotal`, `shipping`, and `tax`.

3. **Save to Local Storage**:

- Convert the current state to a JSON string and save it in the browser's local storage under the key 'cart'.

## Solution (35) - Refactor and Setup Local Storage

```js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("item added to cart");
    },
    clearCart: (state) => {},

    removeItem: (state, action) => {},
    editItem: (state, action) => {},

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
```

## Challenge (36) - Clear Cart, Remove Item and Edit Item

- try to setup reducers for clear cart, remove item and edit item

## Building the Reducers

### clearCart Reducer:

1. **Purpose**:

- Clears the current cart state and resets it to the default state.

2. **Update Local Storage**:

- Store the `defaultState` in the browser's local storage under the key 'cart'.

3. **Return Default State**:

- Reset the entire cart state by returning `defaultState`.

### removeItem Reducer:

1. **Purpose**:

- Removes a specific item from the cart.

2. **Extract cartID from Action**:

- Extract the `cartID` from `action.payload`.

3. **Find Product**:

- Find the product in the `cartItems` array based on the `cartID`.

4. **Update Cart Items**:

- Filter out the product from `cartItems` array based on the `cartID`.

5. **Update Cart Totals**:

- Decrease the `numItemsInCart` by the `amount` of the product.
- Decrease the `cartTotal` by the product's `price` multiplied by its `amount`.
- Call the `calculateTotals` reducer to re-evaluate tax and order total.

6. **Notify User**:

- Use the `toast.error` method to display a message: 'Item removed from cart'.

### editItem Reducer:

1. **Purpose**:

- Modifies the amount of a specific item in the cart.

2. **Extract Data from Action**:

- Extract `cartID` and `amount` from `action.payload`.

3. **Find Item**:

- Find the item in the `cartItems` array based on the `cartID`.

4. **Update Cart Totals**:

- Adjust the `numItemsInCart` by the difference between the new amount and the item's previous amount.
- Update the `cartTotal` based on the item's `price` and the amount difference.
- Update the item's `amount` to the new amount.
- Call the `calculateTotals` reducer to re-evaluate tax and order total.

5. **Notify User**:

- Use the `toast.success` method to display a message: 'Cart updated'.

## Solution (36) - Clear Cart, Remove Item and Edit Item

```js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
```

```js
state.numItemsInCart += amount - item.amount;
```

The logic here is to update the total number of items in the cart (state.numItemsInCart) by adjusting it based on the difference between the provided amount and the existing quantity of that item (item.amount). If amount is greater than item.amount, it means that items are being added to the cart. If amount is less than item.amount, it means that items are being removed from the cart. If they are equal, it implies no change to the quantity of that item in the cart.

The result of the subtraction (amount - item.amount) is then added to the current state.numItemsInCart to reflect the new total number of items in the cart.

```js
state.cartTotal += item.price * (amount - item.amount);
```

In this line, the logic is calculating the change in the total cost of the cart (state.cartTotal) based on the price of the item (item.price) and the change in the quantity of that item (amount - item.amount). This calculation is then added to the current state.cartTotal.

If amount is greater than item.amount, it means more items are being added, so the cost of those additional items (difference between amount and item.amount) is calculated by multiplying it with the price of the item. If amount is less than item.amount, it means items are being removed, so the cost of those removed items is subtracted from the state.cartTotal. If they are equal, there is no change in the cost related to that item.

## Challenge (37) - Setup Cart Page

- create CartItemsList, CartTotals, CartItem components
- export CartItemsList, CartTotals in components/index.js
- setup two column layout in cart page

### CartPage.jsx

1. **Initialize Necessary Imports**:

   - Import `useSelector` from `react-redux` to enable access to the Redux store.
   - Bring in `CartItemsList`, `SectionTitle`, and `CartTotals` components from the `components` directory.
   - Import `Link` from `react-router-dom` for navigation capabilities.

2. **Create Cart Component**:

   - Define a functional component named `Cart`.

3. **Initialize State and Variables**:

   - Set a temporary variable `user` to `null`.
   - Use the `useSelector` hook to retrieve `numItemsInCart` from the Redux store's `cartState`.

4. **Component Logic**:

   - Check if `numItemsInCart` is zero.
     - If true, return the `SectionTitle` component with the text 'Your cart is empty'.
     - If there are items in the cart, continue to display the cart details.

5. **Component Structure**:

   - Render the `SectionTitle` component with the text 'Shopping Cart'.
   - Set up a grid layout (`mt-8 grid gap-8 lg:grid-cols-12`) to manage cart layout.
   - For displaying cart items:
     - Use 8 of 12 columns on large screens (`lg:col-span-8`).
     - Insert the `CartItemsList` component.
   - For displaying cart totals and the checkout/login button:
     - Use 4 of 12 columns on large screens (`lg:col-span-4 lg:pl-4`).
     - Place the `CartTotals` component.
     - Check if `user` is defined:
       - If true, provide a link to '/checkout' with the text 'Proceed to checkout'.
       - If false, provide a link to '/login' with the text 'please login'.

6. **Export Cart Component**:

   - Export the `Cart` component as the default export of the module.

## Solution (37) - Setup Cart Page

pages/Cart.jsx

```js
import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  // temp
  const user = null;
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8  lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
```

## Challenge (38) - Cart Totals

- setup cart totals component

### CartTotals.jsx

1. **Initialize Necessary Imports**:

   - Import `useSelector` from `react-redux` for state retrieval from the Redux store.
   - Bring in `formatPrice` function from the `utils` directory for price formatting.

2. **Create CartTotals Component**:

   - Define a functional component named `CartTotals`.

3. **Retrieve State from Redux**:

   - Use the `useSelector` hook to get `cartTotal`, `shipping`, `tax`, and `orderTotal` from the Redux store's `cartState`.

4. **Component Structure**:

   - Enclose all content inside a `div` with the class `card bg-base-200`.
   - Use an inner `div` with the class `card-body` for structured content.
   - Display the Subtotal:
     - Use a `p` element with classes `flex`, `justify-between`, `text-xs`, `border-b`, and `border-base-300 pb-2`.
     - Use two nested `span` elements. The first displays "Subtotal", and the second displays the formatted `cartTotal`.
   - Display Shipping charges:
     - Similar to the Subtotal, but the text reads "Shipping" and the value is the formatted `shipping`.
   - Display Tax:
     - Similar format, but the text reads "Tax" and the value is the formatted `tax`.
   - Display Order Total:
     - Use a `p` element with classes `mt-4`, `flex`, `justify-between`, and `text-sm  pb-2`.
     - Use nested `span` elements with `font-bold` class. The first displays "Order Total", and the second displays the formatted `orderTotal`.

5. **Export CartTotals Component**:

   - Export the `CartTotals` component as the default export of the module.

## Solution (38) - Cart Totals

```js
import { useSelector } from "react-redux";
import { formatPrice } from "../utils";
const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        {/* Tax */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        {/* Total */}
        <p className="mt-4 flex justify-between text-sm  pb-2">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};
export default CartTotals;
```

## Challenge (39) - Cart Items List

- iterate over cartItems and return CartItem
- in CartItem display values and implement remove,edit functionality

### CartItemsList.jsx

1. **Initialize Necessary Imports**:

   - Import `useSelector` from `react-redux` to retrieve state from the Redux store.
   - Bring in `CartItem` component for item rendering.

2. **Create CartItemsList Component**:

   - Define a functional component named `CartItemsList`.

3. **Retrieve State from Redux**:

   - Use the `useSelector` hook to get `cartItems` from the Redux store's `cartState`.

4. **Component Structure**:

   - Create a wrapping `div`.
   - Use the `map` method on `cartItems` to loop through each item.
   - For each `item`, return a `CartItem` component:
     - Pass `item.cartID` as the `key` prop for React's list rendering optimization.
     - Pass the entire `item` object as the `cartItem` prop to the `CartItem` component.

5. **Export CartItemsList Component**:

   - Export the `CartItemsList` component as the default export of the module.

### CartItem.js

1. **Initialize Necessary Imports**:

   - Import utility functions `formatPrice` and `generateAmountOptions` from the `../utils` directory.
   - Import `removeItem` and `editItem` from the Redux slice named `cartSlice`.
   - Bring in `useDispatch` from `react-redux` for dispatching actions to the Redux store.

2. **Create CartItem Component**:

   - Define a functional component named `CartItem` that accepts a `cartItem` prop.

3. **Setup Redux Dispatch**:

   - Use the `useDispatch` hook and store the result in the `dispatch` constant.

4. **Functions for Event Handlers**:

   - Define `removeItemFromTheCart` function:
     - Dispatch the `removeItem` action, passing the `cartID` from the cart item.
   - Define `handleAmount` function:
     - Dispatch the `editItem` action, updating the `amount` for the cart item identified by `cartID`.

5. **Destructure cartItem Prop**:

   - Extract necessary fields from `cartItem` including `cartID`, `title`, `price`, `image`, `amount`, `company`, and `productColor`.

6. **Component Structure**:

   - Create an `article` element wrapping the entire cart item.
     - Embed the product image using an `img` element.
     - Display product information using a `div`:
       - Show the product `title`, `company`, and `color` using corresponding elements.
     - Render the product amount using a `div` containing a dropdown `select`.
     - Provide a `button` to remove the item from the cart.
     - Display the product price using a `p` element.

7. **Export CartItem Component**:

   - Export the `CartItem` component as the default export of the module.

## Solution (39) - Cart Items List

CartItemsList.jsx

```js
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} cartItem={item} />;
      })}
    </div>
  );
};
export default CartItemsList;
```

CartItem.jsx

```js
import { formatPrice, generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };
  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };

  const { cartID, title, price, image, amount, company, productColor } =
    cartItem;

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};
export default CartItem;
```

CartItem.jsx

```js
<div className="sm:ml-12">
  {/* AMOUNT */}
  {/* REMOVE */}
</div>
```

## Challenge (40) - Setup User Slice

- setup user slice
- add to store

### userSlice.js

- create features/user/userSlice.js
- Import Dependencies:

  - Import `createSlice` from `'@reduxjs/toolkit'`.
  - Import `toast` from `'react-toastify'`.

- Define Initial State:

  - Create an `initialState` object with default values for `user` and `theme`.

- Create Redux Slice:

  - Use `createSlice` to define a Redux slice named `'user'`.
  - Set the slice name to `'user'`.
  - Use the `initialState` object as the initial state.

- Define Reducer Functions:

  - Create the `loginUser` reducer function with the signature `(state, action) => {}`.

    - Inside the function, log a message like `'login'`.

  - Create the `logoutUser` reducer function with the signature `(state) => {}`.

    - Inside the function, log a message like `'logout'`.

  - Create the `toggleTheme` reducer function with the signature `(state) => {}`.
    - Inside the function, log a message like `'toggle theme'`.

- Export Actions:
  - Export the action creators:
    - `loginUser`
    - `logoutUser`
    - `toggleTheme`

## Solution (40) - Setup User Slice

```js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: { username: "coding addict" },
  theme: "dracula",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("login");
    },
    logoutUser: (state) => {
      console.log("logout");
    },
    toggleTheme: (state) => {
      console.log("toggle theme");
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
```

store.js

```js
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
});
```

## Challenge (41) - Move Theme Logic

- move theme logic from Navbar to userSlice

## Solution (41) - Move Theme Logic

userSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: { username: "coding addict" },
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("login");
    },
    logoutUser: (state) => {
      console.log("logout");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
```

Navbar.js

```js
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center "
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}
          <label className="swap swap-rotate ">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleTheme} />

            {/* sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />

            {/* moon icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK*/}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```

## Challenge (42) - Setup Logout and Access User

- setup logout reducer
- access user in Header, NavLinks and Cart Page

## Solution (42) - Setup Logout And Access User

userSlice.js

```js
logoutUser: (state) => {
      state.user = null;
      // localStorage.clear()
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
```

Header.js

```js
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
  };
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary "
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
```

NavLinks.jsx

```js
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "checkout" || url === "orders") && !user) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
```

```js
const Cart = () => {
  // temp
  const { user } = useSelector((state) => state.userState);
};
```

## Challenge (43) - Register User

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)
- docs - register request
- test in Thunder Client
- setup action in Register
- add action to Register route in App.jsx

### Register.js

- Import Dependencies:

  - Import `redirect` from `'react-router-dom'`.
  - Import `customFetch` from `'../utils'`.
  - Import `toast` from `'react-toastify'`.

- Define an asynchronous function named `action` that takes an object with a property named `request` as its parameter.

- Inside the `action` function:

  - Use the `request` object to get form data using the `formData` method.
  - Convert the form data to an object using `Object.fromEntries(formData)` and store it in the `data` variable.

- Use a `try` block to handle the registration process:

  - Send a POST request using `customFetch.post` to the `/auth/local/register` endpoint with the `data`.
  - If the request is successful:
    - Display a success toast message using `toast.success`.
    - Redirect the user to the `/login` page using `redirect('/login')`.

- Use a `catch` block to handle errors:
  - If an error occurs, extract the error message from the response data, if available, or provide a default error message.
  - Display the error message using `toast.error`.
  - Return `null` to indicate that an error occurred.

## Solution (43) - Register User

Register.jsx

```js
import { FormInput, SubmitBtn } from "../components";
import { Form, redirect, Link } from "react-router-dom";

import { customFetch } from "../utils";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";

    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
```

## Challenge (44) - Login Setup

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)
- docs - login request
- test in Thunder Client
- setup action in login and access store

## Solution (44) - Login Setup

App.jsx

```js
import { action as loginAction } from './pages/Login';

import { store } from './store';
{
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
```

Login.jsx

```js
export const action =
  (store) =>
  async ({ request }) => {
    console.log(store);
    return store;
  };
```

### Challenge (45) - Login User

### Login.jsx

- Import Dependencies:

  - Import `redirect` from `'react-router-dom'`.
  - Import `customFetch` from `'../utils'`.
  - Import `toast` from `'react-toastify'`.
  - Import `loginUser` from `'../features/user/userSlice'`.
  - Import `useDispatch` from `'react-redux'`.

- Define a function named `action` that takes a parameter `store` and returns an asynchronous function that takes an object with a property named `request`.

- Inside the inner asynchronous function:

  - Use the `request` object to get form data using the `formData` method.
  - Convert the form data to an object using `Object.fromEntries(formData)` and store it in the `data` variable.

- Use a `try` block to handle the login process:

  - Send a POST request using `customFetch.post` to the `/auth/local` endpoint with the `data`.
  - If the request is successful:
    - Dispatch the `loginUser` action with the response data using `store.dispatch`.
    - Display a success toast message using `toast.success`.
    - Redirect the user to the home page using `redirect('/')`.

- Use a `catch` block to handle errors:
  - If an error occurs, log the error to the console.
  - Extract the error message from the response data, if available, or provide a default error message.
  - Display the error message using `toast.error`.
  - Return `null` to indicate that an error occurred.

### Solution (45) - Login User

userSlice.js

```js
loginUser: (state, action) => {
      console.log(action.payload);
    },
```

Login.jsx

```js
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);

      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };
```

userSlice.js

```js
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
```

## Challenge (46) - Demo User

- remove defaultValue from inputs

### loginAsGuestUser

- Create a function named `loginAsGuestUser`.
- Mark the function as `async` to indicate that it contains asynchronous operations.
- Wrap the entire function body in a `try` block to handle potential errors.
- Inside the `try` block, use the `customFetch.post` method to send a POST request.
- Provide the endpoint URL `/auth/local`.
- Pass an object with `identifier` and `password` properties as the request body.
- Assign the response from the `customFetch.post` call to the `response` variable.- If the request is successful, dispatch an action (e.g., `loginUser`) with the `response.data`.
- Use the `toast.success` method to display a success message (e.g., 'welcome guest user').
- If the action dispatch and toast success are successful, use the `navigate` function to navigate to a specific route (e.g., `'/'`).
- If any error occurs within the `try` block, it will be caught by the `catch` block.
- Inside the `catch` block, use `console.log` to log the error for debugging purposes.
- Display an error message using the `toast.error` method to notify the user about the login error.

## Solution (46) - Demo User

Login.jsx

```js
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error.please try later.");
    }
  };
};

<button
  type="button"
  className="btn btn-secondary btn-block"
  onClick={loginAsGuestUser}
>
  guest user
</button>;
```

## Challenge (47) - Checkout Page Setup

- create CheckoutForm component

### Checkout.jsx

- Import Dependencies:

  - Import `useSelector` from `'react-redux'`.
  - Import `CheckoutForm`, `SectionTitle`, and `CartTotals` from `'../components'`.

- Create the `Checkout` component:

  - Inside the component, use `useSelector` to access the `cartTotal` from the Redux store.
  - Check if the `cartTotal` is empty.
  - If the `cartTotal` is empty, return a `SectionTitle` component with the text 'Your cart is empty'.
  - If the `cartTotal` is not empty:
    - Return a `SectionTitle` component with the text 'Place your order'.
    - Render a `<div>` element with the class name 'mt-8 grid gap-8 md:grid-cols-2 items-start'.
    - Inside the `<div>`, render the `CheckoutForm` component and the `CartTotals` component.

- Export the `Checkout` component as the default export.

## Solution (47) - Checkout Page Setup

Checkout.jsx

```js
import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
```

## Challenge (48) - Restrict Access

App.jsx

- in App.jsx import loader from Checkout page
- pass store into the checkoutLoader
- if no user redirect to login

### Checkout.jsx

- Import Dependencies:

  - Import `redirect` from `'react-router-dom'`.
  - Import `toast` from `'react-toastify'`.

- Create a `loader` function:

  - The `loader` function takes a `store` as a parameter.
  - Inside the `loader` function:
    - Get the `user` from the Redux store using `store.getState().userState.user`.
    - Check if the `user` is falsy (not logged in).
    - If the `user` is falsy:
      - Display a toast warning message using `toast.warn()` with the text 'You must be logged in to checkout'.
      - Return `redirect('/login')` to redirect the user to the login page.
    - If the `user` is truthy (logged in):
      - Return `null`.

- Export the `loader` function.

## Solution (48) - Restrict Access

App.jsx

```js
import { loader as checkoutLoader } from './pages/Checkout';

import { store } from './store';

const router = createBrowserRouter([
  {
   ....
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),

      },

  },

]);

```

Checkout.jsx

```js
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};
```

## Challenge (49) - CheckoutForm

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)
- docs - create order request
- test in Thunder Client

### App.jsx

- in App.jsx import action from CheckoutForm.jsx
- pass store into the checkoutAction

## CheckoutForm.jsx

- Import Dependencies:

  - Import `Form` and `redirect` from `'react-router-dom'`.
  - Import `FormInput` and `SubmitBtn` from appropriate paths.
  - Import other required utilities and actions.

- Create an `action` function:

  - The `action` function takes a `store` as a parameter and returns an asynchronous function that takes a `request` parameter.
  - Inside the async function:
    - Await `request.formData()` to get form data.
    - Destructure the `name` and `address` properties from the form data using `Object.fromEntries(formData)`.
    - Get the `user` from the Redux store using `store.getState().userState.user`.
    - Get the `cartItems`, `orderTotal`, and `numItemsInCart` from the Redux store using `store.getState().cartState`.
    - Create an `info` object containing the gathered information.
    - Try to make a POST request to '/orders' with the `info` data and the user's token in the headers.
    - If successful:
      - Dispatch the `clearCart()` action using `store.dispatch(clearCart())` to clear the cart.
      - Display a success toast message using `toast.success()` with the text 'order placed successfully'.
      - Return `redirect('/orders')` to redirect the user to the orders page.
    - If there's an error:
      - Log the error.
      - Get the error message from the response data or provide a default message.
      - Display an error toast message using `toast.error()` with the error message.
      - Return `null`.

- Create a `CheckoutForm` component:

  - Inside the component:
    - Use the `Form` component from 'react-router-dom' to create a form.
    - Display a heading for the shipping information.
    - Use the `FormInput` component to create input fields for the first name and address.
    - Use the `SubmitBtn` component to create a submit button with the text 'Place Your Order'.

- Export the `CheckoutForm` component.

## Solution (49) - CheckoutForm

App.jsx

```js
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
      },
    ],
  },
]);
```

CheckoutForm.jsx

```js
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";

      toast.error(errorMessage);
      return null;
    }
  };
const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
```

## Challenge (50) - Auth Error

- handle auth errors
- check for response.status
  - if status === 401 redirect to login

## Solution (50) - Auth Error

CheckoutForm.jsx

```js

 catch (error) {
  console.log(error);
  const errorMessage =
    error?.response?.data?.error?.message ||
    'there was an error placing your order';
  toast.error(errorMessage);
  if (error?.response?.status === 401 || 403) return redirect('/login');

  return null;
}
```

## Challenge (51) - Orders Request Overview

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)
- docs - orders request
- test in Thunder Client

## Solution (51) - Orders Request Overview

## Challenge (52) - Orders Page Setup

- create components/OrdersList.jsx (export)
- create loader (import/setup in App.jsx and provide store)
- restrict access to page
- make a request to get all users
- grab all the query params
- return orders and meta

### Orders.jsx

1. **Import Dependencies:**

   - Import the required modules and components from 'react-router-dom', 'react-toastify', and other custom files.

2. **Define Loader Function:**

   - Create a loader function that takes the `store` parameter and an object with a `request` property.
   - Within the loader function:
     - Retrieve the user information from the Redux store.
     - Check if the user is logged in. If not, display a warning toast and redirect to the login page.
     - Parse query parameters from the URL.
     - Use the `customFetch` utility to make a GET request to the '/orders' endpoint.
     - Handle successful responses by returning the fetched orders data and meta information.
     - Handle errors by displaying appropriate error messages using toast and optionally redirecting if unauthorized.
     - Return `null` if an error occurs.

3. **Define Orders Component:**

   - Create a functional component named `Orders`.
   - Within the component:
     - Return JSX that displays a heading element with the text "orders".

4. **Export Loader Function:**

   - Export the defined loader function.

5. **Export Orders Component:**
   - Export the `Orders` component as the default export of the module.

## Solution (52) - Orders Page Setup

App.jsx

```js
import { loader as ordersLoader } from './pages/Orders';

{
  path: 'orders',
  element: <Orders />,
  loader: ordersLoader(store),
},
```

Orders.jsx

```js
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { OrdersList, PaginationContainer, SectionTitle } from "../components";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");

      return null;
    }
  };
const Orders = () => {
  return <h1 className="text-3xl">orders</h1>;
};
export default Orders;
```

## Challenge (53) - Render Orders

### Orders.jsx

- Import Dependencies:

  - Import necessary components and hooks from your project's dependencies.

- Define Component:

  - Define a functional component named `Orders`.

- Fetch Data:

  - Use the `useLoaderData` hook to access data from the loader context.
  - Check if the `meta.pagination.total` value is less than 1 to determine if there are no orders.

- Conditional Rendering:

  - If there are no orders, return a component, such as `<SectionTitle />`, with a message like 'Please make an order'.

- Orders Rendering:

  - If there are orders, return the following components:
    - `<SectionTitle />` with the text 'Your Orders'.
    - `<OrdersList />` component to display the list of orders.
    - `<PaginationContainer />` component for handling pagination.

- Export Component:
  - Export the `Orders` component as the default export.

### OrdersList.jsx

- Import Dependencies:

  - Import `useLoaderData` from `'react-router-dom'`.
  - Import `day` and `advancedFormat` from `'dayjs'`.
  - Extend dayjs with the `advancedFormat` plugin using `day.extend(advancedFormat)`.

- Create the `OrdersList` component:

  - Inside the component:
    - Use the `useLoaderData()` hook to get data from loader data.
    - Destructure `orders` and `meta` from the loaded data.
    - Return the orders list interface:
      - Display the total number of orders using the `meta.pagination.total` value.
      - Create a table to display order information.
      - Define table headings: Name, Address, Products, Cost, and Date.
      - Use `.map()` to iterate over each order and generate table rows:
        - Destructure relevant attributes from the `order` object.
        - Format the `createdAt` date using dayjs to display in 'hh:mm a - MMM Do, YYYY' format.
        - Return a table row with the extracted data.

- Export the `OrdersList` component.

## Solution (53) - Render Orders

Orders.jsx

```js
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <PaginationContainer />
    </>
  );
};
export default Orders;
```

OrdersList.jsx

```js
import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();
  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">
        total orders : {meta.pagination.total}
      </h4>
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;

              const date = day(createdAt).format("hh:mm a - MMM Do, YYYY ");
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
```

## Challenge (54) - Complex Pagination

- create ComplexPaginationContainer.jsx
- render in Orders.jsx

### ComplexPaginationContainer.jsx

- Import Dependencies:

  - Import `useLoaderData`, `useLocation`, and `useNavigate` from `'react-router-dom'`.

- Create the `ComplexPaginationContainer` component:

  - Inside the component:
    - Use the `useLoaderData()` hook to get data from loader data.
    - Destructure `meta.pagination` to get `pageCount` and `page`.
    - Use the `useLocation()` hook to get the current location's search and pathname.
    - Use the `useNavigate()` hook to get the navigation function.
    - Create a `handlePageChange` function that:
      - Constructs a new URLSearchParams from the current search.
      - Sets the 'page' parameter in the search to the specified `pageNumber`.
      - Uses the navigate function to change the URL with the updated search.
    - Create an `addPageButton` function that returns a button element with the appropriate classes and onClick handler.
    - Create a `renderPageButtons` function that generates an array of page buttons, including ellipses and the current page button.
    - Use conditional checks to handle rendering of first, last, and ellipsis buttons.
    - Return `null` if `pageCount` is less than 2.
    - Return the pagination interface containing the "Prev," page buttons, and "Next" buttons.

- Export the `ComplexPaginationContainer` component.

## Solution (54) - Complex Pagination

ComplexPaginationContainer.jsx

```js
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300 " : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // dots
    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }
    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPaginationContainer;
```

## Challenge (55) - Setup React Query

- import and setup react query in App.jsx
- pass query client down to
  - Landing Page
  - SingleProduct Page
  - Products Page
- refactor loaders

## Solution (55) - Setup React Query

App.jsx

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
```

Landing.js

```js
export const loader = (queryClient) => async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  return { products };
};
```

## Challenge (56) - Landing

- setup react query and invoke in loader

## Solution (56) - Landing

Landing.jsx

```js
const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
};
```

## Challenge (57) - Single Product

- setup react query and invoke in loader

## Solution (57) - Single Product

SingleProduct.jsx

```js
const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch.get(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    return { product: response.data.data };
  };
```

## Challenge (58) - All Products

- setup react query and invoke in loader

## Solution (58) - All Products

Products.jsx

```js
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };
```

?? === This operator is known as the nullish coalescing operator in JavaScript. It is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

In simpler terms, the ?? operator is used to provide a default value for potentially null or undefined variables.

## Challenge (59) - Orders

setup react query and invoke in loader

## Solution (59) - Orders

```js
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

export const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return {
        orders: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
```

## Challenge (60) - Remove Queries

- remove "orders" query in CheckoutForm and Header

## Solution (60) - Remove Queries

CheckoutForm.jsx

```js
import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    ...
    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // remove query
      queryClient.removeQueries(['orders']);
      // rest of the code
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } ...
  };
```

Header.jsx

```js

import { useQueryClient } from '@tanstack/react-query';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    navigate('/');
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
  };
  ...
}

```
