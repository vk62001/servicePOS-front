import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faChevronRight,
  faExclamationCircle,
  faSearch,
  faShop,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import BardCode from "../../assets/images/barCode.png";
import { LinkCard } from "../../components/LinkCard";
import { Input } from "../../components/Input";
import { RadioSearchPos } from "../../components/RadioSearchPos";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

export const Pos = () => {
  const { tiendas } = useSelector((state) => state.dataSlice);
  const [textTienda, setTextTienda] = useState("");
  const [tempTiendas, setTempTiendas] = useState([]);
  const [selectRadio, setSelectRadio] = useState("conectados");

  const filter = (text) => {
    setTextTienda(text);
    if (text.length === 0) {
      setTempTiendas(tiendas);
      return;
    }

    const newData = tiendas.filter(
      (element) =>
        element.id === +text ||
        element.descripcion.toLowerCase().includes(text.toLowerCase()) ||
        element.ciudad.toLowerCase().includes(text)
    );
    setTempTiendas(newData);
  };

  const filterRadio = () => {
    let comparation;
    switch (selectRadio) {
      case "todos":
        comparation = tiendas;
        break;
      case "conectados":
        comparation = tiendas?.filter((element) => element.connected);
        break;
      case "desconectados":
        comparation = tiendas?.filter((element) => !element.connected);
        break;
      default:
        break;
    }

    setTempTiendas(comparation);
  };

  useEffect(() => {
    setTextTienda("");
    filterRadio();
  }, [selectRadio]);

  useEffect(() => {
    if (textTienda.length > 0) {
      filter(textTienda);
      return;
    }
    if (selectRadio !== "todos" && textTienda.length === 0) {
      // console.log("entra filtro");
      filterRadio();
      return;
    }
    setTempTiendas(tiendas);
    return () => {
      setTempTiendas([]);
    };
  }, [tiendas]);

  const renderTiendas = () => {
    // if (tempTiendas?.length === 0) return;
    return tempTiendas?.map((e) => {
      const title = e.descripcion.split("-");
      return (
        <LinkCard
          to={`/monitor/${e.id}`}
          descripcion={e.descripcion}
          key={e.id}
          className={`xs:mb-2 xs:w-full cardShadow md:p-4 text-small cursor-pointer text-gray-700 md:w-52 xs:ml-0 md:ml-6 md:mt-4  bg-gray-100`}
        >
          <div className="flex items-center">
            <div className="xs:w-2/12 w-6/12 text-center">
              <FontAwesomeIcon
                icon={e.warning ? faExclamationCircle : faCheckCircle}
                className={`${
                  e.warning ? "text-gold-500" : "text-sqgreen-900"
                } text-2xl`}
              />
            </div>
            <div
              className={`w-6/12 tex-xs mulishBold  ${
                e.connected ? "text-sqgreen-900" : "text-red-600"
              }`}
            >
              <p className="text-small">ID {e.clave} </p>
              <p className="text-small">{title[1]} </p>
              <p className="text-small">{e.ciudad} </p>
            </div>
            <div className="w-4/12 text-center text-sqgreen-900">v: {e.versionPos?e.versionPos:'s/n'}</div>
            <div className="absolute right-2 justify-end md:invisible ">
              <FontAwesomeIcon icon={faChevronRight} className={`text-2xl text-sqgreen-900 `} />
            </div>
          </div>
          <div className="border border-b-1 border-gray-400 md:my-4 xs:my-0 xs:invisible md:visible" />
          <div
            className={`text-white text-center rounded-sm xs:invisible xs:h-0 md:h-4 md:visible ${
              e.connected ? "bg-sqgreen-900" : "bg-red-600"
            }`}
          >
            {e.connected ? "Activo" : "Inactivo"}
          </div>
          <p
            className={`xs:invisible xs:h-0 md:mb-2  md:visible text-center mt-2 text-sqgreen-900 underline  ${
              e.connected ? "text-sqgreen-900" : "text-red-600"
            }`}
          >
            <FontAwesomeIcon icon={faShop} /> Ver tienda
          </p>
        </LinkCard>
      );
    });
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-start h-full min-h-screen">
      <div className="flex  pt-2 justify-start w-full h-full">
        <Card
          title={"Tiendas"}
          className="mt-24 justify-center mx-auto xs:w-full md:w-11/12 lg:w-11/12 bg-white"
        >
          <div className="w-full flex xs:flex-col md:flex-row md:justify-between ">
            <div className="relative xs:w-full md:w-6/12 xs:p-3 md:p-1">
              <p className="text-gray-700 mulishRegular xs:text-sm md:text-md">
                Puedes filtrar por localidad o buscar por número de tienda.
              </p>
              <FontAwesomeIcon
                icon={faSearch}
                className="text-sqgreen-900 absolute md:left-4 md:top-14 xs:left-6 xs:top-16"
              />
              <Input
                placeholder={"Buscar tienda"}
                className={"xs:w-full md:w-72 rounded-md mt-6 bg-white h-8"}
                onChange={filter}
                value={textTienda}
              />
            </div>
            <div className="xs:w-full md:w-6/12 flex md:justify-end items-center md:mr-2">
              <RadioSearchPos
                selectRadio={setSelectRadio}
                value={selectRadio}
              />
            </div>
          </div>
          <div className="flex xs:flex-col md:flex-wrap md:flex-row xs:mt-2 mt-8 justify-center md:h-3/6 overflow-auto pb-5">
            {tempTiendas?.length !== 0 && renderTiendas()}
          </div>
        </Card>
      </div>
    </div>
  );
};
