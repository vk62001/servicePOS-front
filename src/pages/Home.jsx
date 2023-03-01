import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../store/data'
import axios from 'axios'

export const Home = () => {
  const {value} = useSelector((state) => state.dataSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    
    axios.get('http://192.168.15.82:8091/api/v1/Proveedores/',{
      headers :{
        // Authorization: `Basic ZnRwc2FwOkluaWNpbzAx`, 
        ContentType: 'application/json',
        Authorization: 'Basic ZnRwc2FwOkluaWNpbzAx'
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>console.log(err));
  
    return () => {
      
    }
  }, [])
  

  return (
    <div>
      <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
    </div>
  )
}
