'use strict';
const path = require('path');
const { readFile, writeFile, readdir, unlinkSync, mkdirSync, existsSync } = require('fs');
const { promisify } = require('util');
const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const storagePath = function() {
  const storePath = path.join(path.resolve(), 'session-cookie');
  if (!existsSync(storePath)) {
    mkdirSync(storePath);
  }
  return storePath;
};
  
exports.storeLoggedInSession = (igClient, username) => new Promise(resolve => { //
    igClient.state.serialize().then(cookies => {
        console.log('Store cookies');
        delete cookies.constants;
        storeCookies(username, cookies);
        resolve();
    });
});
 
exports.clearCookieFiles =  () => {
    const storePath = storagePath();
    if (existsSync(storePath)) {
        readdirAsync(storePath).then(filenames => filenames.forEach(filename => {
            unlinkSync(`${storePath}/${filename}`);
        }));
    }
};

exports.loadCookieInSession = (igClient, username) => new Promise((resolve, reject) => { //
    getStoredCookie(username).then(savedCookie => {    
        console.log('Get cookie');
        if (savedCookie) {      
        igClient.state.deserialize(savedCookie).then(() => {
            resolve(true);        
        }).catch(reject);
        } else {
        console.log('No session saved');
        resolve(false);
        }
    }).catch(err => {
        console.log('Error', err);
    });
});

const getStoredCookie = username => {
    console.log(username);
    const storePath = storagePath();
    const filePath = `${username}.json`;
    const cookiepath = `${storePath}/${filePath}`;
    console.log(cookiepath);
    if (!existsSync(cookiepath)) {
      console.log('No cookies');
      return new Promise(resolve => resolve(false));
    }
    return readFileAsync(cookiepath, 'utf8');
};  
  
const storeCookies = (username, cookies) => {
    const storePath = storagePath();
    const filePath = `${username}.json`;  
    return writeFileAsync(`${storePath}/${filePath}`, JSON.stringify(cookies));
};
  
