import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';

export function Header({userData}) {
 
  return (
   <>
   <div className='absolute top-0 left-0 bg-blue-500 w-full text-white '>
<div className='flex justify-between py-4 px-10'>
  <Link to={'/'}>
  <div className='flex items-center gap-3 cursor-pointer'  >
    <IoHome className='md:text-2xl text-xl'/>
    <p className='md:text-xl text-lg font-semibold '>
Job Board
    </p>
  </div>
  </Link>
  <div className='flex items-center'>

  <Link to={localStorage.getItem("token") ? "/postJobs" :"/login"}>
  
<button  className='font-semibold'>
  {localStorage.getItem("token") ? <div onC className='flex items-center gap-1 border border-white px-2 py-1 rounded-md'>
  <FaUser/>  {userData.email}
  </div> :"Login"}
  
</button>
  </Link>
  {localStorage.getItem("token") &&
<button onClick={()=>{
  localStorage.removeItem('token');
  window.location.reload();
}} className=' border border-white px-2 py-1 rounded-md'>
  Logout
</button>
}
  </div>
</div>
   </div>

 
   </>
  );
}


