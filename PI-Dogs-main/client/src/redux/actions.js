import { 
    GET_DOGS,
    GET_TEMPERAMETS,
    PAGIN_DOGS,
    GET_DOGS_BY_NAME,
} from "./actionsTypes";
import axios from "axios";

export const getDogs = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs/");
        const allDogs = response.data;
        return dispatch({
            type: GET_DOGS,
            payload: allDogs,
        })
    }
}

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

export const paginDogs = (value) => {
    return async function (dispatch, getState) {
        const state = getState();
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

export const getDogByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`)
            const dogByName = response.data;
            console.log(dogByName);
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogByName,
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}