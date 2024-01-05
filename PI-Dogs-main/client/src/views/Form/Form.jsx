import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../../utils/functions";
import { getTemperaments } from "../../redux/actions";
import axios from "axios";
import styles from "./form.module.css";

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
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: "",
  });

  // Esta función maneja los cambios en el formulario, usamos una propiedad dinamica para actualizar el formulario dependiendo del campo en el que se genere el cambio.
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructuramos las propiedades name y value del objeto event.target.

    const copyState = { ...input };
    setErrors(validate({ ...copyState, [name]: value })); // Capturamos los errores usando la función validate, agregamos una propiedad dinámica para que cambie con el nombre del campo del folmulario al que se le va agregando información.
    setInput({ ...copyState, [name]: value });
  };

  // Esta función es la encargada de enviar la solicitud con la información que contiene el formulario a nuestro servidor para la creación de un nuevo dog y almacenarlo en la base de datos.
  const submitHandler = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3001/dogs";

    // Verificamos si el campo de la imagen está vacío.
    if (!input.image) {
      // Asignamos una URL de imagen por defecto para el formulario.
      input.image =
        "https://img.freepik.com/vector-premium/blanco-negro-cabeza-perro_200180-247.jpg?w=360";
    }

    try {
      const response = await axios.post(url, {
        // Enviamos en el cuerpo de la solicitud una copia del estado inputs y un mapeo de la propiedad temperaments solo con los temperamentos seleccionados por su id.
        ...input,
        temperaments: input.temperaments.map((temp) => temp.id),
      });
      if (response) {
        window.alert("Raza creada con éxito.");
      }
      setInput({
        // Limpiamos el formulario después de enviarlo.
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

    // Verificamos que el valor no este vacío y que el temperamento no este duplicado.
    if (value && !input.temperaments.some((temp) => temp.name === value)) {
      const selectedTemperamentName = value;

      // Obtenemos el id del temperamento seleccionado en las opciones del select.
      const TemperamentId = event.target.options[event.target.selectedIndex].id;
      const copyState = { ...input };

      // Agregamos el nuevo temperamento a la lista de temperamentos en la copia del estado.
      copyState.temperaments = [
        ...copyState.temperaments,
        { id: TemperamentId, name: selectedTemperamentName },
      ];

      // Validamos y actulizamos los errores en el estado.
      setErrors(validate(copyState));
      setInput(copyState);
    }
  };

  return (
    <>
      <div className={styles.divForm}>
        <h4 className={styles.h4}>Crea tu propia raza de perro.</h4>
        <div className={styles.dataForm}>
          <form onSubmit={submitHandler}>
            <div>
              <label className={styles.labelsForm} htmlFor="name">
                Nombre
              </label>
              <input
                className={styles.inputsForm}
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                id="name"
                placeholder="Ingrese un nombre."
                autoComplete="off"
              />
              {errors.name ? (
                <h6 className={styles.errors}>{errors.name}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="image">
                Imagen
              </label>
              <input
                className={styles.inputsForm}
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                id="image"
                placeholder="Ingrese una URL."
                pattern="https?://.+"
              />
              {errors.image ? (
                <h6 className={styles.errors}>{errors.image}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="minHeight">
                Altura mínima
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.minHeight}
                name="minHeight"
                onChange={handleChange}
                id="minHeight"
                placeholder="1 - 100"
              />
              {errors.minHeight ? (
                <h6 className={styles.errors}>{errors.minHeight}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="maxHeight">
                Altura máxima
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.maxHeight}
                name="maxHeight"
                onChange={handleChange}
                id="maxHeight"
                placeholder="1 - 100"
              />
              {errors.maxHeight ? (
                <h6 className={styles.errors}>{errors.maxHeight}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="minWeight">
                Peso mínimo
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.minWeight}
                name="minWeight"
                onChange={handleChange}
                id="minWeight"
                placeholder="1 - 100"
              />
              {errors.minWeight ? (
                <h6 className={styles.errors}>{errors.minWeight}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="maxWeight">
                Peso máximo
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.maxWeight}
                name="maxWeight"
                onChange={handleChange}
                id="maxWeight"
                placeholder="1 - 100"
              />
              {errors.maxWeight ? (
                <h6 className={styles.errors}>{errors.maxWeight}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="minLifeSpan">
                Mínimo de expectativa de vida
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.minLifeSpan}
                name="minLifeSpan"
                onChange={handleChange}
                id="minLifeSpan"
                placeholder="1 - 20"
              />
              {errors.minLifeSpan ? (
                <h6 className={styles.errors}>{errors.minLifeSpan}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="maxLifeSpan">
                Máximo de expectativa de vida
              </label>
              <input
                className={styles.inputsForm}
                type="number"
                value={input.maxLifeSpan}
                name="maxLifeSpan"
                onChange={handleChange}
                id="maxLifeSpan"
                placeholder="1 - 20"
              />
              {errors.maxLifeSpan ? (
                <h6 className={styles.errors}>{errors.maxLifeSpan}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="temperaments">
                Temperamentos{" "}
              </label>

              <select
                className={styles.select}
                name="temperaments"
                id="temperaments"
                onChange={addTemperament}
              >
                <option value="">Seleccione uno o mas temperamentos.</option>
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
                <h6 className={styles.errors}>{errors.temperaments}</h6>
              )}
            </div>
            <h4 className={styles.h4}>Temperamentos seleccionados</h4>

            <div>
              {input.temperaments &&
                input.temperaments.map((temperament) => (
                  <div>{temperament.name}</div>
                ))}
            </div>
            {/*Creamos un renderizado condicional para controlar el renderizado del boton de Crear, que depende si encuentra errores en alguno de los campos del formulario.*/}
            {errors.name ||
            errors.minHeight ||
            errors.maxHeight ||
            errors.minWeight ||
            errors.maxWeight ||
            errors.minLifeSpan ||
            errors.maxLifeSpan ||
            errors.temperaments ? null : (
              <button className={styles.button} type="submit">
                Crear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
