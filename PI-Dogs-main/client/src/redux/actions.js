import { 
    GET_DOGS,
    GET_TEMPERAMENTS,
    PAGIN_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOG_BY_ID,
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
            type: GET_TEMPERAMENTS,
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
            if (!dogByName) {
                window.alert("No existen razas con ese nombre.")
            }
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogByName,
            })
        } catch (error) {
            window.alert(error.response.data.error);
        }
    }
}

// Esta action nos permite realizar la solicitud para buscar un dog por su id.
export const getDogById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`)
            const dogById = response.data;
            dispatch({
                type: GET_DOG_BY_ID,
                payload: dogById,
            })
        } catch (error) {
            Error(error.message)
        }
    }
}