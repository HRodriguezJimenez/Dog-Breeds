// En este componente usamos las funciones para que esten pendientes de los cambios, cuando el usuario escribe en el campo de búsqueda se activa la función "handleChange" y al hacer click en el boton de búsqueda activa la función "hadleSubmit".

export default function SearchBar({ handleChange, handleSubmit, searchName }) {
  const isSearchDisabled = !searchName.trim();
  return (
    <div>
      <form>
        <input
          type="search"
          placeholder="Busqueda"
          value={searchName}
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSearchDisabled}
        >
          Buscar
        </button>
        {isSearchDisabled && (
          <p style={{ color: "black" }}>
            Ingrese el nombre de una raza para realiar la búsqueda.
          </p>
        )}
      </form>
    </div>
  );
}
