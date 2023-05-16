const { response } = require('express');
const Product = require('../models/products');

const createProduct = async (req, res = response) => {
    try {
      const { name, price, description, quantity } = req.body || {};
      const product = new Product({
        name,
        price,
        description,
        quantity,
      }); 
      await product.save(); 
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al crear el producto',
      });
    }
  };
  


const getAllProducts = async (req, res = response) => {
    try {
      const products = await Product.find();
      const total = await Product.countDocuments();
  
      res.status(200).json({
        success: true,
        message: 'Se obtuvieron todos los productos exitosamente',
        total: total,
        products: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener los productos',
      });
    }
};
  

const getProductById = async (req, res = response) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'El producto no fue encontrado',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Producto obtenido correctamente',
        product: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener los productos por id',
      });
    }
  };
  


const updateProduct = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { _id, status, ...rest } = req.body;
  
      const product = await Product.findByIdAndUpdate(id, rest, { new: true });
  
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'El producto no fue encontrado',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Producto actualizado correctamente',
        updatedProduct: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al actualizar los productos',
      });
    }
  };


const deleteProduct = async (req, res = response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, { estado: false });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'El producto no fue encontrado',
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente',
        deletedProduct: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar el producto',
      });
    }
  };


module.exports = { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};