const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields }= require('../middlewares/validate_fields');

const { loginUsers, createUsers} = require('../controller/users.controller');

const router = Router();

router.post('/register' , createUsers );

router.post('/login' , loginUsers );

module.exports = router;