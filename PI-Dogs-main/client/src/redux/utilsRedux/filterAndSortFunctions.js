// Esta función nos retorna un array con los perros que tengan el temperamento seleccionado para realizar el filtro.
export function filterByTemperament(dogs, temperaments) {
  let temperamentDogs = [];
  temperaments === "all"
    ? (temperamentDogs = dogs)
    : (temperamentDogs = dogs?.filter((dog) =>
        dog.Temperaments?.some(
          (temp) =>
            typeof temp === 'string'
              ? temperaments.includes(temp)
              : temperaments.includes(temp.name)
        )
      ));

  return temperamentDogs;
}


// En esta función realizamos un filtro que nos muestre los dogs basandose en la propiedad created.
export const filterByOrigin = (dogs, filter) => {
    let dogsByOrigin = [];
    if (filter === "Dogs BDD") {
      dogsByOrigin = dogs.filter((dog) => dog.created === true);
    }
  
    if (filter === "Dogs API") {
      dogsByOrigin = dogs.filter((dog) => dog.created === false);
    }
    
    return dogsByOrigin;
}

// Función para ordenar los dogs en orden alfabético tomando como referencia su nombre.
export const orderAlphabetically = (dogs, order) => {
  
    let dogsByAlphabetically = [];
    if (order === "A-Z") {
      dogsByAlphabetically = dogs
        ?.filter((dog) => dog.created || (dog.name && dog.name.length > 0))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  
    if (order === "Z-A") {
      dogsByAlphabetically = dogs
        ?.filter((dog) => dog.created || (dog.name && dog.name.length > 0))
        .sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return dogsByAlphabetically;
}

// Función en la realizamos un ordenamiento de menos a mas ó de mas a menos basandonos en el peso de los dogs.
export const orderByWeight = (dogs, order) => {
    let dogsByWeight = []
    if (order === "LessOrMore") {
      dogsByWeight = dogs
        ?.filter((dog) => dog.created || (dog.minWeight !== null))
        .sort((a, b) => a.minWeight - b.minWeight);
    }
  
    if (order === "MoreOrLess") {
      dogsByWeight = dogs
        ?.filter((dog) => dog.created || (dog.minWeight !== null))
        .sort((a, b) => b.minWeight - a.minWeight);
    }
    
    return dogsByWeight;
}

// En esta función incorporamos las funciones anteriores y es la  que vamos a usar para enviar la información filtrada y ordenada, recibe como parametros la lista de dogs para filtrar y un objeto de nombre configs que trae las propiedades específicas para realizar el filtrado y ordenamiento.
export default function dogsSortedAndFiltered(dogs, configs = {}) {
  const { temperament = {}, origin = {}, order = {} } = configs;

  let filteredAndOrdered = [ ...dogs ]; // Creamos una copia del estado original.

  if (temperament.active) {
    filteredAndOrdered = filterByTemperament(filteredAndOrdered, temperament.value);
  }

  if (origin.active) {
    filteredAndOrdered = filterByOrigin(filteredAndOrdered, origin.value);
  }

  if (order.active) {
    if (order.type === "weight") {
      filteredAndOrdered = orderByWeight(filteredAndOrdered, order.value);
    } else if (order.type === "alphabet") {
      filteredAndOrdered = orderAlphabetically(filteredAndOrdered, order.value);
    }
  } 
  
  return [ ...filteredAndOrdered ];
}
