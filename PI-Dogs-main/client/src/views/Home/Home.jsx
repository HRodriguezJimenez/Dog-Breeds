import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { getDogs, getDogByName } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [searchName, setSearchName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByName(searchName));
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>Esta es la vista de Home</h1>
      <FilterSearch handleChange={handleChange} handleSubmit={handleSubmit} />
      <CardsContainer allDogs={allDogs} />
    </>
  );
};

export default Home;
