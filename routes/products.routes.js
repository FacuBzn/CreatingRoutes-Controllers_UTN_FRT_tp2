const { Router } = require('express');
const { getAllProducts, createProducts,getProductById,deleteProducts,updateProducts } = require('../controller/products.controller');

const router = Router();

router.post('/', createProducts );

router.get('/', getAllProducts );

router.get('/:id', getProductById );

router.put('/:id', updateProducts );

router.delete('/:id', deleteProducts );

module.exports = router;