import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { convertIsoToDateTime } from '../utils/formatDates';
export const Notifications = ({className, items}) => {

const renderItems = () => {
    if(Object.keys(items).lenght===0)return;
    return items.map((e, i)=>{
        if(!e.conected){
        return(
            <div key={i} className="flex border-b-2 border-b-gray-100 mb-2 ">
                <h4 className=' mulishBold mr-2'><FontAwesomeIcon icon={faCircleDot} className={`${e.conected?'text-sqgreen-900':'text-red-500'}`} /></h4>
                <p className='mb-2'><span className='font-bold mulishBold'>Tienda:</span> {e.tienda} {convertIsoToDateTime(e.date)}</p>
            </div>
        )
        }
    })
}

  return (
    <div className={`fixed  top-12 right-48 overflow-auto bg-white  text-xs text-stonte-600 p-6 rounded-lg shadow max-h-52 z-50 ${className}`}>
        {renderItems()}
    </div>
  )
}
