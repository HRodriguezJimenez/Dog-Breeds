const {getAllDogs, getDogById, getDogByName, createDogDB} = require("../controllers/dogsControllers")
const validateCreate = require("../utils/functions")

// .query
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

const getDetailHandler = async (req, res) => {
    const {id} = req.params;
    
    try {
        const response = await getDogById(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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
    
    try {
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