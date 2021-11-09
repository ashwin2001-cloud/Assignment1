const express= require('express');
const router= express.Router();

const usersController= require('../controllers/users_controller');

router.get('/login', usersController.login);
router.get('/signup', usersController.signup);
router.post('/createUser', usersController.createUser);
router.post('/createToken', usersController.createUser);

module.exports= router;