require("dotenv").config()
const axios = require("axios")
const {Dog, Temperaments} = require("../db")
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

// Controller para solicitar todos los Dogs que provee la API.
const getAllDogs = async () => {

    const dataApi = (await axios.get(URL)).data;
    // Mapeamos la información que retorna la API.
    const dogsApi = dataApi.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        minHeight: parseInt(dog.height.metric.split("-")[0]), // accedemos a las propiedades del dog de la API, dividimos el resultado en un array, con la posición extraemos el valor que desamos para cada caso y convertimos el elemento resultante en un número.
        maxHeight: parseInt(dog.height.metric.split("-")[1]),
        minWeight: parseInt(dog.weight.metric.split("-")[0]),
        maxWeight: parseInt(dog.weight.metric.split("-")[1]),
        minLifeSpan: parseInt(dog.life_span.split("-")[0]),
        maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
        Temperaments: dog.temperament?.split(", "),
        created: false,
    }))

    // Obtenemos los Dogs de la base de datos incluyendo su vinculación con los temperamentos.
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

// Controller para buscar un Dog por el nombre.
const getDogByName = async (name) => {
    const allDogs = await getAllDogs(); // Usamos la función que nos trae todos los Dogs.
  
    const dogByName = allDogs.filter((dog) => {
      return dog.name.toLowerCase().includes(name.toLowerCase()); // Ignoramos mayúsculas y minúsculas.      
    });
  
    if (!dogByName.length) throw new Error(`There is no breed with the name: ${name}`);
  
    return dogByName;
};

//* Controller para buscar un Dog en especifico por su id.
const getDogById = async (id) => {
    const allDogs = await getAllDogs();

    const dogById = allDogs.filter((dog) => {
      return dog.id == id;
    });
  
    if (!dogById.length) throw new Error(`There is no race with the ID: ${id}`);
  
    return dogById;
}

// Controller para crear un Dog nuevo en la base de datos con la información que llega por body en la solicitud.
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

        const allDogs = await getAllDogs(); // Usamos la función para obtener todos los Dogs.

        // Realizamos una busqueda ignorando mayúsculas y minúsculas.
        const breedByName = allDogs.find((dog) => 
            dog.name.toLowerCase() === name.toLowerCase()
        );

        if (breedByName) {
            throw new Error(`The breed with the name already exists: ${name}`);
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

        // Función "add.temperaments" que crea sequelize automaticamente al crear la relación de varios a varios entre los dos models y nos permite crear la tabla intermedia.
        newDog.addTemperaments(temperaments);

        const dogDB = await Dog.findByPk(newDog.id);
        const temperamentsDogDB = await dogDB.getTemperaments() // Función que crea sequelize en el momento que creamos la relación muchos a muchos entre los modelos.
        const temperamentsByName = temperamentsDogDB.map((temp) => temp.name)

        return {...dogDB.toJSON(), temperaments: temperamentsByName } // "toJSON" es un método proporcionado por Sequelize que convierte un elemento en un objeto.
    }


module.exports = {
    getAllDogs,
    getDogById,
    getDogByName,
    createDogDB,
}