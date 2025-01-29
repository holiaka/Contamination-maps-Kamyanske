// import React, { useState, useEffect } from 'react';
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

// import { useLocation } from 'react-router-dom';

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
  ItemName,
  LegendBox,
  LegendConteiner,
} from './Buildings.styled';
import { buildingData } from './buildingList';
// import { measures } from './data/db_f';
import { attributeSchema } from 'components/Maps/Legend/legendAttribute';
import {LegendItem, Item, ColorAttribute, TextAttribute } from 'components/Maps/Legend/Legend.styled';

const { origin, pathname, search="?key=b__1___0-0" } = window.location;
const address = `${origin}${pathname}`;
const subLink = `${search.substring(5, 15)}`;
console.log("SubLINK", subLink)
let pointsData;
let polygonData;

if (search.length === 15) {
  pointsData = require(`./data/${subLink}/points.json`);
  polygonData = require(`./data/${subLink}/pol.json`);
}

const selectBuild = (buildingData, search) => {
  for (const iter of buildingData) {
    let result = iter.address.find(item =>
      item.includes(search)
    );
    if (result !== undefined) {
      return iter;
    }
  }
  return null; //  null
};

const selectedBuilding = selectBuild(buildingData, subLink);

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

const onEachFeature = (feature, layer) => {
  let { _Point: point, _Build: build, _H: h, _Room: room, _Type: type, _Order: order, _Measure: measure, _AEDR_01: aedr01, _AEDR_10: aedr10, _Alfa: alfa, _Beta: beta } = feature.properties;

  let pointText = point ?? 'No data';
  let buildText = build ?? 'No data';
  let hText = h ?? 'No data';
  let roomText = room ?? 'No data';
  let typeText = type ?? 'No data';
  let orderText = order ?? 'No data';
  let measureText = measure ?? 'No data';
  let aedr01Text = aedr01 ?? 'No data';
  let aedr10Text = aedr10 ?? 'No data';
  let alfaText = alfa ?? 'No data';
  let betaText = beta ?? 'No data';
  
  layer.bindPopup(`<b>Buildings No: ${buildText.toString()}, height: ${hText.toString()} m</b> ; </br>
     <b>Point:</b> ${pointText.toString()} </br>
     <b>Room:</b> ${roomText.toString()} </br>
     <b>Type:</b> ${typeText.toString()} </br>
     <b>Order No:</b> ${orderText.toString()} </br>
     <b>Measure:</b> ${measureText.toString()} </br>
     <b>AEDR at 0.1 m:</b> ${aedr01Text.toString()} μSv/h</br>
     <b>AEDR at 1.0 m:</b> ${aedr10Text.toString()} μSv/h</br>
     <b>Alfa:</b> ${alfaText.toString()} pcs/sq.m/min</br>
     <b>Beta:</b> ${betaText.toString()} pcs/sq.m/min</br>
     `);
};

export const Buildings = () => {  
  
  const processingMenu = () => {  
    const { h = [], address = [], no = '' } = selectedBuilding || {};
    return address.map((item, i) => ({
      h: h[i],
      address: item,
      name: no,
    }));
  };

  const processingMap = (par) => {
    const { address = [], zoom=[], center=[] } = selectedBuilding || {};
    const index = address.indexOf(subLink);
    if (par === "z") {
      return zoom[index];
    } else if (par === "c") {
      return center[index];
    } else {
      return []
    }
  }


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
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__1___0-0`}             
                >
                  Building 1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__1a__0-0`}
                >
                  Building 1"А"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__1b__0-0`}
                >
                  Building 1"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__1m__0-0`}
                >
                  Building 1"M"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__2___0-0`}                  
                >
                  Building 2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__2b__0-0`}                  
                >
                  Building 2"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__2v__0-0`}                  
                >
                  Building 2"В"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__2e1_0-0`}                  
                >
                  Building 2"Е"/1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__2e2_0-0`}                  
                >
                  Building 2"Е"/2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__3___0-0`}                  
                >
                  Building 3:
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b4-5___0-0`}                  
                >
                  Building 4-5
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b__6___0-0`}                  
                >
                  Building 6
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b_27___0-0`}                  
                >
                  Building 27
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b_28___0-0`}
                >
                  Building 28
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b_46___0-0`}                  
                >
                  Building 46
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b112___0-0`}
                >
                  Building 112
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />} as="a" href={`${address}?key=b120___0-0`}
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
                {processingMenu().map((item, iter) => (
                  <MenuItem
                    key={iter}
                    icon={<CiLineHeight />} as="a" href={`${address}?key=${item.address}`}                    
                  >
                    {`Floor hieght: ${item.h} m for building No ${item.name}`}
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
            {console.log(search.substring(5, 15))}
            <MapBox>
              <MapContainer
                center={processingMap("c")}
                zoom={processingMap("z")}
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
                  <LayersControl.Overlay checked name="Scheme of the building">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${subLink}/shema/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Gamma dose rate at H of 0.1 m, &mu;Sv/h">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${subLink}/aedr_01/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Gamma dose rate at H of 1.0 m, &mu;Sv/h">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${subLink}/aedr_10/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>                  
                  <LayersControl.Overlay name="Density beta-particles flux, pcs/sq.m/min">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${subLink}/beta/{z}/{x}/{y}.webp`}
                      tms={true}
                      opacity={1.0}
                      minZoom={18}
                      maxZoom={22}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Density alfa-particles flux, pcs/sq.m/min">
                    <TileLayer
                      attribution='&copy; <a href="https://github.com/holiaka">GitHub</a> contributors'
                      url={`https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/main/src/components/Buildings/data/${subLink}/alfa/{z}/{x}/{y}.webp`}
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
                      data={polygonData}
                      style={{
                        color: '#d40696',                        
                        fillOpacity: 0.0,
                      }}
                    ></GeoJSON>
                  </LayersControl.Overlay>
                  <LayersControl.Overlay checked name="Observations">
                    <GeoJSON
                      data={pointsData}                      
                      pointToLayer={setIcon}
                    onEachFeature={onEachFeature}
                    ></GeoJSON>
                  </LayersControl.Overlay>
                </LayersControl>
              </MapContainer>
              <MapInfo>
                <MapTitle>{`Building No ${selectedBuilding.no}`}</MapTitle>
                <MapLegend> LEGEND: </MapLegend>
                <LegendConteiner>
                <LegendBox>
                <LegendItem>
                            <ItemName>Ambien dose equivalent rate in air, μSv/h </ItemName>
                            {attributeSchema.gamma.list.map(item => (
                              <Item key={item.color}>
                                <ColorAttribute color={item.color} />
                                <TextAttribute>{item.value}</TextAttribute>
                              </Item>
                            ))}
                  </LegendItem>
                  <LegendItem>
                            <ItemName>Alfa-/beta-particles flex, pcs/sq.m/min </ItemName>
                            {attributeSchema.beta.list.map(item => (
                              <Item key={item.color}>
                                <ColorAttribute color={item.color} />
                                <TextAttribute>{item.value}</TextAttribute>
                              </Item>
                            ))}
                </LegendItem>
                  </LegendBox>
                  </LegendConteiner>

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
