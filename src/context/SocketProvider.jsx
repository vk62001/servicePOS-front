import React, { useEffect, useRef } from 'react'
import { SocketContext } from './SocketContext';
import { io } from "socket.io-client";

export const SocketProvider = ({children}) => {
    const socketApp = useRef([]);

    const connectSocket = () => {
        
        const URi = 'http://localhost:5002';
        const socket = io.connect(URi,{
          transports: ['websocket'], 
          upgrade: false,
          query:{
            tienda: 1,
            room:'zona_norte'
          }
        });
      
        socketApp.current = socket;
        socketApp.current.on('connect', ()=>{
          console.log('connect');
        });

        socketApp.current.on('roomUsers', e=>{
          console.log(e)
        })
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
        <SocketContext.Provider value={{socketApp:socketApp.current}}>
            {children}
        </SocketContext.Provider>
      )
}
