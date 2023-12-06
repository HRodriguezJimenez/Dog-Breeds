import Card from "../Card/Card";
import style from "./cardsContainer.module.css";

const CardsContainer = ({ allDogs }) => {
  const dogs = allDogs;
  return (
    <div className={style.CardsContainer}>
      {dogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            minHeight={dog.minHeight}
            maxHeight={dog.maxHeight}
            minWeight={dog.minWeight}
            maxWeight={dog.maxWeight}
            minLifeSpan={dog.minLifeSpan}
            maxLifeSpan={dog.maxLifeSpan}
            Temperaments={dog.Temperaments}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
