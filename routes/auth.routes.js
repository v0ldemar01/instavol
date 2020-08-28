'use strict';
const express = require('express');
const { loginHerrUser,  authHerrUser} = require('../controllers/herrUser.controller');
const router = express.Router();

router.post('/signin', loginHerrUser);
router.post('/auth', authHerrUser);
module.exports = router;