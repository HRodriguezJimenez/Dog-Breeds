import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const dogById = useSelector((state) => state.dogById);
  const { id } = useParams(); // "useParams" lo usamos para extraer el parámetro "id" de la URL.
  console.log(dogById);
  // Llamamos a la función getDogById cuando el componente se monta o cuando el id cambia.
  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  // Mostramos un mensaje "Loading..." si la información se demora en cargarse en la página.
  if (!dogById.length) {
    return <div>Loading...</div>;
  }

  const dogDetails = dogById[0];

  // En esta función usamos la propiedad created para validar si el dog es de la API o de la BDD.
  const verificarTemp = (dogDetails) => {
    if (dogDetails.created) {
      // Si es de la BDD accedemos a la primera posición del array y a la propiedad nombre.
      return dogDetails.Temperaments[0]?.name || "No Temperament";
    } else {
      // Si es de la API concatenamos todo separado por "," .
      return dogDetails.Temperaments?.join(", ") || "No Temperaments";
    }
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <Link to="/home">
          <button className={styles.button}>Go back</button>
        </Link>
        <img
          className={styles.imgCard}
          src={dogDetails.image}
          alt={dogDetails.name}
        />
        <ul className={styles.ulDatos}>
          <h3 className={styles.h3Detail}>Información</h3>
          <li>Name: {dogDetails.name}</li>
          <li>
            Weight: min {dogDetails.minWeight} - max {dogDetails.maxWeight}
          </li>
          <li>
            Height: min {dogDetails.minHeight} - max {dogDetails.maxHeight}
          </li>
          <li>
            LifeSpan: min {dogDetails.minLifeSpan} - max{" "}
            {dogDetails.maxLifeSpan}
          </li>
          <li>Temperaments: {verificarTemp(dogDetails)}</li>
        </ul>
      </div>
    </>
  );
};

export default Detail;
