import { GET_DOGS, GET_TEMPERAMETS, PAGIN_DOGS } from "./actionsTypes";

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

        case GET_TEMPERAMETS:
            return {
                ...state,
                allTempetaments: action.payload,
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