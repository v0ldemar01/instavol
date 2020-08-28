'use strict';
const cookies= require('./cookies');

exports.hasActiveSession = (igClient, username) => new Promise(resolve => {
  cookies.loadCookieInSession(igClient, username)
    .then(isLoaded => {      
      if (isLoaded) {
        const userId = igClient.state.cookieUserId;       
        igClient.user.info(userId)
          .then(userInfo => {
            resolve({ isLoggedIn: true, userInfo});
          });
      } else {        
        resolve({ isLoggedIn: false});
      }
    }).catch((err) => {       
      console.log(err)    
      resolve({ isLoggedIn: false });
    });
});


exports.login = function(igClient, username, password, newAuth = false) {
  return new Promise((resolve, reject) => {
    if (newAuth) cookies.clearCookieFiles();    
    igClient.state.generateDevice(username);
    igClient.simulate.preLoginFlow()
      .then(() => {
        igClient.account.login(username, password)
          .then(userData => {
            cookies.storeLoggedInSession(igClient, username)
              .then(() => {                
                resolve(userData);
                console.log('Succesful');
              });
          }).catch(reject);
      });
  });
};

exports.twoFactorLogin = function(igClient, username, code, twoFactorIdentifier, trustThisDevice, verificationMethod) {
  return new Promise((resolve, reject) => {
    igClient.account.twoFactorLogin({
      username,
      verificationCode: code,
      twoFactorIdentifier,
      verificationMethod,
      trustThisDevice,
    }).then(twoFactorResponse => {
      cookies.storeLoggedInSession(username).then(() => {
        const userId = twoFactorResponse.logged_in_user.pk;
        igClient.user.info(userId).then(resolve).catch(reject);
      });
    }).catch(reject);
  });
};

exports.logOut = function(igClient) {
  igClient.account.logout();
  //cookies.clearCookieFiles();
};


