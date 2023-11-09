import React from 'react'
import { Link } from 'react-router-dom'

export const LinkCard = ({children,  className, to=""}) => {
  return (
        <Link to={to} className={`mulishRegular rounded-md  ${className}`}>
            <div className='cardBody'>
                {children}
            </div>
        </Link>
  )
}
