import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePOSL } from '../../store/data'
import { SocketContext } from '../../context/SocketContext'
import { Card } from '../../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faC, faSearch, faShop, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import 'leaflet/dist/leaflet.css'
import BardCode from '../../assets/images/barCode.png';

import { LinkCard } from '../../components/LinkCard'
import { MapaTienda } from '../../components/MapaTienda'
import { Input } from '../../components/Input'
import { RadioSearchPos } from '../../components/RadioSearchPos'

export const Pos = () => {

  const { tiendas } = useSelector((state) => state.dataSlice);

  const [textTienda, setTextTienda] = useState('');
  const [tempTiendas, setTempTiendas] = useState([]);
  const [selectRadio, setSelectRadio] = useState('todos')

  const filter = (text) => {
    console.log(text, 'entra y por qué?')
    setTextTienda(text);
    if (text.length === 0) {
      setTempTiendas(tiendas);
      return;
    };


    const newData = tiendas.filter(element => (element.id === (+text))
      || element.descripcion.toLowerCase().includes(text.toLowerCase())
      || element.ciudad.toLowerCase().includes(text)
    );
    setTempTiendas(newData)
  }

  const filterRadio = () => {
    switch (selectRadio) {
      case 'todos':
          setTempTiendas(tiendas);
        return;
      case 'conectados':
        const newData =  tiendas.filter(element=> element.connected)
        setTempTiendas(newData);
      return;
      case 'desconectados':
        const data =  tiendas.filter(element=> !element.connected)
        setTempTiendas(data);
      return;
      default:
        break;
    }
    const newData =  tiendas.filter()
  }



useEffect(() => {
  filterRadio();
  

}, [selectRadio])



  useEffect(() => {
    if (textTienda.length > 0) {
      filter(textTienda)
      return;
    }
    setTempTiendas(tiendas);
    return () => {
      setTempTiendas([]);
    }
  }, [tiendas])

  const renderTiendas = () => {
    if (tempTiendas.length === 0) return;
    return tempTiendas.map(e => {
      const title = e.descripcion.split('-');
      return (
        <LinkCard
          to={`/monitor/${e.id}`}
          key={e.id}
          className={` cardShadow p-4 text-small cursor-pointer text-gray-700 sm:w-52 md:w-52 ml-6 mt-4  bg-white`}
        >

          <div className='flex items-center'>
            <div className='w-6/12'>
              <img src={BardCode} />
            </div>
            <div className={`w-6/12 tex-xs mulishBold  ${e.connected ? 'text-sqgreen-900' : 'text-red-600'}`}>
              <p className='text-small'>ID {e.id} </p>
              <p className='text-small'>{title[1]} </p>
              <p className='text-small'>{e.ciudad} </p>
            </div>
          </div>
          <div className='border border-b-1 border-gray-400 my-4' />
          <div className={`text-white text-center rounded-sm  ${e.connected ? 'bg-sqgreen-900' : 'bg-red-600'}`}>{e.connected ? 'Activo' : 'Inactivo'}</div>
          <p className={`text-center mt-2 text-sqgreen-900 underline  ${e.connected ? 'text-sqgreen-900' : 'text-red-600'}`}>
            <FontAwesomeIcon icon={faShop} />
            {" "} Ver tienda
          </p>
        </LinkCard>
      )
    })
  }


  return (
    <div className='bg-gray-100 flex flex-col justify-start h-screen'>
      <div className='flex  pt-2 justify-start w-full h-full'>
        <Card
          title={"Tiendas"}
          className='mt-24 justify-center mx-auto lg:w-11/12 '
        >
          <div className='w-full flex justify-between'>
            <div className='relative w-6/12'>
              <p className='text-gray-700 mulishRegular'>Puedes filtrar por localidad o buscar por número de tienda.</p>
              <FontAwesomeIcon icon={faSearch} className='text-sqgreen-900 absolute left-2 top-14' />
              <Input
                placeholder={"Buscar tienda"}
                className={"w-72 md:w-72 rounded-md mt-6 bg-white h-8"}
                onChange={filter}
              />
            </div>
            <div className='w-6/12 flex justify-end items-center'>
              <RadioSearchPos
                selectRadio={setSelectRadio}
                value={selectRadio}
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-8 justify-center h-3/6 overflow-auto pb-5'>
            {renderTiendas()}
          </div>
        </Card>
      </div>
    </div>
  )
}
