import { message } from 'antd';
import axios from 'axios';
import React,{useState} from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
export function Login(){
const [type,setType]=useState(true);
const [loading,setloading]=useState(false);
const [data,setData]=useState({});
const handleChange=(e)=>{
    // console.log(e.target.id,e.target.value);
    setData({...data,[e.target.id]:e.target.value});
}
const navigation = useNavigate()
const handleSubmit=async(e)=>{
    e.preventDefault()
    if (type) {
        delete data.OrName;
    }
    setloading(true)
    try {
        const {data:res}=await axios.post(`http://localhost:7000/all/${type ? "login":"users"}`,data)
    if(res.status == true){
        message.success(res.message);
        if(type){
            localStorage.setItem("token",res.token)
            navigation("/")
            // window.location.reload();
        }else{
            setType(!type)
        }
    }else{
        message.error(res.message || "internal error");
    }
    setloading(false)
    } catch (error) {
        setloading(false)
        message.error(error.response?.data.message || "internal error")
    }
}
    return (
        <div className="flex justify-center bg-blue-500  items-center h-[100vh]">
        <form onSubmit={handleSubmit} className="block shadow-md rounded-lg p-5 px-9 bg-white w-[500px] h-[450px]">
        <br />
        <p className="text-center text-xl font-bold">Job Board Login </p>
        <p className="text-center text-xs font-normal">Hey Enter your Credentials to Sign in </p>
        
        <br />
        <br />
        {!type &&
        <>
            <input onChange={(e)=>handleChange(e)} type="text" placeholder="organization Name" id='OrName' className="w-full border font-normal px-2 py-2 rounded-lg" />
            <br />
            <br />
        </>
        }
            <input onChange={(e)=>handleChange(e)} type="email" placeholder="email" id='email' className="w-full border px-2  py-2 rounded-lg"  />
            <br />
            <br />
            <input onChange={(e)=>handleChange(e)} type="password" id='Password' placeholder="password" className="w-full border px-2  py-2 rounded-lg"  />
            <br />
            <br />
            <button className="bg-blue-500 text-white w-full py-2 rounded-md flex justify-center">
                {loading ? <Oval
  visible={true}
  height="25"
  width="25"
  color="#ffff"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  :
  <>
  {type ?    "Login" :"Create Account"}
  </>
}
            
            </button>
            <br />
            <br />
            <p className="text-xs font-normal text-center "> or 
              {" "}
                <span className='text-blue-500 cursor-pointer' onClick={()=>setType(!type)}>
                    {type ? "create new Account" : "login to your account"}
                </span>
                 </p>
        </form>
        
        </div>

    )
}