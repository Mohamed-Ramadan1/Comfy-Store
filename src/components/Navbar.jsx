import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <p>Comfy</p>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
};

export default Navbar;
