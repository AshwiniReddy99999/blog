const bodyParser = require('body-parser');
const express=require('express');

const Connnet=require('./connectdb/connect')
const app=express();
const Register=require('./routes/Register')
const Login=require('./routes/Login')
const Postblog=require('./routes/Upload')
const Getblog=require('./routes/getblog')
const fileupload = require('express-fileupload'); 
const cors=require('cors')
app.use(fileupload({useTempFiles: true}))
app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use('/register',Register);
app.use('/login',Login);
app.use('/post',Postblog)
app.use('/getblog',Getblog)



app.listen(5000,()=>{
      Connnet();
      console.log('server is up at port 5000')
})

