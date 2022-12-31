const mongoose=require('mongoose');

const User=mongoose.Schema({
    email:{type:String},
    password:{type:String}
})

const Usermodel=mongoose.model('user',User);

module.exports=Usermodel;