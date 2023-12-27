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
        throw new Error("You must complete all required information");
    }

    if (minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0) {
        throw new Error("Height, weight or life span cannot be a negative number.");
    }

    if (minHeight >= maxHeight) {
        throw new Error("The minimum height is greater than or equal to the maximum height, please validate the data");
    }

    if (minWeight >= maxWeight) {
        throw new Error("The minimum weight is greater than or equal to the maximum weight, please validate the data");
    }

    if (minLifeSpan >= maxLifeSpan) {
        throw new Error("The minimum life span is greater than or equal to the maximum life span, please validate the data");
    }
};

module.exports = validateCreate;
  