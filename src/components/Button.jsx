import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Button = ({className, title, icon, classIcon, onClick, disabled}) => {
  return (
    <div className='relative '>
        <button
            className={`relative flex bg-sqgreen-900 text-white w-full p-2 rounded-xl justify-center items-center hover:shadow-md hover:shadow-gray-400 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >{icon ? <FontAwesomeIcon icon={icon} className={`text-white top-4 ${classIcon}`} />:null} {title}</button>
    </div>
  )
}
