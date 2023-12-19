import { 
    GET_DOGS, 
    GET_DOGS_BY_NAME, 
    GET_TEMPERAMENTS, 
    PAGIN_DOGS, 
    GET_DOG_BY_ID,
    SORTED_AND_FILTERED
} from "./actionsTypes";

//import dogsSortedAndFiltered from "./utilsRedux/filterAndSortFunctions";

const initialState = {
    allDogs: [],
    allTemperaments: [],
    dogById: [],
    dogByName: [],
    page: 1,
    sortedAndFiltered: [],
    configs: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                sortedAndFiltered: action.payload,
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload,
            }  

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                sortedAndFiltered: action.payload,
                page: 1, // Reiniciamos la página a 1.
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                dogById: action.payload,
            }
    
        case PAGIN_DOGS:
            return {
                ...state,
                page: action.payload,
            };

        case SORTED_AND_FILTERED:
            return {
                ...state,
                sortedAndFiltered: action.payload,
                configs: action.configs,
            }
    
        default:
            return { ...state };
    }
}


export default rootReducer;