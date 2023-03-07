import React from 'react'

export const Notifications = ({className, items}) => {

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
    return items2.map((e, i)=>{
        return(
            <div key={i} className="border-b-2 border-b-gray-100 mb-2 ">
                <h4 className='text-sqgreen-900 mulishBold'>&bull; {' ' + e.title}</h4>
                <p className='mb-2'>{e.data}</p>
            </div>
        )
    })
}

  return (
    <div className={`fixed top-12 right-48 bg-white  text-xs text-stonte-600 p-6 rounded-lg shadow max-h-52 z-50 ${className}`}>
        {renderItems()}
    </div>
  )
}
