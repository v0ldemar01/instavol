'use strict';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');  
const path = require('path');
const HerrUser = require('../models/User.main');
dotenv.config({ path: path.join(path.resolve('../'), '.env') });

exports.requireAuth = async (req, res, next) => {
  let token;
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const { authorization } = req.headers;    
    if (authorization.startsWith('Bearer')) {
      token = authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'You must be logged In' })
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = payload;
    const user = await HerrUser.findOne({userId});
    console.log(user);
    if (!user) {
      res.status(401).json({ message: 'No user found for userId' });
    }
    //req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'You must be logged In' });
  }
}