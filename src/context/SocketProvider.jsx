import React, { useEffect, useRef } from 'react'
import { SocketContext } from './SocketContext';
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { setSocketTiendas } from '../store/data';

export const SocketProvider = ({children}) => {
    const socketApp = useRef([]);
    const dispatch = useDispatch();
    const connectSocket = () => {
        
        const URi = import.meta.env.VITE_REACT_API_ZEUS;;
        const socket = io.connect(URi,{
          transports: ['websocket'], 
          upgrade: false,
          query:{
            tienda: 1,
            room:'kernel'
          }
        });
      
        socketApp.current = socket;
        socketApp.current.on('connect', ()=>{
          console.log('connect');
        });

        socketApp.current.on('roomUsers', e=>{
          console.log(e, '28 tiendas')
          dispatch(setSocketTiendas({socketTiendas:e.tiendas}));
        });
      }
      


    useEffect(() => {
        connectSocket();
        return () => {
          if(Object.keys(socketApp.current).length>0){
            socketApp.current.off('connect');
            socketApp.current.off('disconnect');
          }
        };
    }, [])
    

    return (
        <SocketContext.Provider value={{socketApp:socketApp}}>
            {children}
        </SocketContext.Provider>
      )
}
