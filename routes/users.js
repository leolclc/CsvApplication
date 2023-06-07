const express = require('express');
const { searchUsers } = require('../controllers/usersController');

const router = express.Router();

router.get('/', searchUsers);

module.exports = router;