const express=require('express')
const app=express();
const { check, validationResult } = require('express-validator');
const Register=require('../models/Register');
const bcrypt=require('bcrypt');
const { validate } = require('../models/Register');
var loginValidate = [
    // Check Username
    check('email', 'Username Must Be an Email Address').isEmail()
    .trim().escape().normalizeEmail(),
    // Check Password
    check('password').isLength({ min: 4 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];

app.post('/',loginValidate,async(req,res)=>{
    try{
        const errors=validationResult(req);
        console.log(errors)
        if(errors.errors.length!==0){
            let error=errors.errors[0].msg;
        console.log(error)
            return res.status(422).json({
                status:'failure',
                message:error})

        }else{
            console.log(1)
            const {email,password,confirmPassword}=req.body;
            console.log(email)
            if(password!==confirmPassword){
                return res.status(403).json({
                    status:"failure",
                    message:"Enter correct password"
                })
            }
            const user=await Register.findOne({email});
            if(user){
                return res.status(403).json({
                    status:"failure",
                    message:"user already exists"
                })
            }
            bcrypt.hash(password,10,async(err,hash)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        status:'failure',
                        message:err.message
                    })
                }
              const  newuser=await Register.create({
                    email:email,
                    password:hash
                })
                res.json({
                    status:"success",
                    message:"successfully registered",
                    newuser
                })
            })
            
        }
    }catch(e){
        console.log(e)
            res.json({
                status:"failure",
                message:e.message
            })
    }
})


module.exports=app;