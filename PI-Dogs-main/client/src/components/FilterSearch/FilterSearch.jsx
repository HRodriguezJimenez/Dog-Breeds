import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getDogs,
  sortedAndFiltered,
  paginDogs,
} from "../../redux/actions";

import SearchBar from "../SearchBar/SearchBar";

export default function FilterSearch({
  // Recibimos las funciones por props.
  handleChange,
  handleSubmit,
  handleResetSearch,
  searchName,
}) {
  const dispatch = useDispatch();
  //const allDogs = useSelector((state) => state.sortedAndFiltered);
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const initialFilterState = {
    temperament: "all",
    order: "all",
    origin: "all",
  };

  const [filter, setFilter] = useState(initialFilterState);

  const initialConfigsState = {
    temperament: { active: false, value: "" },
    origin: { active: false, value: "" },
    order: { active: false, type: "", value: "" },
  };

  const [configs, setConfigs] = useState(initialConfigsState);

  const handleChangeFilter = (event, filterKey, action) => {
    const value = event.target.value;
    const auxConfigs = {
      ...configs,
      [filterKey]:
        value !== "all"
          ? {
              active: true,
              value,
              type:
                value === "LessOrMore" || value === "MoreOrLess"
                  ? "weight"
                  : "alphabet",
            }
          : { active: false, value: "", type: "" },
    };

    setFilter((prevFilter) => ({ ...prevFilter, [filterKey]: value }));
    setConfigs(auxConfigs);
    console.log("Configs after dispatch:", auxConfigs);

    dispatch(sortedAndFiltered(auxConfigs));
    dispatch(action(auxConfigs));
    dispatch(paginDogs(value));
  };

  const resetFilters = () => {
    setFilter(initialFilterState);
    setConfigs(initialConfigsState);
    dispatch(paginDogs(1));
    dispatch(getDogs());
    dispatch(sortedAndFiltered({}));
  };

  return (
    <div>
      <h1>Aqui van los filtros</h1>
      <div>
        <div>
          <label htmlFor="temperaments">Temperaments: </label>
          <select
            id="temperaments"
            name="temperaments"
            value={filter.temperament}
            onChange={(e) =>
              handleChangeFilter(e, "temperament", sortedAndFiltered)
            }
          >
            <option id="allOptionTemperament" name="all" value="all">
              All
            </option>
            {allTemperaments?.map((temperament) => (
              <option
                key={temperament.name}
                id={temperament.id}
                value={temperament.name}
              >
                {temperament.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="origin">Creation time: </label>
          <select
            id="origin"
            name="origin"
            value={filter.origin}
            onChange={(e) => handleChangeFilter(e, "origin", sortedAndFiltered)}
          >
            <option id="allOptionOrigin" value="all">
              All
            </option>
            <option id="DogsBDDOption" name="Dogs BDD" value="Dogs BDD">
              New breeds
            </option>
            <option id="DogsAPIOption" name="Dogs API" value="Dogs API">
              Other breeds
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="weight">Order:</label>
          <select
            id="weight"
            name="weight"
            value={filter.order}
            onChange={(e) => handleChangeFilter(e, "order", sortedAndFiltered)}
          >
            <option id="LessOrMoreOption" name="LessOrMore" value="LessOrMore">
              Less or More
            </option>
            <option id="MoreOrLessOption" name="MoreOrLess" value="MoreOrLess">
              More or Less
            </option>
            <option id="AZOption" name="A-Z" value="A-Z">
              A-Z
            </option>
            <option id="ZAOption" name="Z-A" value="Z-A">
              Z-A
            </option>
            <option id="allOption" name="all" value="all">
              All
            </option>
          </select>
        </div>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchName={searchName}
      />
      {handleResetSearch && ( // Realizamos un renderizado condicional si la función "handleResetSearch" esta presente/activa.
        <button onClick={handleResetSearch}>Mostrar Todos.</button>
      )}
    </div>
  );
}
