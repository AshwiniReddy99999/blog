import './Blogs.css';

function Blogs(props){
   
    return(
        <div >
           {console.log(props.blog.data.post)}
           { 
            props.blog.data.post.map((e,indx)=>{

                return (
                    <div className='blogComponent' key={indx}>
                        <div ><h1>{e.title}</h1></div>
                       <div className='img'><img src={e.image}></img></div>
                       
                        <div><p>{e.description}</p>
                       
    
                        </div>
                    </div>
                )
            })
           }
           
        </div>
    )
}

export default Blogs;