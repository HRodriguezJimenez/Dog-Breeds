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
      temperaments: dog.Temperaments ? dog.Temperaments.map(temp => 
        (typeof temp === 'object' ? temp.name : temp)).join(", ") : "", // Verificamos la propiedad "Temperaments" y confirmamos si es un objeto antes de extraer el nombre.
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
    errors.name = "El campo no puede estar vacío."
  } else if (/^\d+$/.test(name)) {
    errors.name = "El nombre no puede ser un número.";
  }

  if (!image) {
    errors.image = "Si no proporciona una imagen, se asignará una por defecto."
  } 

  if (!minHeight) {
    errors.minHeight = "El campo no puede estar vacío."
  } else if (parseInt(minHeight) < 1 || parseInt(minHeight) > 100) {
    errors.minHeight = "Introduzca un número entre 1 y 100."
  } else if (parseInt(minHeight) >= parseInt(maxHeight)){
    errors.minHeight = "La altura mínima no puede ser mayor que la altura máxima."
  }

  if (!maxHeight) {
    errors.maxHeight = "El campo no puede estar vacío."
  } else if (parseInt(maxHeight) < 1 || parseInt(maxHeight) > 100) {
    errors.maxHeight = "Introduzca un número entre 1 y 100.";
  } else if (parseInt(maxHeight) <= parseInt(minHeight)) {
    errors.maxHeight = "La altura máxima no puede ser inferior a la altura mínima."
  }

  if (!minWeight) {
    errors.minWeight = "El campo no puede estar vacío."
  } else if (parseInt(minWeight) < 1 || parseInt(minWeight) > 100) {
    errors.minWeight = "Introduzca un número entre 1 y 100."
  } else if (parseInt(minWeight) >= parseInt(maxWeight)){
    errors.minWeight = "El peso mínimo no puede ser mayor que el peso máximo."
  }

  if (!maxWeight) {
    errors.maxWeight = "El campo no puede estar vacío."
  } else if (parseInt(maxWeight) < 1 || parseInt(maxWeight) > 100) {
    errors.maxWeight = "Introduzca un número entre 1 y 100.";
  } else if (parseInt(maxWeight) <= parseInt(minWeight)) {
    errors.maxWeight = "El peso máximo no puede ser inferior al peso mínimo."
  }

  if (!minLifeSpan) {
    errors.minLifeSpan = "El campo no puede estar vacío."
  } else if (parseInt(minLifeSpan) < 1 || parseInt(minLifeSpan) > 20) {
    errors.minLifeSpan = "Introduzca un número entre 1 y 20."
  } else if (parseInt(minLifeSpan) >= parseInt(maxLifeSpan)){
    errors.minLifeSpan = "La edad mínima no puede ser superior a la edad máxima."
  }

  if (!maxLifeSpan) {
    errors.maxLifeSpan = "El campo no puede estar vacío."
  } else if (parseInt(maxLifeSpan) < 1 || parseInt(maxLifeSpan) > 20) {
    errors.maxLifeSpan = "Introduzca un número entre 1 y 20.";
  } else if (parseInt(maxLifeSpan) <= parseInt(minLifeSpan)) {
    errors.maxLifeSpan = "La edad máxima no puede ser inferior a la edad mínima."
  }

  if (!temperaments) {
    errors.temperaments = "Por favor seleccione uno o varios temperamentos."
  }

  return errors;
}
