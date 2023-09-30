import "./home-card.component.scss";
import { useNavigate } from "react-router-dom";

interface Closet {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
}

interface Props {
  data: {
    id: number;
    item: string;
    imgSrc: string;
    closet: Closet[];
  };
}

const HomeCard = (props: Props) => {
  const navigate = useNavigate();
  const handleShopping = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/React-Ecommerce-App/shop/${props.data.item}/`, {
      state: { data: props.data },
    });
  };
  return (
    <div className="card-wrapper" onClick={handleShopping}>
      <div
        className="card"
        style={{ backgroundImage: `url(${props.data.imgSrc})` }}
      >
        <div className="card-explanation">
          <h1 className="card-title">{props.data.item.toUpperCase()}</h1>
          <p className="advertisement">SHOP NOW</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
