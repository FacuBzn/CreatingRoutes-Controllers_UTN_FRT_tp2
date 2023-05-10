const { Router } = require('express');
const { getAllProducts } = require('../controller/products.controller');

const router = Router();

router.get('/', getAllProducts );

module.exports = router;