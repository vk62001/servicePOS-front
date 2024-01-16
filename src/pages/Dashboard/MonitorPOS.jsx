import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import {Button} from '../../components/Button'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCentralTables } from "../../store/data";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
export const MonitorPOS = () => {
  const {socketApp} = useContext(SocketContext); //este es el socket para conectarnos
  const {id} = useParams();
  const dispatch =  useDispatch();
  const {centralTables, socketTiendas} = useSelector(state=>state.dataSlice);
  const [central, setCentral] = useState([])
  const [posLocal, setPosLocal] = useState([]);

  useEffect(() => {
    dispatch(getCentralTables(id));
    //peticion por sockets
  }, [])
  
  useEffect(() => {
    if(Object.keys(centralTables).length>0)
      show()
  }, [centralTables])
 
  const show=() => {
    const newArray = [];
    for (const key in centralTables) {
      // console.log(key, centralTables[key]);
      newArray.push({
        tableName: key,
        count: centralTables[key],

      });
    };
    setCentral(newArray);
  };

   const showPOS = (data)=>{
    const newArray = [];
    for (const key in data) {
      newArray.push({
        tableName:key,
        count: data[key]
      });
    }
    setPosLocal(newArray);
   };

  const filterSocketTienda = () => {
    return socketTiendas.filter( e=>e.tienda===id);
  };

  useEffect(() => {
      if(Object.keys(socketTiendas).length>0){
        const sockeTiendaId = filterSocketTienda();
        console.log(sockeTiendaId)  
        const objSockets = {
            monitorId: socketApp.current.id,
            socketTiendaId: sockeTiendaId[0].id
          }
        socketApp.current.emit('getCountRegistros', objSockets);
        socketApp.current.on('setCountRegistros', data=>{
            showPOS(data);
        })
      }
    return () => {
      
    }
  }, [socketTiendas])
  

  const renderCentral = () => {
    if(Object.keys(central).length===0) return;
    return central.map((e)=>{
      return (
        <tr className="bg-white border-b" key={e.tableName}>
          <th
            scope="row"
            className="px-2 py-1 text-xs text-gray-900 whitespace-nowrap "
          >
            {e.tableName}
          </th>
          <td className="px-2 py-1 text-xs text-center">{e.count}</td>
        </tr>
      )
    })
  }

  const renderPOSLocal = () => {
    if(Object.keys(posLocal).length===0) return;
    return posLocal.map((e)=>{
      return (
        <tr className="bg-white border-b" key={e.tableName}>
          <th
            scope="row"
            className="px-2 py-1 text-xs text-gray-900 whitespace-nowrap "
          >
            {e.tableName}
          </th>
          <td className="px-2 py-1 text-xs text-center">{e.count}</td>
        </tr>
      )
    })
  }

  return (
    <div className="mulishRegular bg-gray-100 flex flex-col justify-start h-full">
      <div className="flex  pt-2 justify-start w-full h-full">
        <Card
          title={`Tienda: ${id}`}
          className="mt-24 justify-center mx-auto lg:w-11/12 bg-white"
          classTitle="p-4"
        >
          <div className="flex mt-10 w-10/12 justify-between ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
              <h1 className="mulishBold text-center p-2 ">Central</h1>
              <table className="w-full text-sm text-left  text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tabla
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Conteo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderCentral()}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
              <h1 className="mulishBold text-center p-2 ">POS</h1>
              <table className="w-full text-sm text-left  text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tabla
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Conteo
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Central
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Diferencia
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ver
                    </th> */}

                  </tr>
                </thead>
                <tbody>
                {renderPOSLocal()}
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
              <h1 className="mulishBold text-center p-2 ">POS Live</h1>
              <table className="w-full text-sm text-left  text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Tabla
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Conteo
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Central
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Diferencia
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ver
                    </th> */}

                  </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {centralTables.source}
                    </th>
                    <td className="px-6 py-4">Silver</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
