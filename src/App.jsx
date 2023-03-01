import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { SocketProvider } from './context/SocketProvider'
import { MainNavigator } from './routes/MainNavigator'

function App() {
  

  return (
    <MainNavigator />
  )
}

export default App
