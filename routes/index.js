const express= require('express');
const router= express.Router();

console.log('Router loaded'); 

router.use('/users', require('./users'));

module.exports= router;