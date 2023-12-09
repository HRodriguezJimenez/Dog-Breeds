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
        temperaments: dog.temperaments ? dog.temperaments.map(temp => temp.name).join(", ") : "",
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
        temperaments: dog.Temperaments ? dog.Temperaments.map(temp => (typeof temp === 'object' ? temp.name : temp)).join(", ") : "",
      };
    }
  };
  