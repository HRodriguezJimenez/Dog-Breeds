export function filterByTemperament(dogs, temperaments) {
  console.log(temperaments);
    let temperamentDogs = [];
  temperaments === "all"
    ? (temperamentDogs = dogs)
    : (temperamentDogs = dogs?.filter((dog) =>
        dog.Temperaments?.some((temp) => temperaments.includes(temp))
      ));
  console.log(temperamentDogs);
  return temperamentDogs;     
}

export const filterByOrigin = (dogs, filter) => {
  console.log(dogs);
  console.log(filter);
    let dogsByOrigin = [];
    if (filter === "Dogs BDD") {
      dogsByOrigin = dogs.filter((dog) => dog.created === true);
    }
  
    if (filter === "Dogs API") {
      dogsByOrigin = dogs.filter((dog) => dog.created === false);
    }
    console.log(dogsByOrigin);
    return dogsByOrigin;
}

export const orderAlphabetically = (dogs, order) => {
  
    let dogsByAlphabetically = [];
    if (order === "A-Z") {
      dogsByAlphabetically = dogs.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    if (order === "Z-A") {
      dogsByAlphabetically = dogs.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return dogsByAlphabetically;
}

export const orderByWeight = (dogs, order) => {
  console.log(dogs);
  console.log(order);
    let dogsByWeight = []
    if (order === "LessOrMore") {
      dogsByWeight = dogs
        ?.filter((dog) => dog.minWeight !== null)
        .sort((a, b) => a.minWeight - b.minWeight);
    }
  
    if (order === "MoreOrLess") {
      dogsByWeight = dogs
        ?.filter((dog) => dog.minWeight !== null)
        .sort((a, b) => b.minWeight - a.minWeight);
    }
    console.log(dogsByWeight);
    return dogsByWeight;
}

export default function dogsSortedAndFiltered(dogs, configs = {}) {
  const { temperament = {}, origin = {}, order = {}} = configs;

  let filteredAndOrdered = [ ...dogs ];

  if (temperament.active) {
    filteredAndOrdered = filterByTemperament(filteredAndOrdered, temperament.value);
  }

  if (origin.active) {
    filteredAndOrdered = filterByOrigin(filteredAndOrdered, origin.value);
  }

  if (order.active) {
    if (order.type === "weight") {
      filteredAndOrdered = orderByWeight(filteredAndOrdered, order.value);
    } else {
      filteredAndOrdered = orderAlphabetically(filteredAndOrdered, order.value);
    }
  } 
  console.log(filteredAndOrdered);
  return [ ...filteredAndOrdered ];
}
