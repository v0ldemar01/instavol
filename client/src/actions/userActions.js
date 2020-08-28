import * as types from './types';
import fetchData from './fetch';
const search = (data) => ({type: types.SEARCH, payload: data})
const error = (err) => ({type: types.ERROR, payload: err}) 
export const searchUser = (url, method, body, token) => {
  return async dispatch => {
    try {      
      const data = await fetchData(url, method, body, token);
      dispatch(search(data));
    } catch (err) {
      dispatch(error(err.message));
    }
  }  
}