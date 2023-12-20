import { 
    GET_DOGS,
    GET_TEMPERAMENTS,
    PAGIN_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOG_BY_ID,
    FILTER_BY_TEMPERAMENT,
    FILTERED_BY_ORIGIN,
    DOGS_FILTERED_ALPHABETICALLY,
    DOGS_FILTERED_BY_WEIGHT,
    SORTED_AND_FILTERED,
} from "./actionsTypes";

import { handleAsyncError } from "./utilsRedux/handleAsyncError";

import dogsSortedAndFiltered from "./utilsRedux/filterAndSortFunctions"

import axios from "axios";

// Con esta action realizamos una solicitud a nuestro servidor para obtener todos los dogs.
export const getDogs = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/dogs/");
            const allDogs = response.data;
            dispatch({ // Despachamos la action con el resultado de la búsqueda en payload.
                type: GET_DOGS,
                payload: allDogs,
            })
        } catch (error) {
            handleAsyncError(error)
        }
    }
}

// Con esta action realizamos una solicitud a nuestro servidor para obtener todos los temperaments.
export const getTemperaments = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/temperaments/");
            const allTemperaments = response.data.map((temp) => ({
                id: temp.id,
                name: temp.name,
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: allTemperaments,
            })
        } catch (error) {
            handleAsyncError(error)
        }
    }
}

// Con esta action controlamos la paginación de la app en el momento de mostrar los dogs. Recibe un valor que puede ser "next" o "prev", que determina si se debe avanazar o retroceder.
export const paginDogs = (value) => {
    return async function (dispatch, getState) {
        try {
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
        } catch (error) {
            handleAsyncError(error)
        }
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
            handleAsyncError(error)
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
            handleAsyncError(error)
        }
    }
}


export const filterByTemperaments = (value) => {
    return function (dispatch) {
        dispatch({
            type: FILTER_BY_TEMPERAMENT,
            payload: value,
        })
    }
}

export const filteredByOrigin = (value) => {
    return function (dispatch) {
        dispatch({
            type: FILTERED_BY_ORIGIN,
            payload: value,
        })
    }
}

export const dogsFilteredAlphabetically = (value) => {
    return function (dispatch) {
        dispatch({
            type: DOGS_FILTERED_ALPHABETICALLY,
            payload: value,
        })
    }
}

export const dogsFilteredByWeight = (value) => {
    return function (dispatch) {
        dispatch({
            type: DOGS_FILTERED_BY_WEIGHT,
            payload: value,
        })
    }
}

export const sortedAndFiltered = (configs) => {
    return function (dispatch, getState) {
        const state = getState(); // Obtén el estado actual del store
        const allDogs = state.allDogs; // Asegúrate de que allDogs no sea undefined

        // Llama a la función dogsSortedAndFiltered con los datos necesarios
        
        const filteredAndOrdered = dogsSortedAndFiltered(allDogs, configs);

        // Despacha la acción con los datos procesados
        dispatch({
            type: SORTED_AND_FILTERED,
            payload: filteredAndOrdered,
            configs: configs,
        });
    }
}
