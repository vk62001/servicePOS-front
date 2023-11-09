import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Dashboard/Home'
import { SocketProvider } from '../context/SocketProvider'
import { Login } from '../pages/Auth/Login'
import { useSelector } from 'react-redux'
import { NavBar } from '../components/NavBar'
import { Monitor } from '../pages/Dashboard/Monitor'
import { Pos } from '../pages/Dashboard/Pos'

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
