const { model, Schema} = require('mongoose');

const ProductSchema = Schema ({

    name :{
        type: String,
    },
    price:{
        type: Number,
        
    },
    description:{
        type:String,        
    },
    quantity: {
        type: Number,
        
    },
    

})

ProductSchema.methods.toJSON = function(){ // funcion que sirve para esconder parametros que estan en un json para que no aparezcan
    const {__v, ...product } = this.toObject();
    return product;
}

module.exports = model ( 'Product', ProductSchema);
   