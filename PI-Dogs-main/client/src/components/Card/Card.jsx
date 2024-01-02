import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { renderDogInfo } from "../../utils/functions"; // Esta es una función que usamos para normalizar la información que envian por props y que muestre la información correcta sin importar si los dogs provienen de la api o de la base de datos, esto sobre todo para la propiedad "temperaments" que los 2 tienen una manera diferente de almacenar y acceder a la información.

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
