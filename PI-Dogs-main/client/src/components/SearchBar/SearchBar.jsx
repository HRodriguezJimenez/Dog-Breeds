// En este componente usamos las funciones para que esten pendientes de los cambios, cuando el usuario escribe en el campo de búsqueda se activa la función "handleChange" y al hacer click en el boton de búsqueda activa la función "hadleSubmit".
import styles from "./searchBar.module.css";

export default function SearchBar({
  handleChange,
  handleSubmit,
  searchName,
  handleResetSearch,
}) {
  const isSearchDisabled = !searchName.trim(); // Si despues que eliminamos los espacios en blanco está vacío, entonces isSearchDisabled será true. Esto lo usamos para que "disabled" este en true y deshabilite el boton de buscar.
  return (
    <div className={styles.divSearch}>
      {isSearchDisabled && (
        <p className={styles.p}>Ingrese el nombre de una raza para buscar.</p>
      )}
      <input
        type="search"
        placeholder="Busqueda"
        value={searchName}
        onChange={handleChange}
        className={styles.inputSearch}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSearchDisabled}
        className={styles.botonSearch}
      >
        Buscar
      </button>
      {handleResetSearch && ( // Realizamos un renderizado condicional si la función "handleResetSearch" esta presente/activa.
        <button onClick={handleResetSearch} className={styles.botonSearch}>
          Mostrar todo
        </button>
      )}
    </div>
  );
}
