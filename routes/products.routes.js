const { Router } = require('express');
const { getAllProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../controller/products.controller');

const router = Router();

router.post('/', createProduct );

router.get('/', getAllProducts );

router.get('/:id', getProductById );

router.put('/:id', updateProduct );

router.delete('/:id', deleteProduct );

module.exports = router;