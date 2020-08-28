import {useState, useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

// export const useAuth = () => {
//     const storageName = 'userData';
//     const [token, setToken] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const dispatch = useDispatch();
//     const login = useCallback((jwtToken, pk) => {
//         setToken(jwtToken);
//         setUserId(pk);
//         console.log('pk', pk);
//         dispatch(set_to_localstorage());
//         localStorage.setItem(storageName, JSON.stringify({
//             jwtToken, userId: pk,
//         }));
//     }, []);
//     const logout = useCallback(() => {        
//         localStorage.removeItem()
//     }, []);
//     useEffect(() => {
//         const data = JSON.parse(localStorage.getItem(storageName));
//         if (data && data.token) {
//             dispatch(get_from_localstorage(data));
//             login(data.token, data.userId)
//         }
//     }, [login]);
//     return {login, logout, token, userId};
// }
export const useAuth = (from_loc_store, to_loc_store, token, user) => {
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    console.log('data', data);
    if (data) from_loc_store(data);
  }, []);
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('userData', JSON.stringify({
        token, user,
      }));
      to_loc_store();
    }    
  }, [token, user]);
}  