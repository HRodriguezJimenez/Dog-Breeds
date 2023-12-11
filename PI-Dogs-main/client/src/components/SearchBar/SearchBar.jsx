export default function SearchBar({ handleChange, handleSubmit }) {
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
