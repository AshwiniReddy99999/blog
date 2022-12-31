const mongoose=require('mongoose');
const dotenv=require('dotenv')
mongoose.set('strictQuery', true);
dotenv.config();
const Connnet=async()=>{
     await mongoose.connect(process.env.DATABASE_URL,()=>{
        console.log('connected to database')
     });

}

module.exports=Connnet;