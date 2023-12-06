import { GET_DOGS, GET_TEMPERAMETS } from "./actionsTypes";

const initialState = {allDogs: [], allTempetaments: []}

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
    
        default:
            return { ...state };
    }
}


export default rootReducer;