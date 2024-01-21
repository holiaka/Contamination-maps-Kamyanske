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
import L, { Icon } from 'leaflet';

import buildings from './../../layers/fixBuildings.json';
import boundary from './../../layers/boundary.json';
import geoOldData from './../../layers/obsPointsGammaOld.json';
import newObs from './../../layers/experement.json';
import { geoFetch } from './../../firebase/sdk';
// import newObs2 from './../../layers/Regular_points_experement_2.json';
import { useState, useEffect } from 'react';
import { GeoDataBox } from './GeoDataBox/GeoDataBox';
import { notifyToast } from 'components/Notify/notifyPropertyCode';

export const Maps = () => {
  const [geoData, setGeoData] = useState(null);

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
      fillColor: '#FF0000',
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
  };


  const onEachFeatureBuldings = (feature, layer) => {
    let number = feature.properties.Number;
    let text;
    if (number !== null) {
      text = number;
    } else {
      text = 'No data';
    }
    layer.bindTooltip(text.toString(), { permanent: true, direction: 'center'} ).openTooltip();
  };    

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: obtainData,
    });
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
              onEachFeature={onEachFeatureBuldings}
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
              {geoOldData.features.map((point, index) => (
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
              <GeoJSON
                data={newObs}
                pointToLayer={setIcon}
                onEachFeature={onEachFeature}
              ></GeoJSON>
            </MarkerClusterGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {geoData ? <GeoDataBox geoData={geoData} setGeoData={setGeoData}></GeoDataBox> : null}
      </MapContainer>
    </div>
  );
};
