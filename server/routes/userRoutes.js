const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.loginUser);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id/toggle', userController.toggleStatus);

module.exports = router;