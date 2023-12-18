export const filterByTemperament = (dogs, temperaments) => {
    //console.log(temperaments);
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
    let dogsByOrigin = [];
    if (filter === "Dogs BDD") {
      dogsByOrigin = dogs.filter((dog) => dog.created === true);
    }
  
    if (filter === "Dogs API") {
      dogsByOrigin = dogs.filter((dog) => dog.created === false);
    }
    //console.log(dogsByOrigin);
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
    //console.log(dogsByAlphabetically);
    return dogsByAlphabetically;
}

export const orderByWeight = (dogs, order) => {
    if (order === "LessOrMore") {
      return dogs
        .filter((dog) => dog.minWeight !== null)
        .sort((a, b) => a.minWeight - b.minWeight);
    }
  
    if (order === "MoreOrLess") {
      return dogs
        .filter((dog) => dog.minWeight !== null)
        .sort((a, b) => b.minWeight - a.minWeight);
    }
    //console.log(dogs);
    return dogs;
}

export default function dogsSortedAndFiltered(dogs, configs) {
  const { temperamentsFilter, originFilter, order } = configs;

  let filteredAndOrdered = dogs;

  if (temperamentsFilter && temperamentsFilter.active) {
    filteredAndOrdered = filterByTemperament(filteredAndOrdered, temperamentsFilter.value);
  }

  if (originFilter && originFilter.active) {
    filteredAndOrdered = filterByOrigin(filteredAndOrdered, originFilter.value);
  }

  if (order && order.active) {
    if (order.type === "weight") {
      filteredAndOrdered = orderByWeight(filteredAndOrdered, order.value);
    } else {
      filteredAndOrdered = orderAlphabetically(filteredAndOrdered, order.value);
    }
  } 
  //console.log(filteredAndOrdered);
  return filteredAndOrdered;
}
