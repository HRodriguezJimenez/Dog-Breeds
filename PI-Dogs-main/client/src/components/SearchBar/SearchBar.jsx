export default function SearchBar({ handleChange, handleSubmit }) {
  return (
    <div>
      <form onChange={handleChange}>
        <input type="search" placeholder="Busqueda" />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}
