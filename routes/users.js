const express= require('express');
const router= express.Router();

const usersController= require('../controllers/users_controller');
const auth= require('../config/auth');

router.get('/login', usersController.login);
router.get('/signup', usersController.signup);
router.post('/createUser', usersController.createUser);
router.post('/createToken', usersController.createToken);
router.get('/profile', auth, usersController.profile);
router.get('/logout', auth, usersController.logout);

module.exports= router;