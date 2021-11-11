const express= require('express');
const router= express.Router();

const usersController= require('../controllers/users_controller');
const auth= require('../config/auth');

const passport= require('passport');

router.get('/login', usersController.login);
router.get('/signup', usersController.signup);
router.post('/createUser', usersController.createUser);
router.post('/createToken', usersController.createToken);
router.get('/profile', auth, usersController.profile);
router.get('/logout', auth, usersController.logout);

router.get('/page1', auth, usersController.page1);
router.get('/page2', auth, usersController.page2);
router.get('/page3', auth, usersController.page3);

router.get('/userinfo', auth, usersController.userInfo);
router.get('/update', auth, usersController.update);
router.post('/updateUser', auth, usersController.updateUser);
router.get('/deleteAccount', auth, usersController.deleteAccount);

module.exports= router;