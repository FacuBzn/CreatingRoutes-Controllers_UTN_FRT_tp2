const { response } = require('express');
const Products = require('../models/products');


const getAllProducts = async (req, res = response) => { // get request all users         
    
    try {           
        const products = [
            {
                "name":"iphone 12",
                "description":"Cellphone with camera",
                "price": 980
            },
            {
                "name":"samsung pockets",
                "description":"Cellphone with camera",
                "price": 450
            },
            {
                "name":"xiaomi Mi A3",
                "description":"Cellphone with camera",
                "price": 880
            },
            {
                "name":"Motorola X ",
                "description":"Cellphone with camera",
                "price": 690
            }
        ]   

        res.status(200).json({
            method: 'GET',
            msg: 'this is all the products',
            products
        });        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error al obtener los productos'
        });
    }
}

module.exports = { 
    getAllProducts,
};