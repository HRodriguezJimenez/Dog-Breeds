import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../../utils/functions";
import { getTemperaments } from "../../redux/actions";
import axios from "axios";
import style from "./form.module.css";

const Form = () => {
  const allTemperaments = useSelector((state) => state.allTemperaments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    const copyState = { ...input };
    setErrors(validate({ ...copyState, [name]: value }));
    setInput({ ...copyState, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3001/dogs";

    try {
      const response = await axios.post(url, {
        ...input,
        temperaments: input.temperaments.map((temp) => temp.id),
      });
      if (response) {
        window.alert("Formulario enviado con exito.");
      }
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
      }); // Limpiar el formulario después de enviarlo
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Error: " + error.response.data.error);
      } else {
        console.error(error);
      }
    }
  };

  const addTemperament = (event) => {
    const { value } = event.target;

    if (value && !input.temperaments.some((temp) => temp.name === value)) {
      const selectedTemperamentName = value;
      const TemperamentId = event.target.options[event.target.selectedIndex].id;
      const copyState = { ...input };

      copyState.temperaments = [
        ...copyState.temperaments,
        { id: TemperamentId, name: selectedTemperamentName },
      ];
      setErrors(validate(copyState));
      setInput(copyState);
    }
  };
  console.log(input.temperaments);
  return (
    <>
      <h1>Esta es la vista de Form</h1>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Ingrese un nombre"
            />
            {errors.name ? <p className={style.errors}>{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="image">Imagen</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
              id="image"
              placeholder="Ingrese una URL"
              pattern="https?://.+"
            />
            {errors.image ? (
              <p className={style.errors}>{errors.image}</p>
            ) : null}
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
            {errors.minHeight ? (
              <p className={style.errors}>{errors.minHeight}</p>
            ) : null}
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
            {errors.maxHeight ? (
              <p className={style.errors}>{errors.maxHeight}</p>
            ) : null}
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
            {errors.minWeight ? (
              <p className={style.errors}>{errors.minWeight}</p>
            ) : null}
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
            {errors.maxWeight ? (
              <p className={style.errors}>{errors.maxWeight}</p>
            ) : null}
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
            {errors.minLifeSpan ? (
              <p className={style.errors}>{errors.minLifeSpan}</p>
            ) : null}
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
            {errors.maxLifeSpan ? (
              <p className={style.errors}>{errors.maxLifeSpan}</p>
            ) : null}
          </div>
          <div>
            <label>Temperaments: </label>
            <option value="" disabled>
              Seleccione uno o varios temperamentos.
            </option>
            <select name="temperaments" onChange={addTemperament}>
              {allTemperaments?.map((temperament) => (
                <option
                  key={temperament.id}
                  id={temperament.id}
                  value={temperament.name}
                >
                  {temperament.name}
                </option>
              ))}
            </select>

            {errors.temperaments && (
              <p className={style.errors}>{errors.temperaments}</p>
            )}
          </div>

          <h4>Selected Temperaments:</h4>
          <div>
            {input.temperaments &&
              input.temperaments.map((temperament) => (
                <div>{temperament.name}</div>
              ))}
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
