import React from 'react'
import { Link } from 'react-router-dom'

export const LinkCard = ({children, descripcion, className, to=""}) => {
  return (
        <Link to={to} state={descripcion} className={`mulishRegular rounded-md  ${className}`}>
            <div className='cardBody'>
                {children}
            </div>
        </Link>
  )
}
