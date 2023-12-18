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
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [filter, setFilter] = useState({
    temperament: "select one",
    order: "all",
    origin: "all",
  });

  const [configs, setConfigs] = useState({
    temperamentsFilter: { active: false, value: "" },
    originFilter: { active: false, value: "" },
    order: { active: false, type: "", value: "" },
  });

  const handleChangeFilter = (e, filterKey, action) => {
    const value = e.target.value;
    let auxConfigs = { ...configs };

    if (value !== "select one" && value !== "all") {
      auxConfigs[filterKey] = { active: true, value: value };
    } else {
      auxConfigs[filterKey] = { active: false, value: "" };
    }
    setConfigs(auxConfigs);
    console.log(auxConfigs);
    dispatch(action(auxConfigs));
    dispatch(paginDogs(value));
    setFilter((prevFilter) => ({ ...prevFilter, [filterKey]: value }));
  };

  const resetFilters = () => {
    setFilter({
      temperament: "Select one or more typical temperaments of the breed",
      order: "All",
      origin: "Select Origin",
    });

    setConfigs({
      temperamentsFilter: { active: false, value: "" },
      originFilter: { active: false, value: "" },
      order: { active: false, type: "", value: "" },
    });

    dispatch(getDogs());
  };

  return (
    <div>
      <h1>Aqui van los filtros</h1>
      <div>
        <div>
          <label>Temperaments: </label>
          <select
            name="temperaments"
            value={filter.temperament}
            onChange={(e) =>
              handleChangeFilter(e, "temperamentsFilter", sortedAndFiltered)
            }
          >
            <option name="all" value="all">
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
          <label>Creation time: </label>
          <select
            name="origin"
            value={filter.origin}
            onChange={(e) =>
              handleChangeFilter(e, "originFilter", sortedAndFiltered)
            }
          >
            <option value="all">All</option>
            <option name="Dogs BDD" value="Dogs BDD">
              New breeds
            </option>
            <option name="Dogs API" value="Dogs API">
              Other breeds
            </option>
          </select>
        </div>

        <div>
          <label>Order:</label>
          <select
            name="weight"
            value={filter.order}
            onChange={(e) => handleChangeFilter(e, "weight", sortedAndFiltered)}
          >
            <option name="LessOrMore" value="LessOrMore">
              Low to High
            </option>
            <option name="MoreOrLess" value="MoreOrLess">
              High to Low
            </option>
            <option name="A-Z" value="A-Z">
              A-Z
            </option>
            <option name="Z-A" value="Z-A">
              Z-A
            </option>
            <option name="All" value="All">
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
