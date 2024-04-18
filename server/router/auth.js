const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const authenticate = require('../middleware/authenticate');
// const authenticateCustomer = require('../middleware/authenticateCustomer');
const multer = require('multer');
const path = require('path');


require('../db/conn');
const User = require('../models/userSchema');
const Customer = require('../models/customerSchema');

router.use(bodyParser.json());

const {promisify} = require('util');
const fs = require('fs/promises');
const unlinkProm = promisify(fs.unlink);


router.get('/', (req, res) =>{
  res.send("Hello");
});

 
//------- Admin Registration Module-----------

router.post('/admin_register', async (req, res) =>{

  const { name, email, contact, password, conPassword} = req.body;

  if(!name || !email || !contact || !password || !conPassword){
    return res.status(421).json(421);
  }

  try {
    const userExist = await User.findOne({ email: email});
      if(userExist){
        return res.status(422).json(422);
      }else if( password != conPassword){
        return res.status(423).json(423);
      }else{

        const user = new User({name, email, contact, password, conPassword, users: 'senior admin', status: 'active'});
        await user.save();
      
            res.status(201).json(201);
      }      

  } catch (err) {
    console.log(err);
  }
  
});


// ----------Admin login Module-------------

router.post('/admin_Signin', async (req, res) => {
  try{
      const { email, password} = req.body;

      if ( !email || !password){ 
        return res.status(400).json(400);
      } else{

        const userLogin = await User.findOne({ email: email});

        if(userLogin){

        const isMatch = await bcrypt.compare( password, userLogin.password);

        let token = await userLogin.generateAuthToken();

        res.cookie('jwtoken' ,token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure:  true,
        });
        
          if ( !isMatch ){
            res.status(401).json(401);
          } else{
            res.status(200).json({ message: "User Signin successfully!"});
          }

      }else {
          res.status(401).json(401);
      }

      }
      
  } catch (err) {
    console.log(err);
  }
});


// -----------------DASHBOARD Module-------------------
router.get('/dashboard', authenticate, (req, res) =>{
  const {rootUser,rootCustomer} = req;
  res.send({rootUser,rootCustomer});
});


// *************************************** CUSTOMER DATA CRUDS **************************************

// get customer data for all pages
router.get('/getdata', authenticate, (req, res) =>{
  res.send(req.rootUser);
});

// Add customer data
router.post('/add_customer', async (req, res) =>{

  const { c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
          c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
          c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate
        } = req.body;
        

  if(!c_name || !c_contact || !c_gender || !c_address || !c_relation || !c_details || !c_nights || !c_passport || !c_packagePrices || !c_transaction || !c_blanceAmount){
    return res.status(422).json(422);
  }else{

  try {
    const customerExist = await Customer.findOne({ c_name: c_name, c_contact: c_contact});
      if(customerExist){
        return res.status(423).json(423);
      }
      else{

        const customer = new Customer({c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
          c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
          c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate});
        await customer.save();
      
            res.status(201).json({ message: "customer added successfully"});
      }      

  } catch (err) {
    console.log(err);
  }
}
});

// Customer Info table Authenticate
router.get('/customerInfo', authenticate, (req, res) =>{
  res.send(req.rootCustomer);
});

// Customer Edit table Authenticate
router.get('/edit_Customer/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const customerId = await Customer.findOne({ _id: id});
    if (customerId) {
      res.send(customerId);
    } else {
      return res.status(422).json(422);
    }
  } catch(err){
    console.log(err);
  } 
});

// Edit customer data
router.post('/edit_customer', async (req, res) =>{

  const { _id, c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
              c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
              c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate
        } = req.body;
        

      if(!c_name || !c_contact || !c_gender || !c_address || !c_relation || !c_details || !c_nights || !c_passport || !c_packagePrices || !c_transaction || !c_blanceAmount){
        return res.status(422).json(422);
      }else{

  try {
    
        const customer = await Customer.findByIdAndUpdate({_id}, {
          $set : {
              c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
              c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
              c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate
          }
          }, {
            new : true,
            useFindAndModify : false,
          } );
      
          res.status(201).json({ message: "customer updated successfully"});    

  } catch (err) {
    console.log(err);
  }
}

});

// Customer Delete table
router.get('/delete_Customer/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const deletedData = await Customer.findByIdAndDelete({ _id: id});
    if (deletedData) {
      res.send(deletedData);
    } else {
      return res.status(422).json(422);
    }
  } catch(err){
    console.log(err);
  }  
});


// ************************************** USER DATA CRUDS *************************************


