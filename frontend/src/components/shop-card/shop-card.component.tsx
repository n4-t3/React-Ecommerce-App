import { useContext } from "react";
import shoppingCardCSS from "./shop-card.module.scss";
import { ShoppingContext } from "../../context";

import {
  addCartElementToCloud,
  getUserProfile,
} from "../../firebase/firebase.utils";

interface Props {
  data: {
    id: number;
    name: string;
    imgSrc: string;
    price: number;
  };
}

interface User {
  email: string;
  displayName: string;
  uid: string;
}

const ShoppingCard = (props: Props) => {
  const ctx = useContext(ShoppingContext);
  const user = ctx?.user;
  const handleAddingToCart = async (
    e: React.MouseEvent<HTMLElement>,
    props: Props
  ) => {
    if (user) {
      addCartElementToCloud(user.uid, [props.data]);
      await getUserProfile(user.uid).then((resp) =>
        ctx.setUser(resp as User | null)
      );
    } else {
      if (localStorage.getItem("cart")) {
        const cart = JSON.parse(localStorage.getItem("cart")!);
        localStorage.setItem("cart", JSON.stringify([...cart, props.data]));
      } else {
        localStorage.setItem("cart", JSON.stringify([props.data]));
      }
    }
  };
  return (
    <div className={shoppingCardCSS.center}>
      <div className={shoppingCardCSS.wrapper}>
        <img
          className={shoppingCardCSS.img}
          src={props.data.imgSrc}
          alt={props.data.name}
          loading="lazy"
        />
        <div
          onClick={(e) => handleAddingToCart(e, props)}
          className={shoppingCardCSS.overCard}
        >
          <p>ADD TO CART</p>
        </div>
        <div className={shoppingCardCSS.text}>
          <p>{props.data.name}</p>
          <p>${props.data.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
