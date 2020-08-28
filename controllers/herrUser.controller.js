'use strict';
const HerrUser = require('../models/User.main');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(path.resolve('../'), '.env') });
const UserService = require('../services/insta.services');

exports.loginHerrUser = async (req, res) => {
  const {username, password} = req.body;  
  if (!username.trim() || !password.trim()) {
    res.status(400).send({
      message: 'Username and Password required!',
    });
    return;
  }
  console.log(username, password);
  try {
    let user = await HerrUser.findOne({ username }).select('+password');
    console.log(user);
    console.log(username, password);   
    await UserService.login(username, password, true);
    if (!UserService.checkAuth) {
      return res.status(401).json({error:"Invalid Email or password"});
    }  
    if (!user) {
      console.log('The new user' );      
      user = new HerrUser({
        username,
        password,
        userId: UserService.userId
      });
      await user.save();
    } else {
      const isMatch = await user.comparePassword(password, user.password);
      if (!isMatch) {
        user.password = password;
        await user.save();
      }
    }    
    const token = jwt.sign({ 
      userId: UserService.userId 
    }, process.env.JWT_SECRET, {
      expiresIn: '24h', // expires in 24 hours
    });
    res.status(200).json({
      username,
      token
    });
  } catch (err) {
    res.status(500).json({            
        message: err.message || 'Login failed!',
    });
  }
}
exports.authHerrUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await HerrUser.findOne({ username });
  if (!user) {
    return res.status(204).json({message: 'cookies not found'});
  }
  await UserService.login(username, 'password');
  const token = jwt.sign({ 
    userId: UserService.userId 
  }, process.env.JWT_SECRET, {
    expiresIn: '24h', // expires in 24 hours
  });
  res.status(200).json({
    username,
    token
  });
  } catch (err) {
    res.status(500).json({            
      message: err.message || 'Auth failed!',
  });
  }
  
}