const { model, Schema, mongoose} = require('mongoose');

const CategoriesSchema = new mongoose.Schema ({

    name : {
        type:String,
        required: [true,"The field category is required"]
    },            
    description:{
        type:String
    },                   
    estado: {
        type: Boolean,        
        default: true
    }    
})


const Categories = mongoose.model('Categories', CategoriesSchema);
module.exports = Categories ;