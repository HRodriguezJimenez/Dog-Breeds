export const filterByTemperament = (dogs, temperament) => {
    return temperament === "all"
      ? dogs
      : dogs.filter((dog) =>
          dog.temperaments.some((temp) => temperament.includes(temp))
        );
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
        .sort((a, b) => b.minWeight - a.minWeight);
    }
  
    if (order === "MoreOrLess") {
      return dogs
        .filter((dog) => dog.minWeight !== null)
        .sort((a, b) => a.minWeight - b.minWeight);
    }
  
    return dogs;
}

export const dogsSortedAndFiltered = (dogs, newConfig) => {
  const [filteredTemperaments, filteredOrigins, order] = newConfig;

  let filteredAndOrdered = dogs;

  if (filteredTemperaments.active) {
    filteredAndOrdered = filterByTemperament(filteredAndOrdered, filteredTemperaments.value)
  }

  if (filteredOrigins.active) {
    filteredAndOrdered = filterByOrigin(filteredAndOrdered, filteredOrigins.value)
  }

  if (order.active) {
    if (order.type === "weight") {
      filteredAndOrdered = orderByWeight(filteredAndOrdered, order.value)
    } else {
      filteredAndOrdered = orderAlphabetically(filteredAndOrdered, order.value)
    }
  } 
  return filteredAndOrdered;

}
