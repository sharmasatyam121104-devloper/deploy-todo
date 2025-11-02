import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/user/userSlice';


const LogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = ()=>{
      dispatch(logout());
      navigate("/login")

    }
  return (
    <div className='mx-5 mt-5'>
      <button onClick={handleClick} className='bg-rose-500 hover:bg-rose-600 cursor-pointer rounded-xl w-23 h-10'>Logout</button>
    </div>
  );
}

export default LogOut;
