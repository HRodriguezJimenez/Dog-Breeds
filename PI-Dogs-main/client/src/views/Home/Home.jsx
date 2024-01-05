import { useEffect, useState } from "react"; // "useEffect" lo usamos para controlar los efectos secundarios en la renderización de un componente y "useState" para manejar un estado local en el componente.
import { useDispatch, useSelector } from "react-redux"; // "useDispatch" lo usamos para interactuar con el store y despachar acciones para que el reducer actue en base a la "actions" que le despachamos, "useSelector" nos permite seleccionar una parte del state de redux en específico.
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { getDogs, getDogByName } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.sortedAndFiltered);
  const page = useSelector((state) => state.page);
  const [searchName, setSearchName] = useState(""); // Estado local que usamos para almacenar el nombre utilizado en la busqueda.
  const [isSearching, setIsSearching] = useState(false); // Estado local donde indicamos si actualmente se esta realizando una busqueda.

  function handleChange(e) {
    // Esta función se activa en el momento que el usuario escribe en el campo de búsqueda y actualiza el estado.

    const { value } = e.target;
    if (isNaN(value)) {
      setSearchName(value);
    } else {
      alert("No introduzcas números.");
    }
  }

  // Esta función se activa en el momento que se envía la búsqueda configuramos "isSearching" como true y despacha una actions para buscar un dog por su nombre.
  function handleSubmit(e) {
    e.preventDefault();
    setIsSearching(true);
    dispatch(getDogByName(searchName));
    setSearchName(""); // limpiamos el input despues de la búsqueda.
  }

  // Lo usamos para despachar la actions getDogs() si no se esta realizando una busqueda.
  useEffect(() => {
    if (!isSearching) {
      dispatch(getDogs());
    }
  }, [dispatch, isSearching]);

  // Esta función se usa para setear el estado de isSearching como false para volver a mostrar todos los dogs en la app y la enviamos por props.
  const handleResetSearch = () => {
    setIsSearching(false);
  };

  return (
    <div className={styles.divHome}>
      <FilterSearch
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleResetSearch={handleResetSearch}
        searchName={searchName}
      />
      <CardsContainer page={page} allDogs={allDogs} isSearching={isSearching} />
    </div>
  );
};

export default Home;
