import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import {
  faBullhorn,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { startLoader, stopLoader } from "../../store/data";
import { useLocation, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { PieChart } from "../../components/PieChart";
import { SDKZeus } from "../../SDK/SDKZeus";
import { LineChart } from "../../components/LineChart";
import { Modal } from "../../components/Modal";
import { delay } from "../../utils/utils";

export const Monitor = () => {
  const { socketApp } = useContext(SocketContext); //este es el socket para conectarnos
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { socketTiendas } = useSelector(
    (state) => state.dataSlice
  );

  const [central, setCentral] = useState([]);
  const [truePercentage, setTruePercentage] = useState(0);
  const [badPercentage, setBadPercentage] = useState(0);
  const [dataYesterday, setDataYesterday] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataPOS, setDataPOS] = useState([]);
  const [dataTienda, setDataTienda] = useState([])
  const [render, setRender ] = useState(false);
    const posTemp = useRef([]);



  const filterSocketTienda = () => {
    return socketTiendas.filter((e) => e.tienda === id);
  };

  const renderInventario = () => {  
    if(Object.keys(dataPOS).length===0)return;
    return dataPOS.map((e, i) => {
      return (
        <tr key={i} className="">
          <td className="text-xs text-gray-700">{e.producto_Id}</td>
          <td className="text-xs text-gray-700">{e.descripcion_larga}</td>
          <td className="text-xs text-gray-700 text-center">{e.existencia}</td>
        </tr>
      );
    });
  };
  const renderInventarioTienda = () => {  
    if(Object.keys(dataTienda).length===0)return;
    return dataTienda.map((e, i) => {
      return (
        <tr key={i} className="">
          <td className="text-xs text-gray-700">{e.producto_Id}</td>
          <td className="text-xs text-gray-700">{e.descripcion_larga}</td>
          <td className="text-xs text-gray-700 text-center">{e.existencia}</td>
        </tr>
      );
    });
  };



  const getExistenciasTienda = () => {
    if (Object.keys(socketTiendas.filter((e) => e.tiendaId != 1)).length > 0) {
      const sockeTiendaId = filterSocketTienda();
      if(Object.keys(sockeTiendaId).length===0)return;
      const objSockets = {
        socketTiendaId: sockeTiendaId[0].id,
        tiendaId: sockeTiendaId[0].tienda,
      };
      socketApp.current.emit("getExistencias", objSockets); //Se emite el evento hacia serverPOs-Central
      socketApp.current.on("setExistencias", (data) => {
          setDataPOS(data.data);
          posTemp.current = data.data;
      });
    }
  };

  const getExistenciasCentral = () => {
    if (Object.keys(socketTiendas.filter((e) => e.tiendaId != 1)).length > 0) {
      const sockeTiendaId = filterSocketTienda();
      if(Object.keys(sockeTiendaId).length===0)return;
      const objSockets = {
        tiendaId: sockeTiendaId[0].tienda,
      };
      socketApp.current.emit("getExistenciasCentral", objSockets); //Se emite el evento hacia serverPOs-Central
      socketApp.current.on("setExistenciasCentral", (data) => {
        setDataTienda(data.data);
      });
    }
  };


  const stopCharge = async() => {
    await delay(5000);
      dispatch(stopLoader());
  }

  useEffect(() => {
    dispatch(startLoader());
    if(render){
      dispatch(stopLoader());
    }
    setRender(true);
    stopCharge()
  }, [central]);

  const filter = (text) => {
    if (text.length === 0) {
      setDataPOS(posTemp.current);
      return;
    };
    const tempValue = posTemp.current.filter(element => (element.descripcion_larga.toLowerCase().includes(text.toLowerCase()) ));
    setDataPOS(tempValue);
  };

  const getcountInfo = async (data) => {
    try {
      setCentral(data.data);
      const Central = data.data;
      const total = Object.keys(Central).length - 2;
      let totalTemp = 0;
      let totalCentral = 0;
      let totalPOS = 0;
      for (const i in Central) {
        if (i !== "Count" && i !== "id") {
          totalCentral = totalCentral + Central[i].Central;
          if (Central[i].Central === Central[i].Tienda) {
            totalTemp += 1;
          }
          totalPOS = totalPOS + Central[i].Tienda;
        }
      }
      const godPercentage = (totalTemp * 100) / total;
      setTruePercentage(godPercentage);
      setBadPercentage(100 - godPercentage);
      delay(1000);
    } catch (err) {
      console.log(err);
    };
  };

  const getCountInfoYesterday = async () => {
    try {
      const { data } = await SDKZeus.getCountYesterday(id);
      setDataYesterday(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataLog = () => {
    const sockeTiendaId = filterSocketTienda();
    const objSockets = {
      socketTiendaId: sockeTiendaId[0].id,
      tiendaId: sockeTiendaId[0].tienda,
    };
    socketApp.current.emit('activeGetDataLogManually', objSockets);
  }


  useEffect(() => {
    getCountInfoYesterday();
    return () => {};
  }, []);


  useEffect(() => {
    getExistenciasTienda();
    getExistenciasCentral();
    if (Object.keys(socketTiendas).length > 0) {
      const sockeTiendaId = filterSocketTienda();
      if(Object.keys(sockeTiendaId).length===0)return;
      console.time("getCountRegistros");

      const objSockets = {
        socketTiendaId: sockeTiendaId[0].id,
        tiendaId: sockeTiendaId[0].tienda,
      };
      socketApp.current.emit("getCountRegistros", objSockets); //Se emite el evento hacia serverPOs-Central
      socketApp.current.on("setCountRegistros", async (data) => {
        await getcountInfo(data);
      });
      console.timeEnd("getCountRegistros");
    }
    return () => {};
  }, [socketTiendas]);


  const renderDataCount = () => {
    if (Object.keys(central).length === 0) return;
    return Object.entries(central).map(([key, value]) => {
      if (key !== "Count" && key !== "id") {
        const bgColor =
          value.Central === value.Tienda ? "" : "bg-[#E30609] text-white";
        return (
          <tr className={"border-b border-gray-200  " + bgColor} key={key}>
            <th className="text-center py-1">{key.toUpperCase()}</th>
            <td className="text-center py-1">{value.Central}</td>
            <td className="text-center py-1">{value.Tienda}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="mulishRegular bg-gray-100 flex flex-col justify-start h-full">
      <div className="flex flex-col pt-2 justify-start w-full min-h-screen h-full">
      <div className="w-full flex mt-24 justify-center">
          <div className="w-7/12">
            <Card
              title={`Tienda: ${state ? state : id}`}
              className=" justify-center mx-auto lg:w-11/12 md:w-11/12 bg-white h-96"
              classTitle="p-4 mulishBold text-sqgreen-900 text-2xl"
              classBody={"flex flex-wrap justify-around h-80"}
            >
            <div className="flex w-full h-full justify-center">
                <LineChart dataYesterday={dataYesterday} />
              </div>
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
                <PieChart
                  goodPercentage={truePercentage}
                  badPercentage={badPercentage}
                />
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
          <div className="w-10/12 flex justify-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 w-10/12">
              <h1 className="mulishBold text-sqgreen-900 w-full m-2 text-center">
                DATOS ACTUALES
              </h1>
              <table className="w-full text-xs text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100">
                  <tr>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      Tabla
                    </th>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      CENTRAL
                    </th>
                    <th scope="col" className={"w-1/12 py-3  text-center"}>
                      TIENDA
                    </th>
                  </tr>
                </thead>
                <tbody>{central && renderDataCount()}</tbody>
              </table>
            </div>
          </div>
          <div className="w-2/12 flex flex-col items-center justify-center">
            <div>
              <Button
                title=""
                icon={faRecycle}
                className={"bg-sqgreen-900 w-10 rounded"}
                onClick={getDataLog}
              />
              <span className="text-gray-700 text-small">Actualizar</span>
            </div>
            <div className="mt-6">
              <Button
                title=""
                icon={faBullhorn}
                className={"bg-sqgreen-900 w-10 rounded"}
                onClick={() => setShowModal(true)}
              />
              <span className="text-gray-700 text-small">Productos</span>
            </div>
          </div>
        </Card>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"Inventario"}
      >
        <div className="flex justify-between" style={{maxHeight:750}}>
          <div className="w-5/12 h-3/4" style={{maxHeight:650}} >
            <h1 className="mulishBold text-sqgreen-900 w-full m-2 text-center">Tienda</h1>
            <input
              onChange={(e) => filter(e.target.value)} 
              className="w-11/12 mx-auto p-2 rounded-md border-2 border-gray-300" type="text" placeholder="Buscar producto" />
            <div className="relative sm:rounded-lg mt-8  max-h-128 overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100  sticky top-0 z-10">
                  <tr>
                  <th className={"w-1/12 py-3  text-center"}>ID</th>
                  <th className={"w-1/12 py-3  text-center"}>Descripción</th>
                  <th className={"w-1/12 py-3  text-center"}>Can.</th>
                </tr>
              </thead>
              <tbody>
                {renderInventario()}
              </tbody>
            </table>
            </div>
          </div>
          <div className="relative w-5/12">
            <h1 className="mulishBold text-sqgreen-900 w-full m-2 text-center">Central</h1>
            <div className="relative sm:rounded-lg mt-8  max-h-128 overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100  sticky top-0 z-10">
                  <tr>
                  <th className={"w-1/12 py-3  text-center"}>ID</th>
                  <th className={"w-1/12 py-3  text-center"}>Descripción</th>
                  <th className={"w-1/12 py-3  text-center"}>Can.</th>
                </tr>
              </thead>
              <tbody>
                {renderInventarioTienda()}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
