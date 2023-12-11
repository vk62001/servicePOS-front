import React, { useEffect, useRef } from 'react'
import { SocketContext } from './SocketContext';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { getCentralLogConnection, setServerDisconnected, setSocketTiendas } from '../store/data';
import { delay, playAlertSound } from '../utils/utils';


export const SocketProvider = ({children}) => {

    const {flagTiendas} = useSelector(state=>state.dataSlice);

    const socketApp = useRef([]);
    const counterConecctions =  useRef(0);
    const dispatch = useDispatch();
    const connectSocket = () => {
        
        const URi = import.meta.env.VITE_REACT_API_ZEUS;;
        const socket = io.connect(URi,{
          transports: ['websocket'], 
          upgrade: false,
          query:{
            tienda: 1,
            room:'kernel',
            pos:false
          }
        });
      
        socketApp.current = socket;
        socketApp.current.on('connect', ()=>{
          console.log('connect');
          dispatch(setServerDisconnected({serverDisconnected:false}))
        });

        socket.io.on("reconnection_attempt", () => {
          // {
          // query:{
          //   tienda: 1,
          //   room:'kernel'
          // }
        });

        socketApp.current.on('disconnect', (reason)=>{
          console.log('desconectado: ', reason);
          alert('Provemas con el servidor de sockets')
          dispatch(setServerDisconnected({serverDisconnected:true}))
        });

        socketApp.current.on('roomUsers', e=>{
          console.log(e.tiendas)
          const dataTemp =  e.tiendas.filter(tienda => tienda.tienda !=='1');
          console.log(dataTemp)
          const tiendasTemp = dataTemp.length ? dataTemp.length :  0;
          if(tiendasTemp >= counterConecctions.current){
            counterConecctions.current =  dataTemp;
          }else{
            playAlertSound();
            dispatch(getCentralLogConnection());
            counterConecctions.current =  tiendasTemp;
          }
          dispatch(setSocketTiendas({socketTiendas:e.tiendas}));

        });
      }
      


    useEffect(() => {
      if(flagTiendas)
          connectSocket();
        return () => {
          if(Object.keys(socketApp.current).length>0){
            socketApp.current.off('connect');
            socketApp.current.off('disconnect');
          }
        };
    }, [flagTiendas])
    

    return (
        <SocketContext.Provider value={{socketApp:socketApp}}>
            {children}
        </SocketContext.Provider>
      )
}
