import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import {
  faBullhorn,
  faEye,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCentralTables } from "../../store/data";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { CardData } from "../../components/CardData";
import { PieChart } from "../../components/PieChart";
import { APISQZeus } from "../../SDK/instanceZeuz";
import { SDKZeus } from "../../SDK/SDKZeus";

export const Monitor = () => {
  const { socketApp } = useContext(SocketContext); //este es el socket para conectarnos
  const { id } = useParams();
  const dispatch = useDispatch();
  const { centralTables, socketTiendas } = useSelector(
    (state) => state.dataSlice
  );
  const [central, setCentral] = useState([]);
  const [posLocal, setPosLocal] = useState([]);

  // useEffect(() => {
  //   dispatch(getCentralTables(id));
  //   //peticion por sockets
  // }, [])

  // useEffect(() => {
  //   if(Object.keys(centralTables).length>0)
  //     show()
  // }, [centralTables])

  const show = () => {
    const newArray = [];
    for (const key in centralTables) {
      // console.log(key, centralTables[key]);
      newArray.push({
        tableName: key,
        count: centralTables[key],
      });
    }
    setCentral(newArray);
  };

  const showPOS = (data) => {
    const newArray = [];
    for (const key in data) {
      newArray.push({
        tableName: key,
        count: data[key],
      });
    }
    setPosLocal(newArray);
  };

  const filterSocketTienda = () => {
    return socketTiendas.filter((e) => e.tienda === id);
  };

  // useEffect(() => {
  //     if(Object.keys(socketTiendas).length>0){
  //       const sockeTiendaId = filterSocketTienda();
  //       console.log(sockeTiendaId)
  //       const objSockets = {
  //           monitorId: socketApp.current.id,
  //           socketTiendaId: sockeTiendaId[0].id
  //         }
  //       socketApp.current.emit('getCountRegistros', objSockets);
  //       socketApp.current.on('setCountRegistros', data=>{
  //           showPOS(data);
  //       })
  //     }
  //   return () => {

  //   }
  // }, [socketTiendas])
  const getcountInfo = async () => {
    const { data } = await SDKZeus.getCountInfo(199);
    setCentral(data.data.countCentral);
    setPosLocal(data.data.countTienda);
  };
  useEffect(() => {
    getcountInfo();
    return () => {};
  }, []);

  const renderCentral = () => {
    if (Object.keys(central).length === 0) return;
    return Object.entries(central).map(([key, value]) => (
      <tr className="border-b border-gray-200" key={key}>
        <th className="text-center py-1">{key.toUpperCase()}</th>
        <td className="text-center py-1">{value}</td>
      </tr>
    ));
  };

  const renderPOSLocal = () => {
    if (Object.keys(posLocal).length === 0) return;
    return Object.entries(posLocal).map(([key, value]) => (
      <tr className="border-b border-gray-200" key={key}>
        <th className="text-center py-1">{key.toUpperCase()}</th>
        <td className="text-center py-1">{value}</td>
      </tr>
    ));
  };

  return (
    <div className="mulishRegular bg-gray-100 flex flex-col justify-start h-full">
      <div className="flex flex-col pt-2 justify-start w-full h-screen">
        <div className="w-full flex mt-24">
          <div className="w-7/12">
            <Card
              title={`Tienda: Alamos`}
              className=" justify-center mx-auto lg:w-11/12 md:w-11/12 bg-white h-96"
              classTitle="p-4 mulishBold text-sqgreen-900 text-2xl"
              classBody={"flex flex-wrap justify-around"}
            >
              <div className=" flex w-10/12 mx-0 items-center justify-between py-10 ">
                <CardData
                  className={" flex justify-center items-center text-center"}
                >
                  <h4 className="text-white  text-sm">Diagnostico central</h4>
                  <h1 className="text-white  text-3xl">98%</h1>
                  <h6 className="mulishLight text-white text-xs">
                    Diagnostico central
                  </h6>
                </CardData>
                <CardData
                  className={" flex justify-center items-center text-center"}
                >
                  <h4 className="text-white  text-sm">Diagnostico central</h4>
                  <h1 className="text-white  text-3xl">98%</h1>
                  <h6 className="mulishLight text-white text-xs">
                    Diagnostico central
                  </h6>
                </CardData>
              </div>
              <p className="text-center">
                Los datos se muestran en tiempo real
              </p>
            </Card>
          </div>
          <div className="w-4/12 flex justiy-center">
            <Card
              title={"Coincidencias"}
              className={"bg-white"}
              classTitle="text-sqgreen-900 p-2"
              classBody={"w-full flex justify-center flex-col pb-2"}
            >
              <h1 className="mulishRegular text-center w-full text-1xl text-sqgreen-900">
                Porcentaje de coincidencia
              </h1>
              <div className="w-full flex justify-center ">
                <PieChart />
              </div>
              <p className="text-xs text-gray-700 m-2 text-center">
                Si los datos entre Central y POS tienen una diferencia de más
                del 10% favor de reportarlo
              </p>
              <div className="w-full flex justify-center items-center">
                <Button
                  title={"Reportar"}
                  className={"bg-sqgreen-900 text-white md:w-40"}
                />
              </div>
            </Card>
          </div>
        </div>
        <Card
          // title={"Data"}
          className={"mx-auto lg:w-11/12 md:w-11/12 mt-10 bg-white"}
          // classTitle="p-4 mulishBold text-sqgreen-900 text-2xl"
          classBody={"flex"}
          classHR={"hidden"}
        >
          <div className="w-5/12 flex justify-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 w-10/12">
              <h1 className="mulishBold text-sqgreen-900 w-full m-2">POS</h1>
              <table className="w-full text-xs text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100">
                  <tr>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      Tabla
                    </th>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      Conteo
                    </th>
                  </tr>
                </thead>
                <tbody>{posLocal && renderPOSLocal()}</tbody>
              </table>
            </div>
          </div>
          <div className="w-5/12 flex justify-center ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 w-10/12">
              <h1 className="mulishBold text-sqgreen-900 w-full m-2">
                CENTRAL
              </h1>
              <table className="w-full text-xs text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100">
                  <tr>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      Tabla
                    </th>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      Conteo
                    </th>
                  </tr>
                </thead>
                <tbody>{central && renderCentral()}</tbody>
              </table>
            </div>
          </div>
          <div className="w-2/12 flex flex-col items-center justify-center">
            <div>
              <Button
                title=""
                icon={faRecycle}
                className={"bg-sqgreen-900 w-10 rounded"}
              />
              <span className="text-gray-700 text-small">Actualizar</span>
            </div>
            <div className="mt-6">
              <Button
                title=""
                icon={faBullhorn}
                className={"bg-sqgreen-900 w-10 rounded"}
              />
              <span className="text-gray-700 text-small">Reportar</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
