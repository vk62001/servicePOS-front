import React from 'react'
import { useSelector } from 'react-redux'
import Logo from '../assets/images/logo.png'
export const Loader = () => {
  const {loader} = useSelector(state=>state.dataSlice);
  return (
    <>
    {loader? 
    <div className='fixed z-10 w-screen h-screen top-0 left-0 bgLoader flex justify-center items-center flex-col'>
      <img src={Logo}  className="opacity-40" width={250}/>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    :null}
    </>
  )
}
