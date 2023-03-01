import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { SocketProvider } from '../context/SocketProvider'

export const MainNavigator = () => {
  return (
    <DashboardNavigation />
  )
}

const DashboardNavigation = () => {
    return (
      <>
      <SocketProvider>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home />} />
            {/* <Route path='/resume' element={<Resume/>} />
            <Route path='/usuarios' element={<Users/>} /> */}
            <Route index element={<Home />} />
        </Routes>
      </SocketProvider>
      </>
    )
}
