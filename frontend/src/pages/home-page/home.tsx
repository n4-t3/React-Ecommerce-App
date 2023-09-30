import "./home-page.component.scss";
import HomeCard from "../../components/home-cards/home-card.component";
import { ShoppingContext } from "../../context";
import { useContext } from "react";

const HomePage = () => {
  const { data } = useContext(ShoppingContext);

  return (
    <div className="card-container">
      {data.map((element) => {
        return <HomeCard data={element} key={element.id} />;
      })}
    </div>
  );
};

export default HomePage;
