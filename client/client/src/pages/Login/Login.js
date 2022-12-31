import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate=useNavigate();
    const [logindata,setLogindata]=useState({email:"",password:""});
    const [errMes,seterrMes]=useState('')
    const handleLogin=async()=>{
        const result=await fetch('http://localhost:5000/login',{
            method:"POST",
            body:JSON.stringify(logindata),
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).catch((e)=>{
              seterrMes(e.message)
        })
        const results=await result.json();
        console.log(results)
        if(results.status==='failure'){
            seterrMes(results.message)
        }else if(results.status==='success'){
            seterrMes(results.message)
            window.localStorage.setItem("token", results.token);
            navigate('/main')
        }
    }
    const handleRegister=()=>{
        navigate('/register')
    }
        

    

    return(
        
        <div className='loginContainer'>
            <div className='lInner'>
                <div className='lLogin'>
                    <div className='lTitle'><h1>Login</h1></div>
                    <div className='lInputFileds'>
                        <div className='lInput'>
                            <label for="email" id='email' >Email:</label>
                            <input type='text' placeholder="Enter Email" id="email" name="email" onChange={(e)=>setLogindata({...logindata,[e.target.name]:e.target.value})} ></input>
                        </div>
                        <div className='lInput'>
                            <label for="password" id='password' >Password:</label>
                            <input type='password' placeholder="Enter Password" id="password" name="password" onChange={(e)=>setLogindata({...logindata,[e.target.name]:e.target.value})} ></input>
                        </div>
                        <div className='lInput' onClick={handleLogin}>
                            <button id='btn'>Login</button>
                        </div>
                        <div className='lInput' id="register" onClick={handleRegister}>Register?</div>
                       {errMes &&<div className='message'>
                           {errMes}
                        </div>}
                    </div>
                    <div></div>
                </div>

            </div>
        </div>
        
    )
}

export default Login;
