import './Main.css'
import Blogs from '../../Component/Blogs/Blogs';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Main(){
  const navigate=useNavigate();
  const [blog,setBlog]=useState();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/');
    alert("Logged Out");
    document.location.reload()
  }
  const handleCreate=()=>{
        navigate('/upload')
  }
  useEffect(()=>{
     getblog();
  },[])
     
      const getblog=async()=>{
        const headers = {"Authorization": localStorage.getItem("token") }
        const data = await axios.get(`http://localhost:5000/getblog`,{headers})
        setBlog(data)
        
      }
      // console.log(blog)
     
    return(
        <div className='mainComponent'>
            <div className='nav'>
              <div className='btnav'><p>Blog App</p></div>
              <div className='midnav'>
                <p className='btnav'>Home</p>
                <p className='btnav' onClick={handleCreate}>Create</p>
              </div>
              <div >
                <p className='btnav' onClick={handleLogout}>Logout</p>
              </div>
            </div>
            <div className='body'>
           {blog && <Blogs blog={blog}/>}
              
            </div>
        </div>
    )
}

export default Main;
