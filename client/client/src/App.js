
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/Login/Login'
import Main from './pages/Home/Main'; 
import Upload from './Component/Upload/Upload';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/upload' element={<Upload/>}/>
       </Routes>
       </BrowserRouter>
      
    </div>
  );
}

{/* <Register/>
       <Login/>
       <Main/> */}
export default App;
