// import { Suspense, lazy } from "react";

import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { selectError, selectIsLoading } from 'redux/contacts/selector';
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
import { Icon } from 'leaflet';

import buildings from './../../data/fixBuildings.json';
import boundary from './../../layers/boundary.json';
import geoData from './../../data/obsPointsGammaOld.json';

export const Maps = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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

  // const bounds = new LatLngBounds([48.492, 34.6585], [48.5075, 34.694])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>        
        
        <h2
          style={{
            margin: 0,
            fontSize: '28px',
            textAlign: 'center',
          }}
        >
          Contacts
        </h2>
        
        {isLoading && <Loader></Loader>}
        {!isLoading && !error && <MapContainer></MapContainer>}
        {!isLoading && error && <Error></Error>}
        <MapContainer
          center={[48.5, 34.68]}
          zoom={14}
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
              <LayersControl.BaseLayer checked name="Mapbox Satellite" children=''>
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
              <LayersControl.Overlay chacked name="Boundary of Prydniprovsky Chemical Plant">
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
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};
