// Función que usamos para validar los datos que vienen en la solicitud para crear un nuevo Dog y agregarlo en la base de datos.

const validateCreate = ({
    name,
    image,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLifeSpan,
    maxLifeSpan,
    }) => {
    if (!name || !image || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan) {
        throw new Error("Debe completar toda la información requerida");
    }

    if (minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0) {
        throw new Error("La altura, el peso o la espectativa de vida no pueden ser números negativos..");
    }

    if (minHeight >= maxHeight) {
        throw new Error("La altura mínima es mayor o igual a la altura máxima, por favor valide los datos.");
    }

    if (minWeight >= maxWeight) {
        throw new Error("El peso mínimo es mayor o igual al peso máximo, por favor valide los datos");
    }

    if (minLifeSpan >= maxLifeSpan) {
        throw new Error("La expectativa de vida mínima es mayor o igual a la expectativa de vida máxima, por favor valide los datos.");
    }
};

module.exports = validateCreate;
  