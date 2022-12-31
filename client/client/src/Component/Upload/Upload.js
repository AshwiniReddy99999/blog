import './Upload.css'

import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Upload(){
    const [blogData,setBlogData]=useState({title:"",description:"",image:""});
    const navigate=useNavigate();
    
    const handleCreateBlog=async(e)=>{
        e.preventDefault();
        await fetch('http://localhost:5000/post',{
            method:"POST",
            body:JSON.stringify({
                title:blogData.title,
                
                image:blogData.image,
                description:blogData.description,
            }),
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json",
                Accept: "application/json"
            },

        }).then((data)=>{
            data.json()
        }).then((res)=>{
            console.log("user registered")
            navigate('/main')
        }).catch((e)=>{
            console.log(e.message)
        })
    }

    const handleImage=(e)=>{
       
        const file = e.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            
            setBlogData({ ...blogData, image: reader.result })
        }
        console.log(blogData)
    } 
    
    

         

         

    
    return(
        <div className='upload'>
            
            <div className="uploadinner">
                <div className="post">
                    <div className="blogTitle"><h1>Create Blog</h1></div>
                    <div className="inputField">
                        <div className="fields">
                            <label> Title:</label>
                            <input type="text" placeholder="Title" name='title' onChange={(e)=>{setBlogData({...blogData,[e.target.name]:e.target.value})}}></input>
                        </div>
                        <div className="fields">
                            <input type="file" name="image" onChange={e=>handleImage(e)}></input>
                        </div>
                        <div className="fields">
                            <label>Description:</label>
                            <textarea type="text" name='description' onChange={(e)=>{setBlogData({...blogData,[e.target.name]:e.target.value})}}></textarea>
                        </div>
                        <div className="fields" onClick={(e)=>{handleCreateBlog(e)}} ><button id="btn">Upload</button></div>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default Upload;