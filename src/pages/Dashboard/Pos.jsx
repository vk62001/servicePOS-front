import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePOSL } from '../../store/data'
import { SocketContext } from '../../context/SocketContext'
import { Card } from '../../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import 'leaflet/dist/leaflet.css'


import { LinkCard } from '../../components/LinkCard'
import { MapaTienda } from '../../components/MapaTienda'

export const Pos = () => {

  const { tiendas} = useSelector((state) => state.dataSlice);
  
  

  




  const renderTiendas = () => {
    if (Object.keys(tiendas) === 0) return;
    return tiendas.map(e => {
      const title = e.descripcion.split('-');
      return (
        <LinkCard
          to={`/monitor/${e.id}`}
          key={e.id}
          className={` cardShadow p-6 text-xs cursor-pointer text-white sm:w-32 md:w-32 ml-6 mt-4   ${e.connected ? 'bg-sqgreen-900' : 'bg-red-600'}`}
          title={<><FontAwesomeIcon icon={faShop} className='text-md' />{' '}{title[0]}</>}
          classTitle='text-center flex justify-between'
        >
          <p className='mt-2 text-small text-center'>
            {title[1]}
          </p>
          <p className='text-center mt-2 text-gold-500'>
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </p>
        </LinkCard>
      )
    })
  }


  return (
    <div className='bg-gray-100 flex flex-col justify-start h-full'>
      <div className='flex  pt-2 justify-start w-full h-full'>
        <Card
          title={"Tiendas"}
          className='mt-24 justify-center mx-auto lg:w-11/12'
        >
          <div className='flex flex-wrap mt-10 justify-center'>
            {renderTiendas()}
          </div>
        </Card>
      </div>
    </div>
  )
}
