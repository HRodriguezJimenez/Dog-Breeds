export default function SearchBar({ handleChange, handleSubmit }) {
  // En este componente usamos las funciones para que esten pendientes de los cambios, cuando el usuario escribe en el campo de búsqueda se activa la función "handleChange" y al hacer click en el boton de búsqueda activa la función "hadleSubmit".
  return (
    <div>
      <form>
        <input type="search" placeholder="Busqueda" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}
