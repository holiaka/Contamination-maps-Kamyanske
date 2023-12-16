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
import { MapContainer, Marker, TileLayer} from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
/* import { GiRadioactive } from "react-icons/gi"; */
import { Icon } from 'leaflet';


import geoData from './../../data/obsPointsGammaOld.json';
console.log(geoData);

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
          zoom={10}
          style={{
            height: '100vh',
            width: '100%',
          }}          
          minZoom = {4}
          maxZoom = {24}

        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup maxClusterRadius={40}>
            {geoData.features.map((point, index) => (<Marker key={index} position={[point.properties.lat, point.properties.lon]} icon={customIcon} ></Marker>))}          
            {/* <GeoJSON data={geoData}></GeoJSON> */}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};
