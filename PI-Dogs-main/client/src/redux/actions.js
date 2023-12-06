import { GET_DOGS, GET_TEMPERAMETS } from "./actionsTypes";
import axios from "axios";

export const getDogs = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs/");
        const allDogs = response.data;
        console.log(allDogs);
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