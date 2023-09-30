import StripeCheckout, { Token } from "react-stripe-checkout";
import {
  addBoughtToCloud,
  removeCartElementFromCloud,
  getUserProfile,
} from "../../firebase/firebase.utils";
import { ShoppingContext } from "../../context";
import { useContext } from "react";

interface Props {
  cart: Closet[];
  price: number;
  setCart: React.Dispatch<React.SetStateAction<Closet[] | null>>;
}

const StripeCheckoutButton = ({ cart, price, setCart }: Props) => {
  const ctx = useContext(ShoppingContext);
  const user = ctx.user;
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_qblFNYngBkEdjEZ16jxxoWSM";
  const onToken = async (token: Token) => {
    if (user) {
      addBoughtToCloud(user.uid, cart);
      removeCartElementFromCloud(user.uid, cart);
      await getUserProfile(user.uid).then((resp) =>
        ctx.setUser(resp as User | null)
      );
    } else {
      localStorage.removeItem("cart");
      setCart(null);
    }
    alert("Payment Successful!");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Cloth Ltd."
      billingAddress
      shippingAddress
      zipCode
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
