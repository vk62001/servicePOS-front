import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
export const Notifications = ({className, items}) => {
    console.log(items);
    const items2 = [
            {
                title: 'Pago confirmado',
                data: 'Se ha confirmado tu pago de la factura #8923.'
            },
            {
                title: 'Factura autorizada',
                data: 'Se han autorizado tu factura no. 12908.'
            },
            {
                title: 'Gasto autorizado',
                data: 'Se han autorizado tu gasto no. 1347.'
            },
        ]

const renderItems = () => {
    if(Object.keys(items2).lenght===0)return;
    return items.map((e, i)=>{
        if(!e.conected){
        return(
            <div key={i} className="flex border-b-2 border-b-gray-100 mb-2 ">
                <h4 className=' mulishBold'><FontAwesomeIcon icon={faCircleDot} className={`${e.conected?'text-sqgreen-900':'text-red-500'}`} /></h4>
                <p className='mb-2'>Tienda: {e.tienda} Desconectada</p>
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
