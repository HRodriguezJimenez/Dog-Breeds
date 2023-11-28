require("dotenv").config();
const axios = require("axios")
const {Dog, Temperament} = require("../db")
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const getAllDogs = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {attributes: []},
        }
    })

    const dataApi = (await axios.get(URL)).data;
    
    const dogsApi = dataApi.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        minHeight: parseInt(dog.height.metric.split("-")[0]),
        maxHeight: parseInt(dog.height.metric.split("-")[1]),
        minWeight: parseInt(dog.weight.metric.split("-")[0]),
        maxWeight: parseInt(dog.weight.metric.split("-")[1]),
        minLifeSpan: parseInt(dog.life_span.split("-")[0]),
        maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
        Temperaments: dog.temperament?.split(", "),
        breed_group: dog.breed_group,
        created: false,
    }))
    const allDogs = [...dogsDB, ...dogsApi]
    return allDogs;
}

const getDogByName = async (name) => {
    const allDogs = await getAllDogs();
  
    const breedByName = allDogs.filter((breed) => {
      return breed.name.toLowerCase().includes(name.toLowerCase());
      
    });
  
    if (!breedByName.length) throw new Error(`No existe la raza con el nombre: ${name}`);
  
    return breedByName;
  };

const getDogById = async (id) => {
    const allDogs = await getAllDogs();

    const breedById = allDogs.filter((breed) => {
      return breed.id == id;
    });
  
    if (!breedById.length) throw new Error(`No existe raza con el id: ${id}`);
  
    return breedById;
}

const createDogDB = async (
    image,
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span_min,
    life_span_max,
    temperaments,) => {
        return await Dog.create({
            image,
            name,
            weight_min,
            weight_max,
            height_min,
            height_max,
            life_span_min,
            life_span_max,
            temperaments,})
    }


module.exports = {
    getAllDogs,
    getDogById,
    getDogByName,
    createDogDB,
}