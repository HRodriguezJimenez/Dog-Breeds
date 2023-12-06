// import Detail from "./Detail/Detail";
// import Form from "./Form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>Esta es la vista de Home</h1>
      <CardsContainer allDogs={allDogs} />
    </>
  );
};

export default Home;
