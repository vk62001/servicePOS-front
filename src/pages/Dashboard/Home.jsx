import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePOSL } from "../../store/data";
import "leaflet/dist/leaflet.css";

import { MapaTienda } from "../../components/MapaTienda";

export const Home = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-start h-full">
      <div className="flex  pt-2 justify-start w-full h-screen">
        <MapaTienda />
      </div>
    </div>
  );
};
