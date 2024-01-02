// Función que realiza una normalización de los datos de los dogs que provinen de la base de datos o de la api. Esto lo hace en base a la propiedad "created" para diferenciar de donde proviene cada uno.

export const renderDogInfo = (dog) => {
  if (dog.created) {
    // Perro creado en la base de datos
    return {
      name: dog.name,
      minHeight: dog.minHeight,
      maxHeight: dog.maxHeight,
      minWeight: dog.minWeight,
      maxWeight: dog.maxWeight,
      minLifeSpan: dog.minLifeSpan,
      maxLifeSpan: dog.maxLifeSpan,
      temperaments: dog.temperaments ? dog.temperaments.map(temp => temp.name).join(", ") : "", // Creamos una cadena que representa los temperamentos del dog, si tiene temperamentos los mapeamos y los separamos por ",". Si no tiene devolvemos una cadena vacia "".
    };
  } else {
    // Perro de la API
    return {
      name: dog.name,
      minHeight: dog.minHeight,
      maxHeight: dog.maxHeight,
      minWeight: dog.minWeight,
      maxWeight: dog.maxWeight,
      minLifeSpan: dog.minLifeSpan,
      maxLifeSpan: dog.maxLifeSpan,
      temperaments: dog.Temperaments ? dog.Temperaments.map(temp => (typeof temp === 'object' ? temp.name : temp)).join(", ") : "", // Verificamos la propiedad "Temperaments" y confirmamos si es un objeto antes de extraer el nombre.
    };
  }
};
  
// Función que creamos para validar los datos que envian en la solicitud para crear un nuevo dog y almacenarlo en nuestra base de datos. Creamos una variable "errors" para que almacene los errores dependiendo del dato que lo genere.
export const validate = ({
  name,
  image,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  minLifeSpan,
  maxLifeSpan,
  temperaments,
}) => {
  const errors = {};

  if (!name) {
    errors.name = "The field cannot be empty."
  } else if (/^\d+$/.test(name)) {
    errors.name = "The name cannot be a number.";
  }

  if (!image) {
    errors.image = "If you do not provide an image, one will be assigned by default."
  } 

  if (!minHeight) {
    errors.minHeight = "The field cannot be empty."
  } else if (parseInt(minHeight) < 1 || parseInt(minHeight) > 100) {
    errors.minHeight = "Please enter a number between 1 - 100."
  } else if (parseInt(minHeight) >= parseInt(maxHeight)){
    errors.minHeight = "The minimum height cannot be greater than the maximum height."
  }

  if (!maxHeight) {
    errors.maxHeight = "The field cannot be empty."
  } else if (parseInt(maxHeight) < 1 || parseInt(maxHeight) > 100) {
    errors.maxHeight = "Please enter a number between 1 - 100.";
  } else if (parseInt(maxHeight) <= parseInt(minHeight)) {
    errors.maxHeight = "The maximum height cannot be less than the minimum height."
  }

  if (!minWeight) {
    errors.minWeight = "The field cannot be empty."
  } else if (parseInt(minWeight) < 1 || parseInt(minWeight) > 100) {
    errors.minWeight = "Please enter a number between 1 - 100."
  } else if (parseInt(minWeight) >= parseInt(maxWeight)){
    errors.minWeight = "The minimum weight cannot be greater than the maximum weight."
  }

  if (!maxWeight) {
    errors.maxWeight = "The field cannot be empty."
  } else if (parseInt(maxWeight) < 1 || parseInt(maxWeight) > 100) {
    errors.maxWeight = "Please enter a number between 1 - 100.";
  } else if (parseInt(maxWeight) <= parseInt(minWeight)) {
    errors.maxWeight = "The maximum weight cannot be less than the minimum weight."
  }

  if (!minLifeSpan) {
    errors.minLifeSpan = "The field cannot be empty."
  } else if (parseInt(minLifeSpan) < 1 || parseInt(minLifeSpan) > 20) {
    errors.minLifeSpan = "Please enter a number between 1 - 20."
  } else if (parseInt(minLifeSpan) >= parseInt(maxLifeSpan)){
    errors.minLifeSpan = "The minimum age cannot be higher than the maximum age."
  }

  if (!maxLifeSpan) {
    errors.maxLifeSpan = "The field cannot be empty."
  } else if (parseInt(maxLifeSpan) < 1 || parseInt(maxLifeSpan) > 20) {
    errors.maxLifeSpan = "Please enter a number between 1 - 20.";
  } else if (parseInt(maxLifeSpan) <= parseInt(minLifeSpan)) {
    errors.maxLifeSpan = "The maximum age cannot be less than the minimum age."
  }

  if (!temperaments) {
    errors.temperaments = "Please select a temperament."
  }

  return errors;
}
