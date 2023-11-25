const getDogsHandler = (req, res) => {
    res.status(200).send("Aqui estan todos los perros.")
}

const getDetailHandler = (req, res) => {
    res.status(200).send("Detalle de un perro.")
}

const createDogHandler = (req, res) => {
    res.status(200).send("Aqui creamos un perro.")
}

module.exports = {
    getDogsHandler,
    getDetailHandler,
    createDogHandler,
}