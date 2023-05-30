const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/generate_jwt');

const User = require('../models/users');

const createUsers = async (req, res = response) => { // post request  
    try {

        const { nameUser, email, password } = req.body  //nombres que yo quiero sacar y grabar solamente 
        const user = new User({nameUser, email, password});  //estos son los campos que deseo guardar en mongodb
    
        //encrypt password 
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //save to Database
    
        await user.save();

        res.status(200).json({            
            method: 'POST',
            msg: "successful user registration",
            user: user
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error registering user'
        });
    }
}

const loginUsers = async (req, res = response) => { // post request  
    const {email, password} = req.body;

    try {
        //Check if email exists
        const user = await User.findOne({email});
        if ( !user ) {
            return res.status(404).json({
                message: 'User / Password they are not correct'
            });
        }
        //Check if the user is active
        if ( !user.statusUser ) {
            return res.status(400).json({ 
                message: 'User / Password they are not correct - Status User: false '
            });
        }
        //Check if the password 
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ){
            return res.status(400).json({ 
                message: 'User / Password they are not correct - password '
            });
        }
        //Generate a jwt
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login successful',
            user,
            token            
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Invalid login, call the admin'});
    }   
}

module.exports = { 
    createUsers,
    loginUsers,
};