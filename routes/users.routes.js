const { Router } = require('express');
const { authUsers, registerUsers} = require('../controller/users.controller');

const router = Router();

router.post('/login' ,authUsers );

router.post('/register' ,registerUsers );

module.exports = router;