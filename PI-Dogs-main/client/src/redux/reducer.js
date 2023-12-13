import { GET_DOGS, GET_DOGS_BY_NAME, GET_TEMPERAMENTS, PAGIN_DOGS } from "./actionsTypes";

const initialState = {
    allDogs: [],
    allTempetaments: [],
    page: 1,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTempetaments: action.payload,
            }  

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                allDogs: action.payload,
                page: 1, // Reiniciamos la página a 1.
            }
    
        case PAGIN_DOGS:
            return {
                ...state,
                page: action.payload,
            };
    
        default:
            return { ...state };
    }
}


export default rootReducer;