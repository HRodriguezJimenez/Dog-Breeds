import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { renderDogInfo } from "../../utils/functions";

const Card = (props) => {
  const dogInfo = renderDogInfo(props);

  return (
    <div className={styles.divCard}>
      <Link to={`/home/${props.id}`}>
        <img className={styles.imgCard} src={props.image} alt="Not Found" />
        <h2>Name: {dogInfo.name}</h2>
        <p>
          Weight: min {dogInfo.minWeight} - max {dogInfo.maxWeight}
        </p>
        <p>Temperaments: {dogInfo.temperaments}</p>
      </Link>
    </div>
  );
};

export default Card;
