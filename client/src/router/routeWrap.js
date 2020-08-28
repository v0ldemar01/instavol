import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
const TypeRoute = ({component: Component, user, isPrivate, ...rest}) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        console.log(user);
        return (
          user ? (
            <>
              <Navbar />
              <Component {...props}/>
            </>          
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location }  
            }} />
          )
        )
               
      }}
    />
  )
}
const mapStateToProps = (state) => {  
  return {    
    user: state.userReducer.herrUser,
  }  
};
export default connect(mapStateToProps)(TypeRoute);
