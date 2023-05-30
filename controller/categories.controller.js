const { response, request } = require('express');

const Categories = require('../models/categories');

const createCategory = async (req, res = response) => {
    try {
        console.log(req.body);
      const { name, description } = req.body || {};
      const categories = new Categories({
        name,
        description
      }); 
      await categories.save(); 
      res.status(201).json({
        success: true,
        message: 'Categoria creada exitosamente',
        categories: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al crear la Categoria',
      });
    }
  };

const getAllCategories = async (req= request, res = response) => {
    try {            
      const query = {estado:true};
      const [total, categories] = await Promise.all([
        Categories.countDocuments(query),   
        Categories.find(query),              
      ]);  

      res.status(200).json({
        success: true,
        message: 'Se obtuvieron todas las categorias exitosamente',
        total: total,
        categories: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener las categorias',
      });
    }
}; 

const getCategoryById = async (req, res = response) => {
    try {
      const { id } = req.params;
      const categories = await Categories.findById(id);
  
      if (!categories) {
        return res.status(404).json({
          success: false,
          error: 'La categoria no fue encontrada',
        });
      }  
      res.status(200).json({
        success: true,
        message: 'Categoria obtenida correctamente',
        categories: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener la categoria por id',
      });
    }
  };

const updateCategory = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { _id, status, ...rest } = req.body;
  
      const categories = await Categories.findByIdAndUpdate(id, rest, { new: true });
  
      if (!categories) {
        return res.status(404).json({
          success: false,
          error: 'La categoria no fue encontrada',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Categoria fue actualizada correctamente',
        updatedCategory: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al actualizar la categoria',
      });
    }
  };

const deleteCategory = async (req, res = response) => {
    try {
      const { id } = req.params;
      const categories = await Categories.findByIdAndUpdate(id, { estado: false });
      
      if (!categories) {
        return res.status(404).json({
          success: false,
          error: 'La categoria no fue encontrada',
        });
      }    
      res.status(200).json({
        success: true,
        message: 'Categoria eliminada correctamente',
        deletedCategory: categories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar la categoria',
      });
    }
  };

module.exports = { 
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};