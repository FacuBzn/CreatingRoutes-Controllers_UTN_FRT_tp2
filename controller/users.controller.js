const { response } = require('express');
const Users = require('../models/users');

const authUsers = async (req, res = response) => { // post request  
    try {
        res.status(200).json({
            method: 'POST',
            msg: "Login successful"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error in login'
        });
    }
}

const registerUsers = async (req, res = response) => { // post request  
    try {
        res.status(200).json({
            method: 'POST',
            msg: "register successful"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error in registration'
        });
    }
}


module.exports = { 
    authUsers,
    registerUsers
};