'use strict';
const express = require('express');
const {requireAuth} = require('../middleware/requireAuth');
const {searchUsers} = require('../controllers/user.controller')
const router = express.Router();

router.post('/searchUsers', requireAuth, searchUsers);
module.exports = router;