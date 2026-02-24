const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for /api/users
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

// New Login Route for regular admins
router.post('/login', userController.loginUser);

module.exports = router;