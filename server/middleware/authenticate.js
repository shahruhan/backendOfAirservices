const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Customer = require('../models/customerSchema');

const Authenticate = async (req, res, next) => {
  
    try{

        const token = req.cookies.jwtoken;        

        const varifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: varifyToken._id, "tokens.token" : token });

        if(!rootUser) {throw new Error('User not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        // ____________________________Customer Data_____________________________

        const rootCustomer = await Customer.find().sort({
            "date": -1
        });;

        if(!rootCustomer) {throw new Error('Customer not found')}

        req.rootCustomer = rootCustomer;
        req.CustomerID = rootCustomer._id;

        next();

    }catch (err) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(err);
    }
}

module.exports = Authenticate;
