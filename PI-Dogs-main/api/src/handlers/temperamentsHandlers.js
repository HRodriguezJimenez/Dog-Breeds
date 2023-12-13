const getAllTemperaments = require("../controllers/temperamentsController"); // Requerimos el controller encargado de solicitar la información.

const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getAllTemperaments()
        res.status(200).json(temperaments)
    } catch (error) {
        res.status(400).json({error: error.mesagge})
    }
}

module.exports = getTemperamentsHandler;