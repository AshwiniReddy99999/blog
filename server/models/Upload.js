const mongoose=require('mongoose');

const Post=mongoose.Schema({
    title:{type:String},
    image:{type:String},
    description:{type:String},
    user:{type:String}
})

const Postmodel=mongoose.model('post',Post);

module.exports=Postmodel;