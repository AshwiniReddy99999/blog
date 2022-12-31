const express=require('express')
const app=express();

const auth=require('../middleware/auth');
const Data=require('../models/Upload');

app.get('/',auth,async(req,res)=>{
    try{
        const getpost=await Data.find({user:req.user})
        res.status(200).json({
            status:"success",
            post:getpost
        })
    }catch(e){
        res.status(400).json({
            status:"failure",
            message:e.message
        })
    }
})

module.exports=app;