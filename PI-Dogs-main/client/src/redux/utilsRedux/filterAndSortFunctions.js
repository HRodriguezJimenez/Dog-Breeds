export const filterByTemperament = (dogs, temperament) => {
    console.log(dogs);
    return temperament === "all"
      ? dogs
      : dogs.filter((dog) =>
          dog.temperaments.some((temp) => temperament.includes(temp)) || false
        ) || [];      
}

export const filterByOrigin = (dogs, filter) => {
    if (filter === "Dogs BDD") {
      return dogs.filter((dog) => dog.created === true);
    }
  
    if (filter === "Dogs API") {
      return dogs.filter((dog) => dog.created === false);
    }
  
    return dogs;
}

export const orderAlphabetically = (dogs, order) => {
    if (order === "A-Z") {
      return dogs.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    if (order === "Z-A") {
      return dogs.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    return dogs;
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
  
    return dogs;
}

export default function dogsSortedAndFiltered(dogs, configs) {
  const { temperamentsFilter, originFilter, order } = configs;
  console.log(configs);

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
  return filteredAndOrdered;
}
