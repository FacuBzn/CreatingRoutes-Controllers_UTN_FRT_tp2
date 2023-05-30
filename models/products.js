const { model, Schema, mongoose} = require('mongoose');
const Category = require('../models/categories');

const ProductSchema = new mongoose.Schema ({

    name : {
        type:String,
        required: [true,"The field name is required"]
    },  

    price: {
        type:Number,
        min: [0, "The value of the field must be more than 0"]
    }, 

    code: {
        type:Number
    },  

    fav: {
        type:Boolean,
        default: false
    },  

    description:{
        type:String
    },

    category:  {
        type: mongoose.Schema.ObjectId,
        ref:"Categories"
    },

    estado: {
        type: Boolean,        
        default: true
    }    
})

ProductSchema.methods.toJSON = function(){ // funcion que sirve para esconder parametros que estan en un json para que no aparezcan
    const {__v, ...product } = this.toObject();
    return product;
}

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product ;
   