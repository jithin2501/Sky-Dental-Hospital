const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
// ADD THIS LINE
router.patch('/:id/toggle', userController.toggleStatus);

module.exports = router;