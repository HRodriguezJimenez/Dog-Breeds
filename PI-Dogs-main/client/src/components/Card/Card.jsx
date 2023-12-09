import style from "./card.module.css";
import { renderDogInfo } from "../../utils/functions";

const Card = (props) => {
  const dogInfo = renderDogInfo(props);
  console.log(dogInfo);

  return (
    <div className={style.cardContainer}>
      <img className={style.imgCard} src={props.image} alt="Not Found" />
      <p>Name: {dogInfo.name}</p>
      <p>
        Height: min {dogInfo.minHeight} - max {dogInfo.maxHeight}
      </p>
      <p>
        Weight: min {dogInfo.minWeight} - max {dogInfo.maxWeight}
      </p>
      <p>
        Life: min {dogInfo.minLifeSpan} - max {dogInfo.maxLifeSpan}
      </p>
      <p>Temperaments: {dogInfo.temperaments}</p>
    </div>
  );
};

export default Card;
