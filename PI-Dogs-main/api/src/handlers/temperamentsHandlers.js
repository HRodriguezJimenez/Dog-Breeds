const getTemperamentsHandler = (req, res) => {
    res.status(200).send("Aqui se encuentran todos los temperaments.")
}

module.exports = getTemperamentsHandler;