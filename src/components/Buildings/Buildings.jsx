import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  GeoJSON,
  LayersControl,
  // Circle,
  useMap,
  // CircleMarker,
} from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import georaster from 'georaster';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { GiNuclearWaste, GiHamburgerMenu } from 'react-icons/gi';
import { CiLineHeight } from 'react-icons/ci';
import {
  BuildingSpace,
  SelectedTab,
  MenuSpace,
  MapBox,
  MapInfo,
  MapTitle,
  MapLegend,
} from './Buildings.styled';

let { origin, pathname, search } = window.location;
let address = `${origin}${pathname}`;
console.log(`ADDRESS: - origin: ${origin}, - pathname ${pathname}`);

const buildingData = [
  {
    no: '1',
    h: [-4.0, 0.0],
    address: ['b__1__-4-0', 'b__1___0-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '1A',
    h: [-5.6, 0.0],
    address: ['b__1a_-5-6', 'b__1a__0-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '1Б',
    h: [0.0, 9.0],
    address: ['b__1b__0-0', 'b__1b__9-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '1М',
    h: [-3.7, 0.0, 2.5],
    address: ['b__1m_-3-7', 'b__1m__0-0', 'b__1m__2-5'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18],
  },
  {
    no: '2',
    h: [0.0, 2.2, 4.4, 6.8],
    address: ['b__2___0-0', 'b__2___2-2', 'b__2___4-4', 'b__2___6-8'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18],
  },
  {
    no: '2Б',
    h: [-8.0, -4.0, 0.0, 5.0, 10.0, 15.0, 20.0, 24.0],
    address: [
      'b__2b_-8-0',
      'b__2b_-4-0',
      'b__2b__0-0',
      'b__2b__5-0',
      'b__2b_10-0',
      'b__2b_15-0',
      'b__2b_20-0',
      'b__2b_24-0',
    ],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18, 18, 18, 18, 18],
  },
  {
    no: '2В',
    h: [0.0, 3.7, 7.4, 11.1],
    address: ['b__2v__0-0', 'b__2v__3-7', 'b__2v__7-4', 'b__2v_11-1'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18],
  },
  {
    no: '2Е/1',
    h: [0.0],
    address: ['b__2e1_0-0'],
    center: [[48.495, 34.68]],
    zoom: [18],
  },
  {
    no: '2Е/2',
    h: [0.0],
    address: ['b__2e2_0-0'],
    center: [[48.495, 34.68]],
    zoom: [18],
  },
  {
    no: '3',
    h: [-3.0, 0.0, 2.4, 6.4, 7.9, 10.0, 12.0],
    address: [
      'b__3__-3-0',
      'b__3___0-0',
      'b__3___2-4',
      'b__3___6-4',
      'b__3___7-9',
      'b__3__10-0',
      'b__3__12-0',
    ],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18, 18, 18, 18],
  },
  {
    no: '4-5',
    h: [0.0, 2.8, 3.6],
    address: ['b4-5___0-0', 'b4-5___2-8', 'b4-5___3-6'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18],
  },
  {
    no: '6',
    h: [-8.0, -4.0, 0.0, 6.0, 12.0, 14.0, 18.0],
    address: [
      'b__6__-8-0',
      'b__6__-4-0',
      'b__6___0-0',
      'b__6___6-0',
      'b__6__12-0',
      'b__6__14-0',
      'b__6___18-0',
    ],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18, 18, 18, 18],
  },
  {
    no: '27',
    h: [0.0, 6.0],
    address: ['b_27___0-0', 'b_27___6-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '28',
    h: [0.0, 3.0, 6.0],
    address: ['b_28___0-0', 'b_28___3-0', 'b_28___6-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18],
  },
  {
    no: '46',
    h: [0.0, 6.0],
    address: ['b_46___0-0', 'b_46___6-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '112',
    h: [0.0, 2.4],
    address: ['b112___0-0', 'b112___2-4'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18],
  },
  {
    no: '120',
    h: [-6.0, 0.0, 6.0, 12.0],
    address: ['b120__-6-0', 'b120___0-0', 'b120___6-0', 'b120__12-0'],
    center: [
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
      [48.495, 34.68],
    ],
    zoom: [18, 18, 18, 18],
  },
];

const selectBuild = (buildingData, search) => {
  for (const iter of buildingData) {
    let result = iter.address.find(item =>
      item.includes(search.substring(5, 15))
    );
    if (result !== undefined) {
      return iter;
    }
  }
  return null; //  null
};

const data = selectBuild(buildingData, search);
console.log(data);

const border = require(`./data/b__1___0-0/pol.json`);
const points = require(`./data/b__1___0-0/points.json`);
const schemaURL = './data/b__1___0-0/beta.tif';

const createColor = val => {
  if (val < 0.24) {
    return '#006420';
  } else if (val < 0.56) {
    return '#b1bd40';
  } else if (val < 1.28) {
    return '#fdec00';
  } else if (val < 5.12) {
    return '#ff0415';
  } else if (val < 13.8) {
    return '#8f384c';
  } else if (val < 138) {
    return '#800085';
  } else {
    return '#45024b';
  }
};

const setIcon = (feature, latlng) => {
  return L.circleMarker(latlng, {
    radius: 4,
    fillColor: createColor(feature.properties._AEDR_01),
    color: '#FFFFFF',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  });
};

// const onEachFeatureBuldings = (feature, layer) => {
//   let number = feature.properties.Number;
//   let enterprise = feature.properties.Enterprise;
//   let text;
//   let text2;
//   if (number !== null) {
//     text = number;
//   } else {
//     text = 'No data';
//   }
//   if (enterprise !== null) {
//     text2 = enterprise;
//   } else {
//     text2 = 'No data';
//   }
//   layer.bindPopup(`<b>Buildings No:</b> ${text.toString()}; </br>
//      <b>Enterprise:</b> ${text2} </br>
//      <h1> BUILD </h1>
//      <a href="http://localhost:3000/Contamination-maps-Kamyanske/buildings" >Go to Building Info</a>`);
// };

const GeoTiffLayer = ({ geoTiffUrl }) => {
  const map = useMap();

  React.useEffect(() => {
    fetch(geoTiffUrl)
      .then(response => {
        console.log(response)
        return response.arrayBuffer();
        
       })
      .then(arrayBuffer => { 
        console.log(georaster(arrayBuffer))
        return georaster(arrayBuffer)
      })
            .then(georasterData => {
              console.log(georasterData)
              const layer = new GeoRasterLayer({
                    georaster: georasterData,
                    opacity: 0.7, // Adjust opacity
                    resolution: 256 // Higher values for better resolution
                });
                layer.addTo(map);

        // Adjust the map view to fit the GeoTIFF layer bounds
        map.fitBounds(layer.getBounds());
      });
  }, [geoTiffUrl, map]);

  return null;
};

export const Buildings = () => {
  const [pagePath, setPagePath] = useState();
  console.log(pagePath);

  useEffect(() => {
    setPagePath(search);
  }, [setPagePath]);

  return (
    <BuildingSpace>
      <Tabs>
        <TabList
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <MenuSpace>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
              />
              <MenuList fontSize="12px" padding="0">
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__1___0-0`}
                >
                  Building 1
                </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 1"А": </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 1"Б"</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 1"M"</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 2: </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 2"Б":</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 2"В": </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 2"Е"/1: </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 2"Е"/2: </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 3: </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 4-5: </MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 6</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 27</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 28</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 46</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 112</MenuItem>
                <MenuItem icon={<GiNuclearWaste />}>Building 120</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<CiLineHeight />}
                variant="outline"
              />
              <MenuList fontSize="12px">
                <MenuItem
                  icon={<CiLineHeight />}
                  as="a"
                  href={`${address}?jgopfdjh`}
                >
                  Building 1
                </MenuItem>
                <MenuItem icon={<CiLineHeight />}>Building 1"А": </MenuItem>
                <MenuItem icon={<CiLineHeight />}>Building 1"Б"</MenuItem>
                <MenuItem icon={<CiLineHeight />}>Building 1"M"</MenuItem>
              </MenuList>
            </Menu>
          </MenuSpace>

          <SelectedTab>
            <Tab>Scheme of the building</Tab>
            <Tab>Measurment data</Tab>
            <Tab>Photos</Tab>
          </SelectedTab>
          <div></div>
        </TabList>

        <TabPanels>
          <TabPanel height="100%" padding="0" margin="0">
            <MapBox>
              <MapContainer
                center={[48.49574, 34.66626]}
                zoom={18}
                style={{
                  height: 'auto',
                  width: '70%',
                }}
                minZoom={17}
                maxZoom={22}
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer
                    checked
                    name="Mapbox Satellite"
                    children=""
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
                      url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
                      accessToken={
                        'pk.eyJ1IjoiMDAwMC0wMDAxLTgwMjUtODg4NSIsImEiOiJjbHFhdjNqY2ExZHZyMnJueHJmeXc1ZHduIn0.WsmLYujm4HrDa-K-VjJ2xA'
                      }
                    />{' '}
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay name="New observation 2023-2024">
                    <GeoJSON
                      data={points}
                      pointToLayer={setIcon}
                      // onEachFeature={onEachFeature}
                    ></GeoJSON>
                  </LayersControl.Overlay>

                  <LayersControl.Overlay
                    checked
                    name="Approximation border for radiation parameters"
                  >
                    <GeoJSON
                      data={border}
                      style={{
                        color: '#d40696',
                        capasity: 1.0,
                      }}
                    ></GeoJSON>
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Beta">
                    <GeoTiffLayer geoTiffUrl={schemaURL} />
                  </LayersControl.Overlay>
                </LayersControl>
              </MapContainer>
              <MapInfo>
                <MapTitle>Building No ${}</MapTitle>
                <MapLegend> LEGEND: </MapLegend>
              </MapInfo>
            </MapBox>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BuildingSpace>
  );
};
