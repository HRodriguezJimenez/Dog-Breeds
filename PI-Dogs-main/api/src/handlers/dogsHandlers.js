const {getAllDogs, getDogById, getDogByName, createDogDB} = require("../controllers/dogsControllers") // Requerimos los Controllers que son las funciones encargadas de solicitar la información. 
const validateCreate = require("../utils/functions") // Función para validar los datos que envian para crear un nuevo "dog".

// .query este Handler manejara la información dependiendo si viene algo por query(name) mostrara solo el que conincida con el "name" o todos los dogs si no envian nada por query.
const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    try { 
        if (name) {
            const dogByName = await getDogByName(name)
            res.status(200).json(dogByName) 
        } else {
            const allDogs = await getAllDogs()
            res.status(200).json(allDogs)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// .params Este Handler mostrara el detaller de un elemento buscando por su "id" especifico.
const getDetailHandler = async (req, res) => {
    const {id} = req.params;
    
    try {
        const response = await getDogById(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// .body Este Handler creara un nuevo "dog" con la información que envian en la solicitud por "body".
const createDogHandler = async (req, res) => {
    const {
        image,
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_span_min,
        life_span_max,
        temperaments,
    } = req.body
    
    try { // Creamos una función para que valide si la información que llega en el body es correcta.
        validateCreate({
            image,
            name,
            weight_min,
            weight_max,
            height_min,
            height_max,
            life_span_min,
            life_span_max
        });
        const newDog = await createDogDB(
            image,
            name,
            weight_min,
            weight_max,
            height_min,
            height_max,
            life_span_min,
            life_span_max,
            temperaments,)
        res.status(200).json(newDog)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDogsHandler,
    getDetailHandler,
    createDogHandler,
}