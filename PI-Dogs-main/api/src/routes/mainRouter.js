const { Router } = require('express'); // Método de express que nos permite manejar el enrutado del servidor.
const dogsRouter = require("./dogsRouter");
const temperamentsRouter = require("./temperamentsRouter")


const mainRouter = Router();

mainRouter.use("/dogs", dogsRouter)
mainRouter.use("/temperaments", temperamentsRouter)



module.exports = mainRouter;
