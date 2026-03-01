const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public — no token needed
router.post('/login', userController.loginUser);

// Protected — must be logged in
router.get('/',            auth, userController.getUsers);
router.post('/',           auth, userController.createUser);
router.delete('/:id',      auth, userController.deleteUser);
router.patch('/:id/toggle', auth, userController.toggleStatus);

module.exports = router;