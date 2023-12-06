import style from "./card.module.css";

const Card = (props) => {
  let temperaments;

  // Verifica si el perro tiene la propiedad 'temperaments' (base de datos)
  if (props.temperaments) {
    temperaments = props.temperaments.map((temp) => temp.name).join(", ");
  } else if (props.Temperaments) {
    // Accede a 'Temperaments' (proviene de la API)
    temperaments = props.Temperaments.join(", ");
  }
  return (
    <div className={style.cardContainer}>
      <img className={style.imgCard} src={props.image} alt="Not Found" />
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
      <p>Temperaments: {temperaments}</p>
    </div>
  );
};

export default Card;
