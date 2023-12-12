import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { getDogs, getDogByName } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [searchName, setSearchName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setSearchName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSearching(true);
    dispatch(getDogByName(searchName));
  }

  useEffect(() => {
    if (!isSearching) {
      dispatch(getDogs());
    }
  }, [dispatch, isSearching]);

  const handleResetSearch = () => {
    setIsSearching(false);
  };

  return (
    <>
      <h1>Esta es la vista de Home</h1>
      <FilterSearch
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleResetSearch={handleResetSearch}
      />
      <CardsContainer allDogs={allDogs} isSearching={isSearching} />
    </>
  );
};

export default Home;
