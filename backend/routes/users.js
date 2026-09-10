const express = require('express');
const router = express.Router();
const { getUsers, updateUser } = require('../controllers/usersController');

router.get('/', getUsers);
router.patch('/:id', updateUser);

module.exports = router;
