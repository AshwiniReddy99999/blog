const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const express=require('express')
dotenv.config();

const auth=(async(req,res,next)=>{
    
       if(req.headers.authorization){
        const token=req.headers.authorization;
        console.log(token)
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    status:"failure",
                    message:"Authorization Failed"
                })
            }
            req.user=decoded.id
            console.log(req.user)
            next();
        })
       }else{
         res.status(401).json({
            status:"failure",
            message:"Authorization Failed"
         })
       } 
})
module.exports=auth;