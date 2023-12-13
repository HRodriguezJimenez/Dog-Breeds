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
  