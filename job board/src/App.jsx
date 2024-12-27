import { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import {Header} from './components/header'
import {Jobs} from './components/jobs'
import { Login } from './components/login'
import { PostJobs } from './components/postJobs'
import { jwtDecode } from 'jwt-decode'

function App() {
  const [userData,setData] =useState({});
  const token=localStorage.getItem('token')
  useEffect(()=>{
function CheckToken(){
  if(token){

    const decoded = jwtDecode(token);
    setData(decoded)
  }
}
CheckToken()
  },[])
  return (
    <>
    <Header userData={userData}/>
     <Routes>
<Route path='/Login' element={<Login/>} />
<Route path='/' element={<Jobs userData={userData} />} />
<Route path='/postJobs' element={<PostJobs/>} />
     </Routes>
    </>
  )
}

export default App
