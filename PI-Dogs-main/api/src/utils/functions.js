const validateCreate = ({
    image,
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span_min,
    life_span_max
}) => {
    if (!image ||
        !name ||
        !weight_min ||
        !weight_max ||
        !height_min ||
        !height_max ||
        !life_span_min ||
        !life_span_max) {
        throw new Error("Faltan datos para completar la creación.");
    } 
    if (weight_min < 0 || weight_max > 100) {
        throw new Error("Ingrese un número entre 1 - 100.");
    } 
    if (
        weight_max > 100 ||
        height_max > 100
    ) {
        throw new Error("El número no puede ser mayor a 100.");
    } 
    if (life_span_max > 20) {
        throw new Error("El número no puede ser mayor a 20.");
    }
};

module.exports = validateCreate;