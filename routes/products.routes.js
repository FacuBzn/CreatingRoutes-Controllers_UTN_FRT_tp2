const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields }= require('../middlewares/validate_fields');
const { validateJWT }= require('../middlewares/validate_jwt');

const { getAllProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../controller/products.controller');

const router = Router();

router.post('/', [
    validateJWT,
],createProduct );

router.get('/',[
    validateJWT,
], getAllProducts );

router.get('/:id',[
    check('id','It is not a valid id').isMongoId(),
    validateFields
], getProductById );

router.put('/:id',[
    validateJWT,
    check('id','It is not a valid id').isMongoId(),
    validateFields
], updateProduct );

router.delete('/:id',[
    validateJWT,
    check('id','It is not a valid id').isMongoId(),
    validateFields
], deleteProduct );

module.exports = router;