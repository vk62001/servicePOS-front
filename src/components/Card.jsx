import React from 'react'

export const Card = ({children,  className, title, classTitle='', classHR, classBody}) => {
  return (
    <div className={`rounded-2xl  ${className}`}>
        <h1 className={`mulishBold title text-sqgreen-900 ml-4  text-bold mt-2 ${classTitle}`}>{title}</h1>
        <div className={`border-b mt-2 ${classHR}`}/>
        <div className={`cardBody pb-10 ${classBody}`}>
            {children}
        </div>
    </div>
  )
}
