/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { validate } from "../../utils/functions";

const Form = () => {
  const allTemperaments = useSelector((state) => state.allTemperaments);

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

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value })); // Con esta función capturamos en tiempo real los cambios y errores que se vayan generando en el input.
  }

  return (
    <>
      <h1>Esta es la vista de Form</h1>
      <div>
        <form action="http://localhost:3001/dogs/" method="post">
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
              name="url"
              onChange={handleChange}
              id="url"
              placeholder="Ingrese una URL"
              pattern="https?://.+"
            />
            {errors.image ? <p>{errors.image}</p> : null}
          </div>
          <div>
            <label htmlFor="minHeight">Altura minima</label>
            <input
              type="number"
              value={input.value}
              name="minHeight"
              onChange={handleChange}
              id="minHeight"
              placeholder="1 - 100"
            />
            {errors.minHeight ? <p>{errors.minHeight}</p> : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
