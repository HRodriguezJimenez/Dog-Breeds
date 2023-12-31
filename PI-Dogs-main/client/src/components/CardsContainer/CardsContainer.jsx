import { useDispatch } from "react-redux"; // "useSelector" nos permite seleccionar un estado en específico del estado de Redux y "useDispatch" no permite despachar actions al reducer.
import { useEffect } from "react"; // Manejamos los efectos secundarios en el componente.

import Card from "../Card/Card";
import styles from "./cardsContainer.module.css";
import { paginDogs } from "../../redux/actions"; // Actions para controlar al paginado de la app.

const CardsContainer = ({ allDogs, isSearching, page }) => {
  // "allDogs" contiene el resultado de la búsqueda y "isSearching" indica si se esta realizando una búsqueda.
  const dispatch = useDispatch();
  console.log("state que llega a cardsContainer", page);
  const dogs = allDogs;

  // Inicia un efecto que se ejecuta cuando "isSearching" cambia o cuando el componente se monta. Despacha una actions con el número de página actual si no estamos realizando una búsqueda.
  useEffect(() => {
    if (!isSearching) {
      console.log("page en el useEffect", page);
      dispatch(paginDogs(page));
    }
  }, [isSearching, dispatch, page, allDogs]);

  // Con estas funciones despachamos la actions con el argumento correspondiente para cambiar la página.
  const nextPage = (value) => {
    dispatch(paginDogs(value));
  };

  const prevPage = (value) => {
    dispatch(paginDogs(value));
  };

  const dogsByPage = 8;
  const totalPage = Math.ceil(dogs.length / dogsByPage); // Con el método .ceil redondeamos hacia arriba el resultado de la operación.
  const start = (page - 1) * dogsByPage;
  const end = start + dogsByPage;
  const pagin = dogs.slice(start, end); // Determinamos la cantidad de dogs que se muestra en la página actual.

  console.log("page antes de renderizar el componente", page);
  console.log("total page antes de renderizar el componente", totalPage);

  return (
    <div>
      <div className={styles.divButtons}>
        {/*disabled lo usamos para deshabilitar los botones dependiendo de el número en el que se encuentre la página.*/}
        <button
          className={styles.buttons}
          onClick={() => prevPage("prev")}
          disabled={page === 1}
          value={prevPage}
        >
          Previous
        </button>
        <div className={styles.pagin}>
          Page {page} 🐶 of {totalPage}
        </div>
        <button
          className={styles.buttons}
          onClick={() => nextPage("next")}
          disabled={page === totalPage}
          value={nextPage}
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
