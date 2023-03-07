import React from 'react'

export const Card = ({children,  className, title, classTitle='', classHR}) => {
  return (
    <div className={`rounded-2xl  ${className}`}>
        <h1 className={`mulishBold title ${classTitle}`}>{title}</h1>
        <div className={`border-b mt-2 ${classHR}`}/>
        <div className='cardBody'>
            {children}
        </div>
    </div>
  )
}
