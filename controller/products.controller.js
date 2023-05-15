const { response } = require('express');
const Products = require('../models/products');

const createProducts = async (req, res = response) =>{
    try {

        const { name,  price, description, quantity } = req.body || {};                   
       
        const product = new Products ({            
            name,
            price,
            description,
            quantity,
        });
        
         await product.save();
        
        console.log('new prod:',product);
        
        res.status(201).json({ 
            method: 'POST',
            product       
        });       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear los productos'
        });
    }
}


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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los productos'
        });
    }
}

const getProductById = async (req, res = response) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los productos por id'
        });
    }
}




const updateProducts = async (req, res = response) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar los productos'
        });
    }
}


const deleteProducts = async (req, res = response) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al eliminar los productos'
        });
    }
}





module.exports = { 
    getAllProducts,
    getProductById,
    createProducts,
    updateProducts,
    deleteProducts,
};