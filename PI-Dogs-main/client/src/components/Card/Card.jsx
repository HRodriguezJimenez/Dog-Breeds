import style from "./card.module.css";

const Card = (props) => {
  return (
    <div className={style.cardContainer}>
      <img src={props.image} alt="Not Found" />
      <p>Name:{props.name}</p>
      <p>
        Height: min{props.minHeight} - max{props.maxHeight}
      </p>
      <p>
        Weight: min{props.minWeight} - max{props.maxWeight}
      </p>
      <p>
        Life: min{props.minLifeSpan} - max{props.maxLifeSpan}
      </p>
      <p>Temperaments:{props.Temperaments}</p>
    </div>
  );
};

export default Card;
