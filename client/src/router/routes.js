import React, {useEffect} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import TypeRoute from './routeWrap';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DirectPage from '../pages/DirectPage';
import UserProfile from '../pages/ProfilePage';
const AppRouter = ({user}) => (
  <Switch>  
    <Route path='/signin' component={AuthPage} user={user} isPrivate={false} exact  />
    
    <TypeRoute path='/direct' component={DirectPage} user={user} isPrivate={true} exact  />
    <TypeRoute path='/' component={HomePage} user={user} isPrivate={true} exact  />
    <TypeRoute path="/profile/:username" component={UserProfile} isPrivate={true} user={user} />
  </Switch>
); 

export default AppRouter;
