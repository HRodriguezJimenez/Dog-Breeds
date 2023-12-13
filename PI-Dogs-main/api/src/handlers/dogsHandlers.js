const {getAllDogs, getDogById, getDogByName, createDogDB} = require("../controllers/dogsControllers") // Requerimos los Controllers que son las funciones encargadas de solicitar la información. 
const validateCreate = require("../utils/functions") // Función para validar los datos que envian para crear un nuevo "dog".

// ".query" este Handler manejara la información dependiendo si viene algo por query(name) mostrara solo el que conincida con el "name" o todos los dogs si no envian nada por query.
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

// ".params" Este Handler mostrara el detalle de un elemento buscando por su "id" especifico.
const getDetailHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api"; // Creamos una validación que nos ayude a verificar si lo que viene es un Number o String.

    
    try {
        const response = await getDogById(id, source)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// ".body" Este Handler creara un nuevo dog con la información que envian en la solicitud por en el body.
const createDogHandler = async (req, res) => {
    const {
      name,
      image,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minLifeSpan,
      maxLifeSpan,
      temperaments,
    } = req.body
    
    try { // Creamos una función para que valide si la información que llega en el body es correcta.
        validateCreate({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
      
        });
        const newDog = await createDogDB(
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
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