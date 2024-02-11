import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  ImageOverlay,
  LayersControl,
  Circle,
  useMap,
  CircleMarker,
} from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
import '../../../node_modules/leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { access } from 'components/SharedLayout/SharedLayout.jsx';

import buildings from './../../layers/fixBuildings.json';
import boundary from './../../layers/boundary.json';
import geoOldData from './../../layers/obsPointsGammaOld.json';
import newObs from './../../layers/front-end-colection-2024.json';
import { geoFetch } from './../../firebase/sdk';
import { useState, useEffect } from 'react';
import { GeoDataBox } from './GeoDataBox/GeoDataBox';
import { notifyToast } from 'components/Notify/notifyPropertyCode';
import { GeoLocation } from './GeoLocation/GeoLocation';
import iconSvg from './../../img/SVG/human-target-svgrepo-com.svg';
import { Legend } from './Legend/Legend';

const layersListForShowLegend = [
  'Gamma dose rate for 2016, μSv/h',
  'Old observations (2011-2016)',
  'Gamma dose rate for 2024, μSv/h',
  'New observation 2023-2024',
];

export const Maps = () => {
  const [geoData, setGeoData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarker, setLocationMarker] = useState(false);
  const [viewLegend, setViewLegend] = useState([]);

  const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
  };

  const MapEvents = () => {
    const layerFilter = layerName => {
      const arr = layersListForShowLegend.filter(item =>
        item.includes(layerName)
      );
      const [el] = arr;
      return el;
    };

    useMapEvents({
      overlayadd: e => {
        const result = layerFilter(e.name);
        if (result) {
          setViewLegend(prev => [...prev, result.toString()]);
        }
      },
      overlayremove: e => {
        const result = layerFilter(e.name);
        if (result) {
          setViewLegend(prev =>
            prev.filter(item => item !== result.toString())
          );
        }
      },
    });
    return null;
  };

  const locationIcon = L.icon({
    iconUrl: iconSvg,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  const createColor = (val) => {    
      if (val === 1) {
        return '#006420';
      } else if (val === 2) {
        return '#b1bd40';
      } else if (val === 3) {
        return '#fdec00';
      } else if (val === 4) {
        return '#ff0415';
      } else if (val === 5) {
        return '#8f384c';
      } else if (val === 6) {
        return '#800085';
      } else {
        return '#45024b';
      }   
  }

  const roundFn = function (num) {
    if (num >= 2.1) {
      num = num.toFixed(1);
    } else {
      num = num.toFixed(2);
    }
    return num;
  };

  const setIcon = (feature, latlng) => {    
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: createColor(feature.properties.colorID),
      color: '#FFFFFF',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  };

  let obtainData = async function (e) {
    const geoCoordinates = e.latlng;
    const { lat, lng } = geoCoordinates;

    const sitePosition = e.originalEvent;
    const { layerX, layerY, clientX, clientY } = sitePosition;

    const options = e.target;
    const id = options.feature.properties.ID;
    if (access) {
      try {
        const data = await geoFetch(id);
        notifyToast('success', 'Successful request to the database!');
        let obj = {
          id: id,
          lat: lat,
          lng: lng,
          positionX: layerX,
          positionY: layerY,
          clientX: clientX,
          clientY: clientY,
          AEDR01: data.AEDR_01,
          AEDR1: data.AEDR_10,
          alfaDF: data.Alfa_DF,
          betaDF: data.Beta_DF,
        };
        setGeoData(() => obj);
      } catch (error) {
        notifyToast('error', 'Request error!');
        return;
      }
    } else {
      let obj = {
        id: id,
        lat: lat,
        lng: lng,
        positionX: layerX,
        positionY: layerY,
        clientX: clientX,
        clientY: clientY,
      };
      setGeoData(() => obj);
    }
  };

  const onEachFeatureBuldings = (feature, layer) => {
    let number = feature.properties.Number;
    let enterprise = feature.properties.Enterprise_;
    let text;
    let text2
    if (number !== null) {
      text = number;
    } else {
      text = 'No data';
    }
    if (enterprise !== null) {
      text2 = enterprise;
    } else {
      text2 = 'No data';
    }
    layer
      .bindPopup(`<b>Buildings No:</b> ${text.toString()}; </br>
       <b>Enterprise:</b> ${text2}`)
    
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: obtainData,
    });
  };

  return (
    <div
      style={{
        height: '100%',
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
          <LayersControl.BaseLayer checked name="Mapbox Satellite" children="">
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={
                'pk.eyJ1IjoiMDAwMC0wMDAxLTgwMjUtODg4NSIsImEiOiJjbHFhdjNqY2ExZHZyMnJueHJmeXc1ZHduIn0.WsmLYujm4HrDa-K-VjJ2xA'
              }
            />
            </LayersControl.BaseLayer> 
          <LayersControl.BaseLayer name="Open Street Maps (OSM)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />        
          </LayersControl.BaseLayer>
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
           <LayersControl.Overlay name="DEM (0-132m)">
            <ImageOverlay
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/layers/DEM.webp"
              bounds={[
                [48.4905, 34.6541],
                [48.50866, 34.6994],
              ]}
              opacity={0.5}
            ></ImageOverlay>
          </LayersControl.Overlay>
<LayersControl.Overlay name="Buldings">
            <GeoJSON
              data={buildings.features}
              style={{
                color: "#ff09b5",
                capasity: 1.0,
              }}
              onEachFeature={onEachFeatureBuldings}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Gamma dose rate for 2016, &mu;Sv/h">
            <ImageOverlay
              url="https://github.com/holiaka/Contamination-maps-Kamyanske/blob/main/src/layers/png-gamma-modified.png?raw=true"
              bounds={[
                [48.492114, 34.658991],
                [48.5071325, 34.694015],
              ]}
              opacity={0.5}
            ></ImageOverlay>
          </LayersControl.Overlay>          
          <LayersControl.Overlay name="Old observations (2011-2016)">
            <MarkerClusterGroup maxClusterRadius={40}>              
              {geoOldData.map((point, index) => (
                <CircleMarker
                  key={index}
                  center={[point.lat, point.lon]}
                  radius={3}
                  color={createColor(point.colorID)}
                >
                  <Popup>
                    <b>Equvivalent dose rate: </b>
                    {roundFn(point.gamma)}
                  </Popup>
                </ CircleMarker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Gamma dose rate for 2024, &mu;Sv/h">
            <ImageOverlay
              url="https://github.com/holiaka/Contamination-maps-Kamyanske/blob/main/src/layers/png-gamma-modified.png?raw=true"
              bounds={[
                [48.492114, 34.658991],
                [48.5071325, 34.694015],
              ]}
              opacity={0.5}
            ></ImageOverlay>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="New observation 2023-2024">
            <MarkerClusterGroup maxClusterRadius={40}>
              <GeoJSON
                data={newObs}
                pointToLayer={setIcon}
                onEachFeature={onEachFeature}
              ></GeoJSON>
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {geoData ? (
          <GeoDataBox geoData={geoData} setGeoData={setGeoData}></GeoDataBox>
        ) : null}
        {locationMarker && userLocation ? (
          <>
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={locationIcon}
            >
              <Popup>
                <p>
                  <b>Latitude, &deg;: </b>
                  {userLocation.latitude}
                </p>
                <p>
                  <b>Longitude, &deg;: </b>
                  {userLocation.longitude}
                </p>
                <p>
                  <b>Accuracy, m: </b>
                  {roundFn(userLocation.accuracy)}
                </p>
                <p>
                  <b>Date: </b>
                  {userLocation.date}
                </p>
                <p>
                  <b>Time: </b>
                  {userLocation.time}
                </p>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.latitude, userLocation.longitude]}
              radius={userLocation.accuracy}
              color="#fc0edc"
            ></Circle>
          </>
        ) : null}
        <GeoLocation
          setLocation={setUserLocation}
          marker={locationMarker}
          setMarker={setLocationMarker}
        />
        {locationMarker && userLocation ? (
          <RecenterAutomatically
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
        ) : null}
        {viewLegend.length > 0 ? <Legend /> : null}
        <MapEvents />
      </MapContainer>
    </div>
  );
};
