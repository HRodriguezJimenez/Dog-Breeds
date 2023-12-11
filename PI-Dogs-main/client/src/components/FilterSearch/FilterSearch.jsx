import SearchBar from "../SearchBar/SearchBar";

export default function FilterSearch({ handleChange, handleSubmit }) {
  return (
    <div>
      <h1>Aqui van los filtros</h1>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}
