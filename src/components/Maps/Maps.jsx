// import { Suspense, lazy } from "react";

import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { selectError, selectIsLoading } from 'redux/contacts/selector';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON} from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
/* import { GiRadioactive } from "react-icons/gi"; */
import { Icon,  } from 'leaflet';


import buildings from './../../data/fixBuildings.json';
import boundery from './../../data/bounderiesLine.json';
import geoData from './../../data/obsPointsGammaOld.json';

export const Maps = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const customIcon = new Icon({
    iconUrl: require ("./../../img/png/radiation-icon.png"),
    iconSize: [20, 20],
  })

  const roundFn = function (num) {
    if (num >= 2.1) {
      num = num.toFixed(1);
    } else {
      num = num.toFixed(2);      
    }
    return num;
  }

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
        <h1
          style={{
            margin: 0,
            fontSize: '36px',
            textAlign: 'center',
          }}
        >
          Phonebook
        </h1>
        <ContactForm></ContactForm>
        <h2
          style={{
            margin: 0,
            fontSize: '28px',
            textAlign: 'center',
          }}
        >
          Contacts
        </h2>
        <Filter></Filter>
        {isLoading && <Loader></Loader>}
        {!isLoading && !error && <ContactList></ContactList>}
        {!isLoading && error && <Error></Error>}
        <MapContainer
          center={[48.5, 34.65]}
          zoom={12}
          style={{
            height: '100vh',
            width: '100%',
          }}          
          minZoom = {4}
          maxZoom = {24}
        >
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />                
          <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={"pk.eyJ1IjoiMDAwMC0wMDAxLTgwMjUtODg4NSIsImEiOiJjbHFhdjNqY2ExZHZyMnJueHJmeXc1ZHduIn0.WsmLYujm4HrDa-K-VjJ2xA"}
          /> */}
          <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/v/mapbox.terrain-rgb/{z}/{x}/{y}{@2x}.pngraw?access_token={accessToken}"
              accessToken={"pk.eyJ1IjoiMDAwMC0wMDAxLTgwMjUtODg4NSIsImEiOiJjbHFhdjNqY2ExZHZyMnJueHJmeXc1ZHduIn0.WsmLYujm4HrDa-K-VjJ2xA"}
            />
          <GeoJSON data={buildings.features} style={{
            capasity: 1.0,
          }}></GeoJSON>  
          <GeoJSON data={boundery} style={{
            capasity: 1.0,
          }}></GeoJSON>  
          <MarkerClusterGroup maxClusterRadius={30}>
            {geoData.features.map((point, index) => (<Marker key={index} position={[point.properties.lat, point.properties.lon]} icon={customIcon} ><Popup><b>Equvivalent dose rate: </b>{roundFn(point.properties.gamma)}</Popup></Marker>))}          
            
          </MarkerClusterGroup>
                    
        </MapContainer>        
      </div>
    </div>
  );
};