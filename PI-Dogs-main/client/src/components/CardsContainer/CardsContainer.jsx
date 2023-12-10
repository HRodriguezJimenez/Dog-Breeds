import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Card from "../Card/Card";
import style from "./cardsContainer.module.css";
import { paginDogs } from "../../redux/actions";

const CardsContainer = ({ allDogs }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const dogs = allDogs;

  useEffect(() => {
    !dogs.lenght && dispatch(paginDogs(page));
  }, [dogs.lenght, dispatch, page]);

  const nextPage = () => {
    dispatch(paginDogs("next"));
  };

  const prevPage = () => {
    dispatch(paginDogs("prev"));
  };

  const dogsByPage = 8;
  const totalPage = Math.ceil(dogs.length / dogsByPage);

  const start = (page - 1) * dogsByPage;
  const end = start + dogsByPage;
  const pagin = dogs.slice(start, end);

  return (
    <div className={style.CardsContainer}>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={nextPage} disabled={page === totalPage}>
          Siguiente
        </button>
        <div>
          {page} 🐶 {totalPage}
        </div>
      </div>
      {pagin.map((dog) => {
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
