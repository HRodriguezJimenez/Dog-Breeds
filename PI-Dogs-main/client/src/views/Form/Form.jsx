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
    name: "Enter a name.",
    image: "Enter a URL.",
    minHeight: "Enter a value between 1 - 100.",
    maxHeight: "Enter a value between 1 - 100.",
    minWeight: "Enter a value between 1 - 100.",
    maxWeight: "Enter a value between 1 - 100.",
    minLifeSpan: "Enter a value between 1 - 20.",
    maxLifeSpan: "Enter a value between 1 - 20.",
    temperaments: "Select one or more temperaments.",
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

    // Verificar si el campo de la imagen está vacío
    if (!input.image) {
      // Asignar una URL de imagen por defecto
      input.image =
        "https://img.freepik.com/vector-premium/blanco-negro-cabeza-perro_200180-247.jpg?w=360";
    }

    try {
      const response = await axios.post(url, {
        ...input,
        temperaments: input.temperaments.map((temp) => temp.id),
      });
      if (response) {
        window.alert("Successfully created breed.");
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
      <div className={styles.divForm}>
        <h4 className={styles.h4}>Create your own dog breed.</h4>
        <div className={styles.dataForm}>
          <form onSubmit={submitHandler}>
            <div>
              <label className={styles.labelsForm} htmlFor="name">
                Name
              </label>
              <input
                className={styles.inputsForm}
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                id="name"
                placeholder="Enter a name."
              />
              {errors.name ? (
                <h6 className={styles.errors}>{errors.name}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="image">
                Image
              </label>
              <input
                className={styles.inputsForm}
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                id="image"
                placeholder="Entar a URL."
                pattern="https?://.+"
              />
              {errors.image ? (
                <h6 className={styles.errors}>{errors.image}</h6>
              ) : null}
            </div>
            <div>
              <label className={styles.labelsForm} htmlFor="minHeight">
                Minimun height
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
                Maximum height
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
                Minimum weight
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
                Maximum weight
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
                Minimum years of life
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
                Maximum life years
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
                Temperaments:{" "}
              </label>

              <select
                className={styles.select}
                name="temperaments"
                onChange={addTemperament}
              >
                <option value="">Select one or more temperaments.</option>
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

            <h4>Selected Temperaments:</h4>
            <div>
              {input.temperaments &&
                input.temperaments.map((temperament) => (
                  <div>{temperament.name}</div>
                ))}
            </div>

            {errors.name ||
            errors.minHeight ||
            errors.maxHeight ||
            errors.minWeight ||
            errors.maxWeight ||
            errors.minLifeSpan ||
            errors.maxLifeSpan ||
            errors.temperaments ? null : (
              <button className={styles.button} type="submit">
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
