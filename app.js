'use strict';
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const auth = require( './routes/auth.routes');
const user = require( './routes/user.routes');
dotenv.config({ path: path.join(path.resolve(), '.env') });
const app = express();
const PORT = process.env.PORT || 5000;
const dbUri = process.env.MONGO_URI;

app.use(express.json({ extended: true }));
app.use(morgan("dev"));

app.use('/api', auth);
app.use('/api', user);
(async () => {  
  try {
    await mongoose.connect(
      dbUri, { useNewUrlParser: true }
    )
    console.log('Succesfull connected to db');
    app.listen(PORT, () => {
      console.log('Server has started...', PORT);
    })
  } catch (e) {
    console.log(e)
  }
})()
