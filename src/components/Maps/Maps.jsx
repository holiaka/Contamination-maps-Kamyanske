// import { Suspense, lazy } from "react";

// import { Loader } from '../Loader/Loader';
// import { Error } from '../Error/Error';
// import { useSelector } from 'react-redux';
// import { selectIsLoading } from 'redux/contacts/selector';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  ImageOverlay,
  LayersControl,
} from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
/* import { GiRadioactive } from "react-icons/gi"; */
import  L, { Icon } from 'leaflet';


import buildings from './../../layers/fixBuildings.json';
import boundary from './../../layers/boundary.json';
import geoData from './../../layers/obsPointsGammaOld.json';
import newObs from './../../layers/experement.json';
// import newObs2 from './../../layers/Regular_points_experement_2.json';

export const Maps = () => {
  
  const customIcon = new Icon({
    iconUrl: require('./../../img/png/radiation-icon.png'),
    iconSize: [20, 20],
  });

  const roundFn = function (num) {
    if (num >= 2.1) {
      num = num.toFixed(1);
    } else {
      num = num.toFixed(2);
    }
    return num;
  };

  const setIcon = (_, latlng) => {
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: "#FF0000",
      color: "#FFFFFF",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  });
  };

  
  const onEachFeature = (feature, layer) => {
    let id = feature.properties.ID;
    layer.bindPopup(`ID point: ${id}`);
  };


  

  return (
    <div
      style={{
        height: '85vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',        
        color: '#010101',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <MapContainer
        center={[48.5, 34.68]}
        zoom={15}
        style={{
          height: '100vh',
          width: '100%',
        }}
        minZoom={4}
        maxZoom={22}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Open Street Maps (OSM)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Mapbox Satellite" children="">
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={
                'pk.eyJ1IjoiMDAwMC0wMDAxLTgwMjUtODg4NSIsImEiOiJjbHFhdjNqY2ExZHZyMnJueHJmeXc1ZHduIn0.WsmLYujm4HrDa-K-VjJ2xA'
              }
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Gamma dose rate, mkSv/h">
            <ImageOverlay
              url="https://github.com/holiaka/Contamination-maps-Kamyanske/blob/main/src/layers/png-gamma-modified.png?raw=true"
              bounds={[
                [48.492114, 34.658991],
                [48.5071325, 34.694015],
              ]}
              opacity={0.5}
            ></ImageOverlay>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Buldings">
            <GeoJSON
              data={buildings.features}
              style={{
                capasity: 1.0,
              }}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            chacked
            name="Boundary of Prydniprovsky Chemical Plant"
          >
            <GeoJSON
              data={boundary}
              style={{
                color: '#f70101',
                capasity: 1.0,
              }}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Old observations (2016-2011)">
            <MarkerClusterGroup maxClusterRadius={40}>
              {geoData.features.map((point, index) => (
                <Marker
                  key={index}
                  position={[point.properties.lat, point.properties.lon]}
                  icon={customIcon}
                >
                  <Popup>
                    <b>Equvivalent dose rate: </b>
                    {roundFn(point.properties.gamma)}
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Radoaction obsarvation 2023-2024">
            <MarkerClusterGroup maxClusterRadius={40}>
              <GeoJSON data={newObs} pointToLayer={setIcon} onEachFeature={onEachFeature}></ GeoJSON>             
            </MarkerClusterGroup>
            </LayersControl.Overlay>            
        </LayersControl>
      </MapContainer>         
    </div>
  );
};
