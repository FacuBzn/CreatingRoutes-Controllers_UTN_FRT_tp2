const { response, request } = require('express');

const Product = require('../models/products');

const createProduct = async (req, res = response) => {
    try {
      const { name, price, description, quantity, category} = req.body || {};
      const product = new Product({
        name,
        price,
        description,
        quantity,
        category: category,
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

const getAllProducts = async (req= request, res = response) => {
    try {            
      const query = {estado:true};
      const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).select("name price description category").sort({price: -1}).populate("category")
      ]);  

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
      const product = await Product.findById(id).populate("category");
  
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
  
      const product = await Product.findByIdAndUpdate(id, rest, { new: true }).populate("category");
  
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
      const product = await Product.findByIdAndUpdate(id, { estado: false }).populate("category");
      
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