import React from 'react'


export const Input = ({placeholder, className, value, type="text", error=false,messageError,  onChange, maxLength=25, minLength=8}) => {
  return (
    <>
      <input 
          placeholder={placeholder}
          className={`bg-gray-100 border  w-full pl-8 rounded-xl h-10 placeholder:text-gray-400 placeholder:text-sm  ${className} ${error?'focus:border-red-700 active:border-red-700 border-red-700 ':'border-sqgreen-900 w-full pl-8 rounded-md h-10 placeholder:text-gray-400 placeholder:text-sm focus:border-sqgreen-900 active:border-sqgreen-900 outline-offset outline-sqgreen-900'}`}
          value={value}
          onChange={e=>onChange(e.target.value)}
          type={type}
          maxLength={maxLength}
          minLength={minLength}
      />
      {error ?
        <span className='text-xs' style={{color: '#E30609'}}>{messageError}</span>
        :null}
    </>
  )
}
