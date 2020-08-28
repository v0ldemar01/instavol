'use strict';
const utils = require('./login.utils');
const inquirer = require('inquirer'); 
const { IgCheckpointError, IgLoginTwoFactorRequiredError } = require('instagram-private-api');

exports.handleCheckpoint = () => {
    return new Promise((resolve, reject) => {
        startCheckpoint()
            .then((challenge) => {  
                getCode().then(({ code }) => {
                    console.log('code', code)
                    challenge.sendSecurityCode(code).then(resolve).catch(reject);
                });                          
            }).catch(reject);
    });
} 

const startCheckpoint = (igClient) => new Promise(resolve => {
    igClient.challenge.auto(true).then(() => {
        resolve(igClient.challenge);
    });
});


const getCode = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'code',
            message: 'Enter code',
        }
    ]);       
}

exports.handleTwoFactor = (error) => {
    return new Promise((resolve, reject) => {      
        const {username, totp_two_factor_on, two_factor_identifier} = error.response.body.two_factor_info;
        const verificationMethod = totp_two_factor_on ? '0' : '1';
        const trustThisDevice = '1';
        getCode().then(({ code }) => {
            console.log('code', code)
            utils.twoFactorLogin(
                username,
                code,
                two_factor_identifier,
                trustThisDevice,
                verificationMethod
            ).then(resolve).catch(reject);
        });        
    });
}

exports.isCheckpointError = error => (error instanceof IgCheckpointError);

exports.isTwoFactorError = error => (error instanceof IgLoginTwoFactorRequiredError);

