const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields }= require('../middlewares/validate_fields');
const {validateJWT} = require('../middlewares/validate_jwt');

const { loginUsers, createUsers} = require('../controller/users.controller');

const router = Router();

router.post('/register' , createUsers );

router.post('/login' ,[
    check('email', 'the email entered is not valid').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
    validateFields
], loginUsers );

module.exports = router;