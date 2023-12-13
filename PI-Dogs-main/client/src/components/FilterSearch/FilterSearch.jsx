import SearchBar from "../SearchBar/SearchBar";

export default function FilterSearch({
  // Recibimos las funciones por props.
  handleChange,
  handleSubmit,
  handleResetSearch,
}) {
  return (
    <div>
      <h1>Aqui van los filtros</h1>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {handleResetSearch && ( // Realizamos un renderizado condicional si la función "handleResetSearch" esta presente/activa.
        <button onClick={handleResetSearch}>Mostrar Todos.</button>
      )}
    </div>
  );
}
