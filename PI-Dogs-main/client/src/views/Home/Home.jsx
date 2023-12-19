import { useEffect, useState } from "react"; // "useEffect" lo usamos para controlar los efectos secundarios en la renderización de un componente y "useState" para manejar un estado local en el componente.
import { useDispatch, useSelector } from "react-redux"; // "useDispatch" lo usamos para interactuar con el store y despachar acciones para que el reducer actue en base a la "actions" que le despachamos, "useSelector" nos permite seleccionar una parte del state de redux en específico.
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { getDogs, getDogByName } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.sortedAndFiltered);
  const [searchName, setSearchName] = useState(""); // Estado local que usamos para almacenar el nombre utilizado en la busqueda.
  const [isSearching, setIsSearching] = useState(false); // Estado local donde indicamos si actualmente se esta realizando una busqueda.

  function handleChange(e) {
    // Esta función se activa en el momento que el usuario escribe en el campo de búsqueda y actualiza el estado.
    e.preventDefault();
    const { value } = e.target;
    if (isNaN(value)) {
      setSearchName(value);
    } else {
      alert("No ingresar números.");
    }
  }

  function handleSubmit(e) {
    // Se activa en el momento que se envía la búsqueda configuramos "isSearching" como true y despacha una actions para buscar un dog por su nombre.
    e.preventDefault();
    setIsSearching(true);
    dispatch(getDogByName(searchName));
    setSearchName(""); // limpiamos el input despues de la búsqueda.
  }

  useEffect(() => {
    // Lo usamos para despachar una actions si no se esta realizando una busqueda.
    if (!isSearching) {
      dispatch(getDogs());
    }
  }, [dispatch, isSearching]);

  const handleResetSearch = () => {
    setIsSearching(false);
  };

  return (
    <>
      <FilterSearch
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleResetSearch={handleResetSearch}
        searchName={searchName}
      />
      <CardsContainer allDogs={allDogs} isSearching={isSearching} />
    </>
  );
};

export default Home;
