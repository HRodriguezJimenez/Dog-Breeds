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
    errors.name = "El campo no puede estar vacio."
  } else if (/^\d+$/.test(name)) {
    errors.name = "El nombre no puede ser un número.";
  }

  if (!image) {
    errors.image = "Si no provee una imagen se asignara una por defecto."
  } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(image)) {
    errors.image = "Debe ingresar una URL valida."
  }

  if (!minHeight) {
    errors.minHeight = "El campo no puede estar vacio."
  } else if (minHeight < 1 || minHeight > 100) {
    errors.minHeight = "Por favor ingrese un número entre 1 - 100"
  } else if (minHeight >= maxHeight){
    errors.minHeight = "La altura minima no puede ser mayor a la altura maxima. "
  }

  if (!maxHeight) {
    errors.maxHeight = "El campo no puede estar vacio."
  } else if (maxHeight < 1 || maxHeight > 100) {
    errors.maxHeight = "Por favor ingrese un número entre 1 - 100";
  } else if (maxHeight <= minHeight) {
    errors.maxHeight = "La altura maxima no puede ser menor a la altura minima."
  }

  if (!minWeight) {
    errors.minWeight = "El campo no puede estar vacio."
  } else if (minWeight < 1 || minWeight > 100) {
    errors.minWeight = "Por favor ingrese un número entre 1 - 100"
  } else if (minWeight >= maxWeight){
    errors.minWeight = "El peso minimo no puede ser mayor al peso maximo. "
  }

  if (!maxWeight) {
    errors.maxWeight = "El campo no puede estar vacio."
  } else if (maxWeight < 1 || maxWeight > 100) {
    errors.maxWeight = "Por favor ingrese un número entre 1 - 100";
  } else if (maxWeight <= minWeight) {
    errors.maxWeight = "El peso maximo no puede ser menor al peso minimo."
  }

  if (!minLifeSpan) {
    errors.minLifeSpan = "El campo no puede estar vacio."
  } else if (minLifeSpan < 1 || minLifeSpan > 20) {
    errors.minLifeSpan = "Por favor ingrese un número entre 1 - 20"
  } else if (minLifeSpan >= maxLifeSpan){
    errors.minLifeSpan = "La edad minima no puede ser mayor a la edad maxima."
  }

  if (!maxLifeSpan) {
    errors.maxLifeSpan = "El campo no puede estar vacio."
  } else if (maxLifeSpan < 1 || maxLifeSpan > 20) {
    errors.maxLifeSpan = "Por favor ingrese un número entre 1 - 20";
  } else if (maxLifeSpan <= minLifeSpan) {
    errors.maxLifeSpan = "La edad maxima no puede ser menor a la edad minima."
  }

  if (!temperaments) {
    errors.temperaments = "Por favor seleccione un temperamento."
  }

  return errors;
}