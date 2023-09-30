import cartCSS from "./cart.module.scss";
import { useState, useContext, useEffect } from "react";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { ShoppingContext } from "../../context";
import { removeCartElementFromCloud } from "../../firebase/firebase.utils";
import { getUserProfile } from "../../firebase/firebase.utils";

const CartPage = () => {
  const ctx = useContext(ShoppingContext);
  const user = ctx.user;
  const [cart, setCart] = useState<Closet[] | null>(null);
  const localCartData = JSON.parse(localStorage.getItem("cart")!);
  const data = user ? user.cartItem : localCartData;
  useEffect(() => {
    setCart(data);
  }, [data]);
  const handleDelete = async (element: Closet) => {
    if (user) {
      removeCartElementFromCloud(user.uid, [element]);
      await getUserProfile(user.uid).then((resp) =>
        ctx.setUser(resp as User | null)
      );
    } else {
      localStorage.removeItem("cart");
      const newCart = cart && cart.filter((item) => item !== element);
      setCart(newCart);
      newCart && newCart.length >= 1
        ? localStorage.setItem("cart", JSON.stringify([...newCart]))
        : localStorage.removeItem("cart");
    }
  };
  let total = 0;
  if (
    (cart && cart.length > 0) ||
    (user && user.boughtItem && user.boughtItem.length > 0)
  ) {
    return (
      <>
        {cart && cart.length > 0 ? (
          <div>
            <h1 className={cartCSS.header}>Cart Items</h1>
            <ul>
              {cart.map((element: Closet, index: number) => {
                total += element.price;
                return (
                  <li key={index} className={cartCSS.row}>
                    <div>{element.name}</div>
                    <div>{element.price}</div>
                    <div
                      className={cartCSS.delete}
                      onClick={() => handleDelete(element)}
                    >
                      Delete
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={cartCSS.total}>Total = ${total}</div>

            <StripeCheckoutButton cart={cart} price={total} setCart={setCart} />
            <div className={cartCSS.paymentInfo}>
              *Use the following credit card information for payment*
              <br />
              Card Number: 4242 4242 4242 4242
              <br />
              CVC: 123
              <br />
              Expiry: any date in future
            </div>
          </div>
        ) : null}

        {user && user.boughtItem && user.boughtItem.length > 0 ? (
          <div>
            <h1 className={cartCSS.header}>Bought Items</h1>
            <ul>
              {user.boughtItem.map((element: Closet, index: number) => {
                total += element.price;
                return (
                  <li key={index} className={cartCSS.row}>
                    <div>{element.name}</div>
                    <div>{element.price}</div>
                    <div>In Route</div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </>
    );
  } else {
    return <h1>No items in cart</h1>;
  }
};

export default CartPage;
