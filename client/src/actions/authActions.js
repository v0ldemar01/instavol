import * as types from './types';
import fetchData from './fetch';
const init = (data) => ({ type: types.LOGIN_INIT});
const initAuth = (data) => ({ type: types.LOGIN_INIT_AUTH});
const success = (data) => ({ type: types.LOGIN_SUCCESS, payload: data });
const failure = (err) => ({type: types.LOGIN_FAILURE, payload: err});
const fromLocalStore = (data) => ({
  type: types.GET_FROM_LOCALSTORAGE,
  payload: data,
})
export const exit = () => ({ type: types.LOGOUT });
export const auth = (url, method, body) => {
  return async dispatch => {    
    try {
      dispatch(init());
      const data = await fetchData(url, method, body, '');
      dispatch(success(data));      
    } catch (err) {
      dispatch(failure(err.message));
    }
  }
}
export const get_from_localstorage = (url, method, body) => {
  return async dispatch => {    
    try {      
      dispatch(initAuth());
      const data = await fetchData(url, method, body, '');
      dispatch(fromLocalStore(data));    
    } catch (err) {
      dispatch(failure(err.message));
    }
  }
};
export const set_to_localstorage = () => ({
  type: types.SET_TO_LOCALSTORAGE,  
});

