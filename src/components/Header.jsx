import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login">Sign in/ Guest</Link>
          <Link to="/register">Create an Account</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// <Link to="/">Home</Link>
//     <Link to="/about">About</Link>
//     <Link to="/products">Products</Link>
//     <Link to="/cart">Cart</Link>
//     <Link to="/checkout">Checkout</Link>
//     <Link to="/orders">Orders</Link>
