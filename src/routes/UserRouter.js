const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// router.post('/sign-up', userController.createUser);
router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/search/', userController.searchUserByName);
router.get('/get-user', userController.getAllUsers);
router.get('/get-user/:id', userController.getUserById);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
//
router.get('/all-province', userController.getProvince);
router.get('/all-district/:id', userController.getDistrict);

module.exports = router;
