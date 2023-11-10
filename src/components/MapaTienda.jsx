import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Card } from './Card'
import { useSelector } from 'react-redux'
import {Icon} from 'leaflet'
import IconGreen  from '../assets/images/marker-icon-green.png';
import IconRed  from '../assets/images/marker-icon-red.png';

export const MapaTienda = () => {
    const { tiendas} = useSelector((state) => state.dataSlice);

    const IconConnected= new Icon ({
        iconUrl : IconGreen,
        iconSize : [27, 37], // size of the icon
        iconAnchor : [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
      });


      const IconDisconnected= new Icon ({
        iconUrl : IconRed,
        iconSize : [27, 37], // size of the icon
        iconAnchor : [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

    const renderTiendasMap = () => {
        return tiendas.map(e=> {
          const position = [e.latitud, e.longitud];
          if(e.latitud){
            return <Marker position={position} icon={e.connected? IconConnected:IconDisconnected} >
              <Popup>
                  {e.descripcion}
                  </Popup>
            </Marker>
          }
        })
      }

    return (
        <Card
            title={"Mapa"}
            className={"mt-24 justify-center mx-auto lg:w-11/12"}
        >
            <MapContainer center={[20.612132, -100.4515026]} zoom={9.4} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderTiendasMap()}
            </MapContainer>
        </Card>
    )
}
