import { 
    GET_DOGS,
    GET_TEMPERAMETS,
    PAGIN_DOGS,
    GET_DOGS_BY_NAME,
} from "./actionsTypes";
import axios from "axios";

// Con esta action realizamos una solicitud a nuestro servidor para obtener todos los dogs.
export const getDogs = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs/");
        const allDogs = response.data;
        return dispatch({ // Despachamos la action con el resultado de la búsqueda en payload.
            type: GET_DOGS,
            payload: allDogs,
        })
    }
}

// Con esta action realizamos una solicitud a nuestro servidor para obtener todos los temperaments.
export const getTemperaments = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/temperaments/");
        const allTempetaments = response.data;
        return dispatch({
            type: GET_TEMPERAMETS,
            payload: allTempetaments,
        })
    }
}

// Con esta action controlamos la paginación de la app en el momento de mostrar los dogs. Recibe un valor que puede ser "next" o "prev", que determina si se debe avanazar o retroceder.
export const paginDogs = (value) => {
    return async function (dispatch, getState) {
        const state = getState(); // getState es una función que devuelve el estado actual del store. Nos permite acceder al estado actual antes de realizar los cambios.
        const { page, allDogs } = state;

        let newPage = page;

        if (value === "next" && page < Math.ceil(allDogs.length / 8)) {
            newPage += 1;
        } else if (value === "prev" && page > 1) {
            newPage -= 1;
        }

        dispatch({
            type: PAGIN_DOGS,
            payload: newPage,
        });
    }
};

// Action que nos permite realizar una solicitud al servidor de un dog en específico por su nombre.
export const getDogByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`)
            const dogByName = response.data;
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogByName,
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}