import React from 'react'
import { Link } from 'react-router-dom'

export const LinkCard = ({children,  className, title, classTitle='', classHR, to=""}) => {
  return (
        <Link to={to} className={` rounded-2xl  ${className}`}>
            <h1 className={`mulishBold title ${classTitle}`}>{title}</h1>
            <div className={`border-b mt-2 ${classHR}`}/>
            <div className='cardBody'>
                {children}
            </div>
        </Link>
  )
}
