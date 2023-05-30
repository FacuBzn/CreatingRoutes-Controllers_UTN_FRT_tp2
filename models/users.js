const { model, Schema, mongoose} = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    nameUser:{
        type: String,
        required: [true, ' the name of the user is required']
    },
    email:{
        type: String,
        required: [true, ' the email is required'],
        unique: true        
    },
    password:{
        type: String,
        required: [true, ' the password is required'],        
    },
    statusUser:{
        type: Boolean,    
        default: true,
    }

})

UserSchema.methods.toJSON = function(){
    const { __v, _id, password ,... user }=this.toObject();
        user.uid = _id;
    return user;
}

const User = mongoose.model('User', UserSchema);
module.exports = User ;
