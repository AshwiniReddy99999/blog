const express=require('express')
const app=express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Register=require('../models/Register')
const { check, validationResult } = require('express-validator');
const dotenv=require('dotenv');
const e = require('express');
dotenv.config();
var loginValidate = [
    // Check Username
    check('email', ' Must Be an Email Address').isEmail()
    .trim().escape().normalizeEmail(),
    // Check Password
    check('password').isLength({ min: 4 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];
app.post('/',loginValidate,async(req,res)=>{
    const {email,password}=req.body;
    console.log(1)
    try{
        if(email==="" || password===""){
            return res.status(422).json({
                status:'failure',
                message:"All fields are mandatory!"
            })
        }
        const errors=validationResult(req);
        console.log(errors)
        if(errors.errors.length!==0){
            let error=errors.errors[0].msg;
        console.log(error)
            return res.status(422).json({
                status:'failure',
                message:error})
        }
        

        const user=await Register.findOne({email:email});
        console.log(user)
        if(!user){
            return res.status(404).json({
                status:'failure',
                message:'User does not exists'
            })
        }
        const comparepassword=bcrypt.compare(password,user.password);
        if(comparepassword){
            const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"2h"});
            res.status(201).json({
                status:"success",
                message:"login successful",
                token:token

            })
        }else{
            return res.status(400).json({
                status:"failure",
                message:"Please enter correct password",

            })
        }
        
    }catch(e){
          res.status(401).json({
            status:'failure',
            message:e.message
          })
    }
})

module.exports=app;