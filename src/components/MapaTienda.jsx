import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Card } from './Card'
import { useSelector } from 'react-redux'

export const MapaTienda = () => {
    const { tiendas} = useSelector((state) => state.dataSlice);


    const renderTiendasMap = () => {
        return tiendas.map(e=> {
          const position = [e.latitud, e.longitud];
          if(e.latitud){
            return <Marker position={position} >
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
                <Marker position={[20.5946523, -100.3804233]}>
                    Tienda
                    <Popup>
                        Tienda
                    </Popup>
                </Marker>
            </MapContainer>
        </Card>
    )
}
