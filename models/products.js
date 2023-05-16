const { model, Schema, mongoose} = require('mongoose');

const ProductSchema = new mongoose.Schema ({

    name : {type:String},
    
    price: {type:Number},
            
    description:{type:String},        
   
    quantity:  {type:Number},
          
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
   