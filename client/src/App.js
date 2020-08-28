import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import AppRouter from './router/routes';
import AuthContext from './context';
import Spinner from './components/Spinner'
import {
  set_to_localstorage, get_from_localstorage
} from './actions/authActions';

const App = ({token, username, error, to_loc_store, from_loc_store}) => {
  const [ready, setReady] = useState(false);   
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const data = JSON.parse(localStorage.getItem('herrUser'));    
      if (data) await from_loc_store(data);  
      console.log(data);
      setReady(true);  
    })()
  }, []);
  useEffect(() => {
    if (token && username) {
      localStorage.setItem('herrUser', JSON.stringify({
        token, username,
      }));            
      to_loc_store();      
    }    
  }, [token, username]);  
  console.log(username);
  if (!ready) {
    return <Spinner />
  }
  return (         
    <Router history={history}>      
      <AppRouter user={username}/>
    </Router>         
  )
}
const mapStateToProps = (state) => {  
  return {
    token: state.userReducer.token,
    username: state.userReducer.herrUser,
    error: state.userReducer.error,
  }  
};
const mapDispatchToProps = (dispatch) => ({
  to_loc_store: () => dispatch(set_to_localstorage()),
  from_loc_store: (body) => dispatch(get_from_localstorage('/api/auth', 'POST', body))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

