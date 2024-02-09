import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_FAILURE,
    FETCH_ALL_USERS_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS
} from '../../actions/AdminConsoleAction/users/usersActionTypes';


const initialState = {
    usersData: [],
    usersDataLoading: false,
    userByIdData : {}
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
     case GET_USER_BY_ID_REQUEST : 
        return {
            ...state
        };
     case GET_USER_BY_ID_SUCCESS : 
        return {
            ...state,
            userByIdData: action.payload,
        };
     case GET_USER_BY_ID_FAILURE : 
        return {
            ...state
        }
     default:
        return state;
    }
}

export default usersReducer;
