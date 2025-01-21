import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  GeoJSON,
  LayersControl,
  // Circle,
  // useMap,
  // CircleMarker,
} from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useNavigate, useLocation } from 'react-router-dom';

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
import { buildingData } from './buildingList';
// import { measures } from './data/db_f';

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


// const schemaURL = './data/b__1___0-0/beta.tif';

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

// const onEaachFeatureBuldings = (feature, layer) => {
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

export const Buildings = () => {
  const [pagePath, setPagePath] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [points, setPoints] = useState(null);
  const [border, setBorder] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    const search = location.search;
    setPagePath(search);
    const objectB = selectBuild(buildingData, search);
    setSelectedBuilding(objectB);

    const loadData = async () => {
      try {
        const pointsData = await import(`./data/${search.substring(5, 15)}/points.json`);
        const borderData = await import(`./data/${search.substring(5, 15)}/pol.json`);

        console.log(pointsData);
        console.log(borderData);
        setPoints(pointsData.default);
        setBorder(borderData.default);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };    
      loadData();    
  }, [location.search]);

  const processing = () => {
    const { h = [], address = [], no = '' } = selectedBuilding || {};
    return address.map((item, i) => ({
      h: h[i],
      address: item,
      name: no,
    }));
  };


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
                  onClick={() => navigate('/buildings?key=b__1___0-0')}
                >
                  Building 1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__1a__0-0')}
                >
                  Building 1"А"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__1b__0-0')}
                >
                  Building 1"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__1m__0-0')}
                >
                  Building 1"M"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__2___0-0')}
                >
                  Building 2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__2b__0-0')}
                >
                  Building 2"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__2v__0-0')}
                >
                  Building 2"В"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__2e1_0-0')}
                >
                  Building 2"Е"/1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__2e2_0-0')}
                >
                  Building 2"Е"/2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__3___0-0')}
                >
                  Building 3:
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b4-5___0-0')}
                >
                  Building 4-5
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b__6___0-0')}
                >
                  Building 6
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b_27___0-0')}
                >
                  Building 27
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b_28___0-0')}
                >
                  Building 28
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b_46___0-0')}
                >
                  Building 46
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b112___0-0')}
                >
                  Building 112
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  onClick={() => navigate('/buildings?key=b120___0-0')}
                >
                  Building 120
                </MenuItem>
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
                {processing().map((item, iter) => (
                  <MenuItem
                    key={iter}
                    icon={<CiLineHeight />}
                    onClick={() => navigate(`/buildings?key=${item.address}`)}
                  >
                    {`Floor hieght: ${item.h} m for building No${item.name}`}
                  </MenuItem>
                ))}
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
                minZoom={18}
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
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Scheme of the building">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/shema/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay name="Gamma dose rate at H of 0.1 m, &mu;Sv/h">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/aedr_01/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Gamma dose rate at H of 1.0 m, &mu;Sv/h">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/aedr_10/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Gamma dose rate at H of 1.0 m, &mu;Sv/h">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/aedr_10/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Density beta-particles flux, pcs/sq.m/min">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/beta/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Density alfa-particles flux, pcs/sq.m/min">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${pagePath.substring(5, 15)}/alfa/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>

                  <LayersControl.Overlay
                    checked
                    name="Approximation border for radiation parameters"
                  >
                    <GeoJSON
                      data={points}
                      style={{
                        color: '#d40696',
                        capasity: 1.0,
                      }}
                    ></GeoJSON>
                  </LayersControl.Overlay>

                  <LayersControl.Overlay checked name="Observations">
                    <GeoJSON
                      data={border}                      
                      pointToLayer={setIcon}
                    // onEachFeature={onEachFeature}
                    ></GeoJSON>
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
