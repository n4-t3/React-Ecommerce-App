import navbarCSS from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingContext } from "../context";
import {
  signInWithGoogle,
  signOutWithGoogle,
} from "../firebase/firebase.utils";

const Navbar = () => {
  const ctx = useContext(ShoppingContext);
  const user = ctx.user;
  return (
    <nav className={navbarCSS.nav}>
      <ul>
        <li>
          <Link to="/React-Ecommerce-App/">Home</Link>
        </li>
        <li>
          <Link to="/React-Ecommerce-App/shop/">Shop</Link>
        </li>
        <li>
          <Link to="/React-Ecommerce-App/cart/">Cart</Link>
        </li>
        {!user ? <li onClick={signInWithGoogle}>Sign In</li> : null}
        {user ? <li onClick={signOutWithGoogle}>SignOut</li> : null}
      </ul>
    </nav>
  );
};

export default Navbar;
