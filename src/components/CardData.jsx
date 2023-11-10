import React from 'react'

export const CardData = ({children,  className, title, classTitle='', classHR}) => {
  return (
    <div className={`rounded-md bg-gradient-to-bl from-sqgreen-800 from-10% via-sqgreen-700 via-10% to-gold-500 to-100%  h-40 w-72 ${className}`}>
        <div className='cardBody'>
            {children}
        </div>
    </div>
  )
}
