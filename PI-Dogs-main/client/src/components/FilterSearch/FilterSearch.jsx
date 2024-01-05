import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getDogs,
  sortedAndFiltered,
  paginDogs,
} from "../../redux/actions";

import SearchBar from "../SearchBar/SearchBar";
import styles from "./filterSearch.module.css";

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

  const initialFilterState = {
    temperament: "all",
    order: "all",
    origin: "all",
  };

  const [filter, setFilter] = useState(initialFilterState); // Estado inicial para realizar los filtros.

  const initialConfigsState = {
    temperament: { active: false, value: "" },
    origin: { active: false, value: "" },
    order: { active: false, type: "", value: "" },
  };

  const [configs, setConfigs] = useState(initialConfigsState); // Estado inicial para controlar que filtros se estan aplicando y de esta manera controlar el renderizado de la información.

  // Esta es la función encargada de generar y manejar los cambios en los filtros, "filterKey" la usamos como una variable dinámica de una propiedad del objeto configs para que su valor cambie dependiendo del valor que se active el cambio.
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

    // Modificamos los estados, "prevFilter" refleja el estado actual de filter antes de agregar los cambios y se modifica con lo que en ese momento tenga "filterKey" y setConfigs lo seteamos con el resultado de los cambios que se generan en auxConfitgs.
    setFilter((prevFilter) => ({ ...prevFilter, [filterKey]: value }));
    setConfigs(auxConfigs);

    dispatch(sortedAndFiltered(auxConfigs));
    dispatch(action(auxConfigs));
    dispatch(paginDogs(value));
  };

  // Función para resetear los filtros esta se activa al hacer click en el boton asociado.
  const resetFilters = () => {
    setFilter(initialFilterState);
    setConfigs(initialConfigsState);
    dispatch(paginDogs(1));
    dispatch(getDogs());
    dispatch(sortedAndFiltered({}));
  };

  return (
    <div>
      <h2 className={styles.h2}>Filtrar y ordenar los perros.</h2>
      <div className={styles.divContainer}>
        <div>
          <label className={styles.label} htmlFor="temperaments">
            Filtrar por temperamento:{" "}
          </label>
          <select
            className={styles.select}
            id="temperaments"
            name="temperaments"
            value={filter.temperament}
            onChange={(e) =>
              handleChangeFilter(e, "temperament", sortedAndFiltered)
            }
          >
            <option id="allOptionTemperament" name="all" value="all">
              Todos
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
          <label className={styles.label} htmlFor="origin">
            Filtrar por origen :{" "}
          </label>
          <select
            className={styles.select}
            id="origin"
            name="origin"
            value={filter.origin}
            onChange={(e) => handleChangeFilter(e, "origin", sortedAndFiltered)}
          >
            <option id="allOptionOrigin" value="all">
              Todo
            </option>
            <option id="DogsBDDOption" name="Dogs BDD" value="Dogs BDD">
              Nuevas razas
            </option>
            <option id="DogsAPIOption" name="Dogs API" value="Dogs API">
              Otras razas
            </option>
          </select>
        </div>

        <div>
          <label className={styles.label} htmlFor="weight">
            Ordenar por:{" "}
          </label>
          <select
            className={styles.select}
            id="weight"
            name="weight"
            value={filter.order}
            onChange={(e) => handleChangeFilter(e, "order", sortedAndFiltered)}
          >
            <option id="LessOrMoreOption" name="LessOrMore" value="LessOrMore">
              Menos o Más
            </option>
            <option id="MoreOrLessOption" name="MoreOrLess" value="MoreOrLess">
              Más o menos
            </option>
            <option id="AZOption" name="A-Z" value="A-Z">
              A - Z
            </option>
            <option id="ZAOption" name="Z-A" value="Z-A">
              Z - A
            </option>
            <option id="allOption" name="all" value="all">
              Todo
            </option>
          </select>
        </div>

        <button className={styles.buttonReset} onClick={resetFilters}>
          Restablecer filtros
        </button>
      </div>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchName={searchName}
        handleResetSearch={handleResetSearch}
      />
    </div>
  );
}
