import { Link } from "react-router-dom";
import style from "./card.module.css";
import { renderDogInfo } from "../../utils/functions";

const Card = (props) => {
  const dogInfo = renderDogInfo(props);

  return (
    <div className={style.cardContainer}>
      <Link to={`/home/${props.id}`}>
        <img className={style.imgCard} src={props.image} alt="Not Found" />
        <p>Name: {dogInfo.name}</p>
        <p>
          Weight: min {dogInfo.minWeight} - max {dogInfo.maxWeight}
        </p>
        <p>Temperaments: {dogInfo.temperaments}</p>
      </Link>
    </div>
  );
};

export default Card;
