import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Dashboard/Home'
import { SocketProvider } from '../context/SocketProvider'
import { Login } from '../pages/Auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import { NavBar } from '../components/NavBar'
import { Monitor } from '../pages/Dashboard/Monitor'
import { Pos } from '../pages/Dashboard/Pos'
import { updatePOSL } from '../store/data'

export const MainNavigator = () => {

  const {auth} = useSelector(state=>state.dataSlice);

  return (
    <>
    <SocketProvider >
      {auth ?
        <DashboardNavigation />
      :
        <AuthNavigation />
      }
      </SocketProvider>
    </>
  )
}



const AuthNavigation = () => {
  return(
    <Routes>
      <Route path='/login' element = {<Login/>} />
      <Route path='/*' element = {<Login />} />
      <Route index element = {<Login />} />
    </Routes>
  )
}

const DashboardNavigation = () => {
  const { socketTiendas, tiendas} = useSelector((state) => state.dataSlice);
  const dispatch = useDispatch()


  const updatePOS = (data) => {
    dispatch(updatePOSL(data));
  }

  const updateSockets = () => {
    console.log(socketTiendas, '51 sockets');
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
      <>
        <NavBar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home />} />
            <Route path='/tiendas' element={<Pos />} />
            <Route path='/monitor' element={<Monitor/>} />
            <Route path='/monitor/:id' element={<Monitor/>} />
             {/*<Route path='/usuarios' element={<Users/>} /> */}
            <Route index element={<Home />} />
            
        </Routes>
      </>
    )
}
