import { useLocation } from "react-router-dom";
import ShopComponent from "../../components/shop-component/shopComponent.component";

const ChosenShoppingPage = () => {
  const location = useLocation();
  const data = location.state.data;
  return <ShopComponent data={data} />;
};

export default ChosenShoppingPage;
