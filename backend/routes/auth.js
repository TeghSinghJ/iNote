const express = require("express");
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const JWT_SECRET_KEY = "CodeWith@TeghSingh123456789";
let success = false;
//ROUTE 1 : End point for Creating User. /api/auth/createuser
router.post(
  "/createuser",
  [
    // Input Validation
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password must contain minimum of length 3!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      //If user email address already exist then show them the message and return
      if (user) {
        return res.status(400).json({ error: "Email already exists!" });
      }
      // A salt is a process where an extra character is added to the user password to make it 
      // difficult to hack
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      const data = {
        user : {
          id: user.id
        } 
      };
      //Session token to authorize an user
      const authToken = jwt.sign(data,JWT_SECRET_KEY);
      res.json({ success : true , authToken});
    } catch (er) {
      console.error(er.error);
      res.status(400).send("Some error occured!");
    }
    // .then(user=>res.json(user)).catch(err=>{
    //     console.log(err);
    //     res.json({error : "This email already exists! please try another one"})
    // });
    // const user = User(req.body);
    // res.send(req.body);
    // user.save();
  }
);
// ROUTE 2 : End-point for user login /api/auth/login
router.post(
  "/login",
  [
    // Input Validation
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password cannot be empty!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    let {email,password} = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      //If user email address already exist then show them the message and return
      if (!user) {
        return res.status(400).json({ success,error: "Invalid Credentials!" });
      }
      // A salt is a process where an extra character is added to the user password to make it 
      // difficult to hack
      const data = {
        user : {
          id: user.id
        } 
      };
      const isAValidUser = bcrypt.compare(password,req.body.password);
      if(!isAValidUser){
        return res.status(400).json({error:"Invalid Credentials!"});
      }
      //Session token to authorize an user
      const authToken = jwt.sign(data,JWT_SECRET_KEY);
      success = true;
      res.json({ success,authToken});
      
    } catch (er) {
      console.error(er.error);
      res.status(400).send("Some error occured!");
    }
    // .then(user=>res.json(user)).catch(err=>{
    //     console.log(err);
    //     res.json({error : "This email already exists! please try another one"})
    // });
    // const user = User(req.body);
    // res.send(req.body);
    // user.save();
  }
);
//ROUTE 3 
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-passsword");
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
