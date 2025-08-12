import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
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
// import { Link } from 'react-router-dom';

import buildings from './../../layers/building.json';
import controlledZones from './../../layers/controled-zones.json';
import tailing from './../../layers/tailing.json';
import boundary from './../../layers/boundary.json';
import geoOldData from './../../layers/obsPointsGammaOld.json';
import newObs from './../../layers/front-end-colection-2024.json';
import samples from './../../layers/samplesOnTeritories.json';
import { geoFetch } from './../../firebase/sdk';
import { useState, useEffect } from 'react';
import { GeoDataBox } from './GeoDataBox/GeoDataBox';
import { notifyToast } from 'components/Notify/notifyPropertyCode';
import { GeoLocation } from './GeoLocation/GeoLocation';
import iconSvg from './../../img/SVG/human-target-svgrepo-com.svg';
import { Legend } from './Legend/Legend';

const layersListForShowLegend = [
  'Old observations (2011-2016)',
  'Gamma dose rate at a height (H) of 1.0 m in 2016, μSv/h',
  'Gamma dose rate at H of 0.1 m in 2024, μSv/h',
  'Gamma dose rate at H of 1.0 m in 2024, μSv/h',
  'Beta-particles flex at H of 0.1 m in 2024, pcs/sq.m/min',
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

  const createColor = val => {
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
  };

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

  const buildingStyle = feature => {
    if (feature.properties.Obs) {
      return {
        color: '#eb0ac6',
        capasity: 1.0,
      };
    } else {
      return {
        color: '#0acaca',
        capasity: 0.6,
      };
    }
  };

  const onEachFeatureZones = (feature, layer) => {
    let name = feature.properties.Name;
    layer.bindTooltip(`<b>Controlled zone: ${name.toString()}<b/>`, {
      permanent: false,
      opacity: 0.7,
    });
  };

  const onEachFeatureTailing = (feature, layer) => {
    let name = feature.properties.Name;
    layer.bindTooltip(
      `<b style="color:white; background:black; display:inline-block;">Tailing: ${name.toString()}<b/>`,
      {
        opacity: 1.0,
      }
    );
  };

  const { origin, pathname } = window.location;
  let address = `${origin}${pathname}`;
  if (address[address.length - 1] === '/') {
    address = address.slice(0, -1);
  }

  const onEachFeatureBuldings = (feature, layer) => {
    let number = feature.properties.Number;
    let enterprise = feature.properties.Enterprise;
    let obs = feature.properties.Obs;
    let text;
    let text2;
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

    let buildingLink = '';
    if (obs !== null) {
      buildingLink = `<a href="${address}/buildings?key=${obs}">Go to Building Info</a>`;
    } else {
      buildingLink = `<b>There is no description!!!</b>`;
    }

    layer.bindPopup(`<b>Building No:</b> ${text.toString()}; </br>
       <b>Enterprise:</b> ${text2} </br>       
       ${buildingLink}`);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: obtainData,
    });
  };

  const onEachFeatureSampels = (feature, layer) => {
    let { ID: id,
      Aim: aim,
      Material: material,
      Depth: depth,
      AEDR_10: aedr10,
        Act: act,
        Passport: passport,
        Anomal: anomal,
        AC_210Pb: ac_210Pb,
        AC_238U: ac_238U,
        AC_230Th: ac_230Th,
        AC_235U: ac_235U,
        AC_226Ra: ac_226Ra,
        AC_228Th: ac_228Th,
        AC_232Th: ac_232Th,
        AC_40K: ac_40K,
        AC_137Cs: ac_137Cs,
        All_alfa_A: all_alfa_a,
        All_beta_A: all_beta_a,
        As_mg_kg: cAs_mg_kg,
        Cd_mg_kg: cCd_mg_kg,
        Co_mg_kg: cCo_mg_kg,
        Cr_mg_kg: cCr_mg_kg,
        Cu_mg_kg: cCu_mg_kg,
        Fe_mg_kg: cFe_mg_kg,
        Se_mg_kg: cSe_mg_kg,
        Mn_mg_kg: cMn_mg_kg,
        Ni_mg_kg: cNi_mg_kg,
        Pb_mg_kg: cPb_mg_kg,
        Ti_mg_kg: cTi_mg_kg,
        V_mg_kg: cV_mg_kg,
        Zn_mg_kg: cZn_mg_kg,
        Hg_mg_kg: cHg_mg_kg,
        Notes: notes,
     } = feature.properties;

    let idText = id ?? 'No data';
    let aimText = aim ?? 'No data'
     let materialText = material ?? 'No data';
let depthText = depth ?? 'No data';
let aedr10Text = aedr10 ?? 'No data';
let actText = act ?? 'No data';
let passportText = passport ?? 'No data';
let anomalText = anomal ?? 'No data';
let ac_210PbText = ac_210Pb ?? 'No data';
let ac_238UText = ac_238U ?? 'No data';
let ac_230ThText = ac_230Th ?? 'No data';
let ac_235UText = ac_235U ?? 'No data';
let ac_226RaText = ac_226Ra ?? 'No data';
let ac_228ThText = ac_228Th ?? 'No data';
let ac_232ThText = ac_232Th ?? 'No data';
let ac_40KText = ac_40K ?? 'No data';
let ac_137CsText = ac_137Cs ?? 'No data';
let all_alfa_aText = all_alfa_a ?? 'No data';
let all_beta_aText = all_beta_a ?? 'No data';
let cAs_mg_kgText = cAs_mg_kg ?? 'No data';
let cCd_mg_kgText = cCd_mg_kg ?? 'No data';
let cCo_mg_kgText = cCo_mg_kg ?? 'No data';
let cCr_mg_kgText = cCr_mg_kg ?? 'No data';
let cCu_mg_kgText = cCu_mg_kg ?? 'No data';
let cFe_mg_kgText = cFe_mg_kg ?? 'No data';
let cSe_mg_kgText = cSe_mg_kg ?? 'No data';
let cMn_mg_kgText = cMn_mg_kg ?? 'No data';
let cNi_mg_kgText = cNi_mg_kg ?? 'No data';
let cPb_mg_kgText = cPb_mg_kg ?? 'No data';
let cTi_mg_kgText = cTi_mg_kg ?? 'No data';
let cV_mg_kgText = cV_mg_kg ?? 'No data';
let cZn_mg_kgText = cZn_mg_kg ?? 'No data';
let cHg_mg_kgText = cHg_mg_kg ?? 'No data';
let notesText = notes ?? 'No data'; 


    layer.bindPopup(`<b>Point ID:</b> ${idText.toString()} </br>
    <b>Aim:</b> ${aimText.toString()} </br>
    <b>Material:</b> ${materialText.toString()} </br>
    <b>Sample depth:</b> ${depthText.toString()} m</br>
    <b>AEDR at h=0.1 m:</b> ${aedr10Text.toString()} mkSv/h</br>
    <b>Act No</b> ${actText.toString()} </br>
    <b>Passport No:</b> ${passportText.toString()} </br>
    <b>Anomal area:</b> ${anomalText.toString()} </br>
<b>Pu-210 activity concentration:</b> ${ac_210PbText.toString()} </br>
<b>U-238 activity concentration:</b> ${ac_238UText.toString()} </br>
<b>Th-230 activity concentration:</b> ${ac_230ThText.toString()} </br>
<b>U-235 activity concentration:</b> ${ac_235UText.toString()} </br>
<b>Ra-226 activity concentration:</b> ${ac_226RaText.toString()} </br>
    <b>Th-228 activity concentration:</b> ${ac_228ThText.toString()} </br>
    <b>Th-232 activity concentration:</b> ${ac_232ThText.toString()} </br>
    <b>K-40 activity concentration:</b> ${ac_40KText.toString()} </br>
<b>Cs-137 activity concentration:</b> ${ac_137CsText.toString()} </br>
<b>Total alfa activity:</b> ${all_alfa_aText.toString()} mg/kg(1E-6)</br>
<b>Total beta activity:</b> ${all_beta_aText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of As:</b> ${cAs_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Cd:</b> ${cCd_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Co:</b> ${cCo_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Cr:</b> ${cCr_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Cu:</b> ${cCu_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Fe:</b> ${cFe_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Se:</b> ${cSe_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Mn:</b> ${cMn_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Ni:</b> ${cNi_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Pb:</b> ${cPb_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Ti:</b> ${cTi_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of V:</b> ${cV_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Zn:</b> ${cZn_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Mass fraction of Hg:</b> ${cHg_mg_kgText.toString()} mg/kg(1E-6)</br>
<b>Notes:</b> ${notesText.toString()} </br>
    `);
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
        center={[48.495, 34.68]}
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
            checked
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
          <LayersControl.Overlay name="Controlled zones">
            <GeoJSON
              data={controlledZones}
              style={{
                fillColor: '#fbff00',
                color: '#eede05',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.2,
              }}
              onEachFeature={onEachFeatureZones}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Tailings">
            <GeoJSON
              data={tailing}
              style={{
                color: '#000000',
                colorFill: '#000000',
                capasity: 1.0,
              }}
              onEachFeature={onEachFeatureTailing}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Buildings">
            <GeoJSON
              data={buildings.features}
              style={buildingStyle}
              onEachFeature={onEachFeatureBuldings}
            ></GeoJSON>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="DEM (0-112m)">
            <TileLayer
              attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/tiles/DEM/{z}/{x}/{y}.webp"
              tms="true"
              opacity={0.6}
              minZoom={4}
              maxZoom={22}
            />
          </LayersControl.Overlay>
          {access ? (<LayersControl.Overlay name="Gamma dose rate at a height (H) of 1.0 m in 2016, &mu;Sv/h">
            <TileLayer
              attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/tiles/old-gamma-100cm/{z}/{x}/{y}.webp"
              tms="true"
              opacity={0.6}
              minZoom={4}
              maxZoom={22}
            />
          </LayersControl.Overlay>) : (<></>)}
          {access ? (<LayersControl.Overlay name="Old observations (2011-2016)">
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
                </CircleMarker>
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>) : (<></>)}
          {access ? (<LayersControl.Overlay name="Gamma dose rate at H of 0.1 m in 2024, &mu;Sv/h">
            <TileLayer
              attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/tiles/new-gamma-10cm/{z}/{x}/{y}.webp"
              tms="true"
              opacity={0.6}
              minZoom={4}
              maxZoom={22}
            />
          </LayersControl.Overlay>) : (<></>)}
          {access ? (<LayersControl.Overlay name="Gamma dose rate at H of 1.0 m in 2024, &mu;Sv/h">
            <TileLayer
              attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/tiles/new-gamma-100cm/{z}/{x}/{y}.webp"
              tms="true"
              opacity={0.6}
              minZoom={4}
              maxZoom={22}
            />
          </LayersControl.Overlay>) : (<></>)}
          {access ? (<LayersControl.Overlay name="Beta-particles flex at H of 0.1 m in 2024, pcs/sq.m/min">
            <TileLayer
              attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
              url="https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/tiles/beta-10cm/{z}/{x}/{y}.webp"
              tms="true"
              opacity={0.6}
              minZoom={4}
              maxZoom={22}
            />
          </LayersControl.Overlay>) : (<></>)}
          {access ? (<LayersControl.Overlay name="New observation 2023-2024">
            <MarkerClusterGroup maxClusterRadius={40}>
              <GeoJSON
                data={newObs}
                pointToLayer={setIcon}
                onEachFeature={onEachFeature}
              ></GeoJSON>
            </MarkerClusterGroup>
          </LayersControl.Overlay>):(<></>)}
          {access ?(<LayersControl.Overlay checked name="Sample points">
            <GeoJSON
              data={samples}
              pointToLayer={(feature, latlng) => {
                return L.circleMarker(latlng, {
                  radius: 3, // Set circle size
                  fillColor: '#001aff',
                  color: '#161500',
                  opacity: 1,
                  fillOpacity: 0.2,
                });
              }}
              onEachFeature={onEachFeatureSampels}
            />
          </LayersControl.Overlay>):(<></>)}
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
