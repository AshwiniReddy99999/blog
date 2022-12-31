const express=require('express')
const app=express();
const bcrypt=require('bcrypt');
const auth=require('../middleware/auth');
const Data=require('../models/Upload');
const cloudinary=require('../Cloudinary/cloudinary')

app.post('/',auth,async(req,res)=>{
     const {title,description,image}=req.body;
     console.log(req.body)
    try{
        const uploadesImage=await cloudinary.uploader.upload(image,{folder:"posts"},
          function(error,result){
            if(error){
                console.log(error)
            }else{
                console.log(result)
            }
          }
        )
        
        
        const post=await Data.create({
            title:title,
            image:uploadesImage.secure_url,
            description:description,
            user:req.user
        })
        res.status(201).json({
            status:"success",
            post:post
        })
    }catch(e){
        res.status(401).json({
            status:"failure",
            message:e.message
        })
    }
});
module.exports=app;

