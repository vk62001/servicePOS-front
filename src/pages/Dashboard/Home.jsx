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

export const Home = () => {

  const { tiendas, socketTiendas } = useSelector((state) => state.dataSlice);
  const dispatch = useDispatch()


  const updatePOS = (data) => {
    dispatch(updatePOSL(data));
  }

  const updateSockets = () => {
    if (Object.keys(tiendas).length > 0) {

      const result = tiendas.map(e => {

        if (socketTiendas) {
          const check = socketTiendas.filter(j => e.clave === (+j.tienda));

          if (check[0]) {
            return {
              ...e,
              connected: true
            }
          };
        }
        return {
          ...e,
          connected: false
        };
      });
      updatePOS(result);
    }
  }

  useEffect(() => {
    updateSockets()
  }, [socketTiendas])



  return (
    <div className='bg-gray-100 flex flex-col justify-start h-full'>
      <div className='flex  pt-2 justify-start w-full h-full'>
    <MapaTienda />
      </div>
    </div>
  )
}
