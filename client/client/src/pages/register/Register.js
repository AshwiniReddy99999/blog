import './Register.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Register(){
    const navigate=useNavigate();
     const [registerdata,setregisterdata]=useState({email:"",password:"",confirmPassword:""});
     const [message,setmessage]=useState('');
     
     const handleRegister=async()=>{
        console.log(registerdata)
        if(registerdata.email===''){
            setmessage('Email cannot be empty!')

        }else if(registerdata.password===""){
            setmessage('Password cannot be empty!')
            
        }else if(registerdata.password!==registerdata.confirmPassword){
            setmessage('Password does not match!')
            
        }else{
        
                setmessage("")
        
        const result=await fetch("http://localhost:5000/register/",{
            method:"POST",
            body:JSON.stringify(registerdata),
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).catch((e)=>{
            setmessage(e.message)
        })
       const results=await result.json();
       console.log(results)
         if(results.status==="failure"){
            setmessage(results.message);
        }else if(results.status==="success"){
            setmessage(results.message)
            navigate('/');
        }
        }
     }
    return(
    <>
        <div className="RegisterComponent">
           
            <div className="rInner">
                <div className="rRegister">
                    <div className='rtitle'><h1>Register</h1></div>
                    <div>
                        <div className='rInput'>
                            <label for="email">Email:</label>
                            <input type='email' id="email" name="email" onChange={(e)=>{setregisterdata({...registerdata,[e.target.name]:e.target.value})}}></input>
                        </div>
                        <div className='rInput'>
                            <label for="email">Password:</label>
                            <input type='password' id="password" name="password" onChange={(e)=>{setregisterdata({...registerdata,[e.target.name]:e.target.value})}}></input>
                        </div>
                        <div className='rInput'>
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type='confirmPassword' id="confirmPassword" name="confirmPassword" onChange={(e)=>{setregisterdata({...registerdata,[e.target.name]:e.target.value})}}></input>
                        </div>
                        <div className='rInput' onClick={handleRegister}>
                            <button  id='btn'>Register</button>
                        </div>
                       {message &&<div className='message'>{message}</div>}
                    </div>
                </div>
            </div>
         
        </div>
</>
    )
}

export default Register;
