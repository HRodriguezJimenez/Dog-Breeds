require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const { Temperaments } = require("../db");

const temperamentsDB = async (res, req) => {
    try {
        const infoApi = (await axios.get(URL)).data;

        infoApi.forEach((element) => {
            if (element.temperament) {
                const temperaments = element.temperament.split(',').map(temp => temp.trim());

                // Utilizamos un conjunto (Set) para evitar duplicados
                const uniqueTemperaments = new Set(temperaments);

                // Guardamos los temperamentos únicos en la base de datos
                uniqueTemperaments.forEach(async (temp) => {
                    await Temperaments.findOrCreate({
                        where: {
                            name: temp,
                        },
                    });
                });
            }
        });        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

temperamentsDB();

const getAllTemperaments = async () => {
    return await Temperaments.findAll({
        order: [['id', 'ASC']], // Ordenar por ID en orden ascendente
    });
};

module.exports = getAllTemperaments;
