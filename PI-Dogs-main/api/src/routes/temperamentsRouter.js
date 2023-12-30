const { Router } = require("express");
const getTemperamentsHandler = require("../handlers/temperamentsHandlers"); //Solicitamos el Handler que maneja la información.


const temperamentsRouter = Router()

temperamentsRouter.get("/", getTemperamentsHandler)

module.exports = temperamentsRouter;