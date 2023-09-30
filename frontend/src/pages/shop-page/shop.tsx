import { ShoppingContext } from "../../context";
import { useContext } from "react";
import ShopComponent from "../../components/shop-component/shopComponent.component";

const Shop = () => {
  const context = useContext(ShoppingContext);
  return (
    <div>
      {context.data.map((choice) => (
        <ShopComponent key={choice.id} data={choice} />
      ))}
    </div>
  );
};

export default Shop;
