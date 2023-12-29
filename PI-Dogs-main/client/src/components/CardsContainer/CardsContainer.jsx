import { useSelector, useDispatch } from "react-redux"; // "useSelector" nos permite seleccionar un estado en específico del estado de Redux y "useDispatch" no permite despachar actions al reducer.
import { useEffect } from "react"; // Manejamos los efectos secundarios en el componente.

import Card from "../Card/Card";
import styles from "./cardsContainer.module.css";
import { paginDogs } from "../../redux/actions"; // Actions para controlar al paginado de la app.

const CardsContainer = ({ allDogs, isSearching }) => {
  // "allDogs" contiene el resultado de la búsqueda y "isSearching" indica si se esta realizando una búsqueda.
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const dogs = allDogs;

  // Inicia un efecto que se ejecuta cuando "isSearching" cambia o cuando el componente se monta. Despacha una actions con el número de página actual si no estamos realizando una búsqueda.
  useEffect(() => {
    if (!isSearching) {
      dispatch(paginDogs(page));
    }
  }, [isSearching, dispatch, page]);

  // Con estas funciones despachamos la actions con el argumento correspondiente para cambiar la página.
  const nextPage = () => {
    dispatch(paginDogs("next"));
  };

  const prevPage = () => {
    dispatch(paginDogs("prev"));
  };

  const dogsByPage = 8;
  const totalPage = Math.ceil(dogs.length / dogsByPage); // Con el método .ceil redondeamos hacia arriba el resultado de la operación.
  const start = (page - 1) * dogsByPage;
  const end = start + dogsByPage;
  const pagin = dogs.slice(start, end); // Determinamos la cantidad de dogs que se muestra en la página actual.

  return (
    <div>
      <div className={styles.divButtons}>
        {/*disabled lo usamos para deshabilitar los botones dependiendo de el número en el que se encuentre la página.*/}
        <button
          className={styles.buttons}
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className={styles.pagin}>
          Page {page} 🐶 of {totalPage}
        </div>
        <button
          className={styles.buttons}
          onClick={nextPage}
          disabled={page === totalPage}
        >
          Next
        </button>
      </div>
      <div className={styles.divCards}>
        {pagin.map((dog) => {
          return (
            <Card
              className={styles.Card}
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              minWeight={dog.minWeight}
              maxWeight={dog.maxWeight}
              Temperaments={dog.Temperaments}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardsContainer;
