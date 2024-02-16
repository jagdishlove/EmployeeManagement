import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_FAILURE,
    FETCH_ALL_USERS_SUCCESS
} from '../actions/users/usersActionTypes'


const initialState = {
    usersData: [],
    usersDataLoading: false,
  };

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
     case FETCH_ALL_USERS_REQUEST:
        return {
          ...state,
          usersDataLoading: true,
        };
     case FETCH_ALL_USERS_SUCCESS:
        return {
            ...state,
            usersData: action.payload,
            usersDataLoading: false,
        };
     case FETCH_ALL_USERS_FAILURE:
        return{
            ...state,
            usersData: [],
            usersDataLoading: false,
        }
     default:
        return state;
    }
}

export default usersReducer;
