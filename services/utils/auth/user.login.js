'use strict';
const utils = require('./login.utils');
const error = require('./error');
const dotenv = require('dotenv');  
const path = require('path');
//import config from 'config';
dotenv.config({ path: path.join(path.resolve('../../../'), '.env') });
exports.logIn = async (igClient, username, password) => {
  try {
    const result = await utils.hasActiveSession(igClient, username);
    const auth = result.isLoggedIn;
    let authenticatedUser = auth ? result.userInfo : null;    
    if (!auth) {
      console.log('Login');
      try {
        const userInfo = await utils.login(igClient, username, password, newAuth);
        authenticatedUser = userInfo;              
        console.log('In system');      
      } catch (err) {
        console.log(err)
        if (error.isCheckpointError(err)) {                                
          const body = await error.handleCheckpoint(err);
          console.log('CheckpointBody', body);                       
        } else if (error.isTwoFactorError(err)) {                    
          const userInfo = await error.handleTwoFactor(error);
          authenticatedUser = userInfo; 
          console.log('Success');                                 
        } else {
          console.log(error);
        }
      }          
    } else {
      console.log('Cookies have uploaded');
    }
    const inSystem = authenticatedUser ? true : false;
    return [ authenticatedUser, igClient, inSystem ];          
  } catch (err) {
    console.log(err);
  }    
};



// (async () => {
//     const { authenticatedUser, igClient } = await login(username, password);    
//     console.log(authenticatedUser);
//     // console.log('igClient', igClient);
//     // console.log(JSON.stringify(igClient.user));
//     //Dm.getChatList(igClient);
//     //const isSend = await Dm.broadcastDirectMessage('v0ldemar_01', '!!!!!')
//     //console.log(isSend);
// })()
