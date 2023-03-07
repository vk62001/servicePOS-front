import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { SocketProvider } from './context/SocketProvider'
import { MainNavigator } from './routes/MainNavigator'
import { Loader } from './components/Loader'
import { getAllPOS } from './store/data'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(getAllPOS())
}, [])

  return (
    <>
    <MainNavigator />
    <Loader />
    </>
  )
}

export default App