// User Info table Authenticate
router.get('/userInfo', authenticate, async (req, res) =>{
  const  userData = await User.find().sort({
    "currentDate": -1
});
  res.send(userData);
});
// ____________________________________________________________
const storage = multer.diskStorage({
  destination : (req, file, cd) => {
    cd(null, 'https://babul-madina.vercel.app/images/users')
  },
  filename : (req, file, cd) =>{
    cd(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

console.log( 'https://babul-madina.vercel.app/images/users' );

const upload = multer({
  storage : storage
})

// Add user data
router.post('/add_user',  async (req, res) =>{

  const { name, contact, gender, email, address,
          bioData, date, month, year, password, conPassword
        } = req.body;

  if(!name || !contact || !gender || !email || !address || !password || !conPassword){
    return res.status(422).json(422);
  }else{

  try {
    const  emailExist = await User.findOne({ email: email , users: 'user'});
  
    if(!emailExist){
       const user = new User({
            name, contact, gender, email, address, profileImage: '',
            bioData, date, month, year, password, conPassword, users: "user", status: "active"
          });
          await user.save();

          const  userData = await User.findOne({ email: email , users: 'user'});

          // console.log(useData);

          res.send(userData);        
          res.status(201).json({ message: "User added successfully"});
      
      
    } else{
      return res.status(423).json(423); 
        }   
      // }

  } catch (err) {
    console.log(err);
  }
  }
});

// Upload User Profile
router.post('/upload', upload.single('file'), async (req, res) =>{

  const file = req.file;
// console.log(file);

  if (!file){
    return res.status(421).json(421);
  }

  try{
  
  const profileImage = req.file.filename;

  const directory = "https://babul-madina.vercel.app/images/users";
  const files = await fs.readdir(directory);
  

  const updateImage = files.filter((currentImage) =>{
    if (currentImage === profileImage){
      return false;
    }
    else return true;
  })
  // .map((currentfile) =>
  //     fs.unlink(path.join(directory, currentfile)),
  // )

  const { _id} = req.body;

  // console.log();

  if(!profileImage){
    return res.status(422).json(422);
  }else{

  try {
    
        const user = await User.findByIdAndUpdate({_id}, {
          $set : { profileImage }
          }, {
            new : true,
            useFindAndModify : false,
          } );
          res.send(user);  
          // console.log(user);
          return res.status(201).json({ message: "profile updated successfully"});    

  } catch (err) {
    console.log(err);
  }
}
  }catch (err) {
    console.log(err);
  }


});


// User Delete table
router.get('/delete_User/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const deletedData = await User.findByIdAndDelete({ _id: id});
    if (deletedData) {
      res.send(deletedData);
    } else {
      return res.status(422).json(422);
    }
  } catch(err){
    console.log(err);
  }  
});

// User Edit table Authenticate
router.get('/edit_User/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const userId = await User.findOne({ _id: id});
    if (userId) {
      res.send(userId);
    } else {
      return res.status(422).json(422);
    }
  } catch(err){
    console.log(err);
  } 
});

// Edit user data
router.post('/edit_user', async (req, res) =>{

  const { _id, name, contact, gender, address,
    bioData, profileImage, date, month, year, password, conPassword
  } = req.body;
        
  const DOB =  date + `,` + month + `,` + year;

  if(!name || !contact || !gender || !address){
    return res.status(422).json(422);
  }else{

  try {
    
        const user = await User.findByIdAndUpdate({_id}, {
          $set : {
            name, contact, gender, address,
            bioData, profileImage, date, month, year, password, conPassword
          }
          }, {
            new : true,
            useFindAndModify : false,
          } );
      
          res.status(201).json({ message: "User updated successfully"});    

  } catch (err) {
    console.log(err);
  }
}

});

//update profile image in Edit User
router.post('/edit_userProfile', upload.single('file'), async (req, res) =>{
  const file = req.file;

  if (!file){
    return res.send('no file');
  }

  try{
  
  const profileImage = req.file.filename;

  const directory = "https://babul-madina.vercel.app/images/users";
  const files = await fs.readdir(directory);
  

  const updateImage = files.filter((currentImage) =>{
    if (currentImage === profileImage){
      return false;
    }
    // else return true;
  })


  // .map((currentfile) =>
  //     fs.unlink(path.join(directory, currentfile)),
  // )

  const { _id} = req.body;

  const userDBimage = await User.findById({_id: _id});

  const instantImage = files.filter((currentImage) =>{
    if (currentImage === userDBimage.profileImage){

      fs.unlink(path.join(directory, currentImage))

    }
  })

  if(!profileImage){
    return res.status(422).json(422);
  }else{

  try {
    
        const user = await User.findByIdAndUpdate({_id}, {
          $set : { profileImage }
          }, {
            new : true,
            useFindAndModify : false,
          } );
          res.send(user);  
          // console.log(user);
          // return res.status(201).json({ message: "profile updated successfully"});    

  } catch (err) {
    console.log(err);
  }
}
  }catch (err) {
    console.log(err);
  }

});

// Update user status
router.get('/user_status/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const userStatus = await User.findById({_id: id});
    if(userStatus.status === 'active'){
      try {
    
        const statusUpdate = await User.findByIdAndUpdate({_id: id}, {
          $set : {
            status: 'deactivated'
          }
          }, {
            new : true,
            useFindAndModify : false,
          } );
      
          res.status(201).json({ message: "User Deactivated successfully!"});    

        } catch (err) {
          console.log(err);
        }
    }
    else{
      try {
    
        const statusUpdate = await User.findByIdAndUpdate({_id: id}, {
          $set : {
            status: 'active'
          }
          }, {
            new : true,
            useFindAndModify : false,
          } );
      
          res.status(201).json({ message: "User Activated successfully!"});    

        } catch (err) {
          console.log(err);
        }
    }
    
  } catch(err){
    console.log(err);
  }  
});

// View user profile table Authenticate
router.get('/user_profile/:id', async (req, res) =>{
  const { id } = req.params;
  try{
    const userId = await User.findOne({ _id: id});
    const allUsers = await User.find();
    if (userId) {
      res.send({userId, allUsers});
    } else {
      return res.status(422).json(422);
    }
  } catch(err){
    console.log(err);
  } 
});


// Logout page
router.get('/logout', (req, res) =>{
    res.clearCookie('jwtoken', { path: '/'});
    res.status(200).send('user logout successfully');
   
});

// ________________________________________________________________________

module.exports = router;
