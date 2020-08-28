import * as types from '../../actions/types';

const initialState = {
  token: null,
  herrUser: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  searchElem: '',
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_INIT:
      case types.LOGIN_INIT_AUTH:  
      return {
        token: null,
        herrUser: null,
        isAuthenticated: false,
        error: null,   
        loading: true,    
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        herrUser: action.payload.username,
        isAuthenticated: true,
        loading: false,   
      }
    case types.LOGIN_FAILURE:      
      return {
        error: action.payload,
        loading: true, 
      }
    case types.ERROR: 
      return {
        ...state,
        error: action.payload,
        loading: true, 
      }
    case types.GET_FROM_LOCALSTORAGE:
      return {
        ...state,
        token: action.payload.token,
        herrUser: action.payload.username,
        isAuthenticated: true,
        loading: false, 
      }  
    case types.SET_TO_LOCALSTORAGE:
      return {
        ...state,         
      }   
    case types.LOGOUT:
      return {
        ...state,
        error: action.payload,
        token: null,
        herrUser: null,
        loading: false,
      }  
    case types.SEARCH:
      return {
        ...state,
        searchElem: action.payload,
      }   

    default:
      return state;
  }
}