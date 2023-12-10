require("dotenv").config();
const axios = require("axios")
const {Dog, Temperaments} = require("../db")
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const getAllDogs = async () => {

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
        created: false,
    }))

    const dogsDB = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: {attributes: []},
        }
    })

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
    name,
    image,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLifeSpan,
    maxLifeSpan,
    temperaments,) => {

        const allDogs = await getAllDogs();

        const breedByName = allDogs.find((dog) => 
            dog.name.toLowerCase() === name.toLowerCase()
        );

        if (breedByName) {
            throw new Error(`Ya existe la raza con el nombre: ${name}`);
        }    
        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
        })

        newDog.addTemperaments(temperaments)

        const dogDB = await Dog.findByPk(newDog.id)
        const temperamentsDogDB = await dogDB.getTemperaments() // Función que crea sequelize en el momento que creamos la relación muchos a muchos entre los modelos.
        const temperamentsByName = temperamentsDogDB.map((temp) => temp.name)

        return {...dogDB.toJSON(), temperaments: temperamentsByName }
    }


module.exports = {
    getAllDogs,
    getDogById,
    getDogByName,
    createDogDB,
}