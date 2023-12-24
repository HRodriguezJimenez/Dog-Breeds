import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../../utils/functions";
import { getTemperaments } from "../../redux/actions";
import axios from "axios";

const Form = () => {
  const allTemperaments = useSelector((state) => state.allTemperaments);

  const dispatch = useDispatch();

  // Creamos un estado local para que almacene los valores ingresados en el input del formulario.
  const [input, setInput] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: [],
  });

  // Estado local que nos permitira ir almacenando en tiempo real los errores que se vayan generando al ingresar los datos en el formulario.
  const [errors, setErrors] = useState({
    name: "Ingrese un nombre.",
    image: "Ingrese una URL.",
    minHeight: "Ingrese un valor entre 1 - 100",
    maxHeight: "Ingrese un valor entre 1 - 100",
    minWeight: "Ingrese un valor entre 1 - 100",
    maxWeight: "Ingrese un valor entre 1 - 100",
    minLifeSpan: "Ingrese un valor entre 1 - 20",
    maxLifeSpan: "Ingrese un valor entre 1 - 20",
    temperaments: "Seleccione un temperamento.",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;

    // Convertir a número solo si el campo es numérico
    const numericValue =
      !isNaN(value) && !isNaN(parseInt(value, 10))
        ? parseInt(value, 10)
        : value;

    if (name === "temperaments") {
      // Para el campo de selección de temperamentos
      setInput({ ...input, [name]: numericValue });
    } else {
      // Para otros campos
      setInput({ ...input, [name]: numericValue });
    }

    setErrors(validate({ ...input, [name]: numericValue }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3001/dogs";

    try {
      const response = await axios.post(url, {
        ...input,
        temperaments: input.temperaments,
      });

      if (response.status === 200) {
        window.alert("¡Éxito! El formulario se ha enviado correctamente.");
        setInput({
          name: "",
          image: "",
          minHeight: "",
          maxHeight: "",
          minWeight: "",
          maxWeight: "",
          minLifeSpan: "",
          maxLifeSpan: "",
          temperaments: [],
        });
      } else {
        console.log(
          "Respuesta exitosa, pero con un código diferente:",
          response
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("Error: " + error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1>Esta es la vista de Form</h1>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              value={input.value}
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Ingrese un nombre"
            />
            {errors.name ? <p>{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="image">Imagen</label>
            <input
              type="text"
              value={input.value}
              name="image"
              onChange={handleChange}
              id="image"
              placeholder="Ingrese una URL"
              pattern="https?://.+"
            />
            {errors.image ? <p>{errors.image}</p> : null}
          </div>
          <div>
            <label htmlFor="minHeight">Altura mínima</label>
            <input
              type="number"
              value={input.minHeight}
              name="minHeight"
              onChange={handleChange}
              id="minHeight"
              placeholder="1 - 100"
            />
            {errors.minHeight ? <p>{errors.minHeight}</p> : null}
          </div>
          <div>
            <label htmlFor="maxHeight">Altura máxima</label>
            <input
              type="number"
              value={input.maxHeight}
              name="maxHeight"
              onChange={handleChange}
              id="maxHeight"
              placeholder="1 - 100"
            />
            {errors.maxHeight ? <p>{errors.maxHeight}</p> : null}
          </div>
          <div>
            <label htmlFor="minWeight">Peso mínimo</label>
            <input
              type="number"
              value={input.minWeight}
              name="minWeight"
              onChange={handleChange}
              id="minWeight"
              placeholder="1 - 100"
            />
            {errors.minWeight ? <p>{errors.minWeight}</p> : null}
          </div>
          <div>
            <label htmlFor="maxWeight">Peso máximo</label>
            <input
              type="number"
              value={input.maxWeight}
              name="maxWeight"
              onChange={handleChange}
              id="maxWeight"
              placeholder="1 - 100"
            />
            {errors.maxWeight ? <p>{errors.maxWeight}</p> : null}
          </div>
          <div>
            <label htmlFor="minLifeSpan">Años de vida mínimo</label>
            <input
              type="number"
              value={input.minLifeSpan}
              name="minLifeSpan"
              onChange={handleChange}
              id="minLifeSpan"
              placeholder="1 - 20"
            />
            {errors.minLifeSpan ? <p>{errors.minLifeSpan}</p> : null}
          </div>
          <div>
            <label htmlFor="maxLifeSpan">Años de vida máximo</label>
            <input
              type="number"
              value={input.maxLifeSpan}
              name="maxLifeSpan"
              onChange={handleChange}
              id="maxLifeSpan"
              placeholder="1 - 20"
            />
            {errors.maxLifeSpan ? <p>{errors.maxLifeSpan}</p> : null}
          </div>
          <div>
            <label htmlFor="temperaments">Temperamentos</label>
            <select
              id="temperaments"
              name="temperaments"
              value={input.temperaments}
              onChange={handleChange}
            >
              {allTemperaments?.map((temperament) => (
                <option key={temperament.id} value={temperament.id}>
                  {temperament.name}
                </option>
              ))}
            </select>
          </div>
          {errors.name ||
          errors.image ||
          errors.minHeight ||
          errors.maxHeight ||
          errors.minWeight ||
          errors.maxWeight ||
          errors.minLifeSpan ||
          errors.maxLifeSpan ||
          errors.temperaments ? null : (
            <button type="submit">Enviar</button>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
