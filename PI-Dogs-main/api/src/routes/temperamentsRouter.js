const { Router } = require("express");
const getTemperamentsHandler = require("../handlers/temperamentsHandlers"); // solicitamos el Handler para que maneja la información.


const temperamentsRouter = Router()

temperamentsRouter.get("/", getTemperamentsHandler)

module.exports = temperamentsRouter;