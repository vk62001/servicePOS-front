import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import {
  faBullhorn,
  faEye,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCentralTables, startLoader, stopLoader } from "../../store/data";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { CardData } from "../../components/CardData";
import { PieChart } from "../../components/PieChart";
import { APISQZeus } from "../../SDK/instanceZeuz";
import { SDKZeus } from "../../SDK/SDKZeus";
import { LineChart } from "../../components/LineChart";

export const Monitor = () => {
  const { socketApp } = useContext(SocketContext); //este es el socket para conectarnos
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { centralTables, socketTiendas } = useSelector(
    (state) => state.dataSlice
  );

  const [central, setCentral] = useState([]);
  const [posLocal, setPosLocal] = useState([]);
  const [truePercentage, setTruePercentage] = useState(0);
  const [badPercentage, setBadPercentage] = useState(0);
  const [totalRegisterPOS, setTotalRegisterPOS] = useState(0);
  const [totalRegisterCentral, setTotalRegisterCentral] = useState(0);
  const [dataYesterday, setDataYesterday] = useState([]);

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

  useEffect(() => {
    if (Object.keys(socketTiendas).length > 0) {
      const sockeTiendaId = filterSocketTienda();
      console.log(sockeTiendaId);
      const objSockets = {
        // monitorId: socketApp.current.id,
        socketTiendaId: sockeTiendaId[0].id,
        tiendaId: sockeTiendaId[0].tienda,
      };
      console.log(socketApp, sockeTiendaId, "datos de socket");
      socketApp.current.emit("getCountRegistros", objSockets); //Se emite el evento hacia serverPOs-Central
      socketApp.current.on("setCountRegistros", (data) => {
        // Recibe informacion de serverPOs-Central
        // showPOS(data);
        getcountInfo(data);
      });

      getExistenciasTienda();
    }
    return () => {};
  }, [socketTiendas]);

  const getExistenciasTienda = () => {
    if (Object.keys(socketTiendas.filter((e) => e.tiendaId != 1)).length > 0) {
      const sockeTiendaId = filterSocketTienda();
      const objSockets = {
        socketTiendaId: sockeTiendaId[0].id,
        tiendaId: sockeTiendaId[0].tienda,
      };
      socketApp.current.emit("getExistencias", objSockets); //Se emite el evento hacia serverPOs-Central
      socketApp.current.on("setExistencias", (data) => {
        console.log(data.data, "Existencias Tienda");
      });
    }
  };

  const getcountInfo = async (data) => {
    try {
      await dispatch(startLoader());
      //const { data } = await SDKZeus.getCountInfo(id);
      console.log(data.data, "Datos de hoy");
      setCentral(data.data);
      // setPosLocal(data.data.countTienda);
      const Central = data.data;
      const Tienda = data.data.countTienda;
      const total = Object.keys(Central).length - 2;
      let totalTemp = 0;
      let totalCentral = 0;
      let totalPOS = 0;
      for (const i in Central) {
        if (i !== "Count" && i !== "id") {
          console.log(Central[i].Tienda, "row----");
          totalCentral = totalCentral + Central[i].Central;
          if (Central[i].Central === Central[i].Tienda) {
            totalTemp += 1;
          }
          totalPOS = totalPOS + Central[i].Tienda;
        }
      }
      console.log(total, totalTemp, totalCentral, totalPOS);
      const godPercentage = (totalTemp * 100) / total;
      setTruePercentage(godPercentage);
      setBadPercentage(100 - godPercentage);
      console.log(totalCentral, "+", totalPOS);
      setTotalRegisterCentral(totalCentral);
      setTotalRegisterPOS(totalPOS);
    } catch (err) {
      console.log(err);
    }
    await dispatch(stopLoader());
  };

  const getCountInfoYesterday = async () => {
    try {
      const { data } = await SDKZeus.getCountYesterday(id);
      console.log(data.data, "datos dia anterior");
      setDataYesterday(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getcountInfo();
    getCountInfoYesterday();
    return () => {};
  }, []);

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
      <div className="flex flex-col pt-2 justify-start w-full h-screen">
        <div className="w-full flex mt-24">
          <div className="w-7/12">
            <Card
              title={`Tienda: ${state}`}
              className=" justify-center mx-auto lg:w-11/12 md:w-11/12 bg-white h-96"
              classTitle="p-4 mulishBold text-sqgreen-900 text-2xl"
              classBody={"flex flex-wrap justify-around"}
            >
              <div className="w-full">
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
