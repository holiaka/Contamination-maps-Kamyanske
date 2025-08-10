// import React, { useState, useEffect } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';

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
import ImageGallery from 'react-image-gallery';
// import stylesheet if you're not already using CSS @import
import 'react-image-gallery/styles/css/image-gallery.css';

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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
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
import { measures as measuresFloor } from './data/db_f';
import { wall_data as measuresWall } from './data/db_w';
import { samples_data as measuresSamples } from './data/db_samples';
import { eq_data as measuresEq } from './data/db_eq';
import { attributeSchema } from 'components/Maps/Legend/legendAttribute';
import {
  LegendItem,
  Item,
  ColorAttribute,
  TextAttribute,
} from 'components/Maps/Legend/Legend.styled';

import { access } from 'components/SharedLayout/SharedLayout.jsx';

const { origin, pathname, search = '?key=b__1___0-0' } = window.location;
const address = `${origin}${pathname}`;
const subLink = `${search.substring(5, 15)}`;
let pointsData;
let polygonData;

if (search.length === 15) {
  pointsData = require(`./data/${subLink}/points.json`);
  polygonData = require(`./data/${subLink}/pol.json`);
}

// For floor table
let selectedBuild = subLink.substring(0, 5);
let photosLink = `https://raw.githubusercontent.com/holiaka/Contamination-maps-Kamyanske/refs/heads/main/src/components/Buildings/data/img/${selectedBuild}/`;
let dataSetFloor = measuresFloor[selectedBuild];
let dataSetWall = measuresWall[selectedBuild];
let dataSetSamples = measuresSamples[selectedBuild];
let dataSetEq = measuresEq[selectedBuild];

const selectBuild = (buildingData, search) => {
  for (const iter of buildingData) {
    let result = iter.address.find(item => item.includes(search));
    if (result !== undefined) {
      return iter;
    }
  }
  return null; //  null
};

const selectedBuilding = selectBuild(buildingData, subLink);

const listPhotos = () => {
  let listObjPhoto = [];
  let photosCount = selectedBuilding.photo; // Assuming this is a number

  for (let photo = 1; photo <= photosCount; photo++) {
    // Fix the condition
    let obj = {
      original: `${photosLink}${photo}.jpg`,
      thumbnail: `${photosLink}${photo}.jpg`,
    };
    listObjPhoto.push(obj);
  }

  return listObjPhoto;
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

const onEachFeature = (feature, layer) => {
  let {
    _Point: point,
    _Build: build,
    _H: h,
    _Room: room,
    _Type: type,
    _Order: order,
    _Measure: measure,
    _AEDR_01: aedr01,
    _AEDR_10: aedr10,
    _Alfa: alfa,
    _Beta: beta,
  } = feature.properties;

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

  const processingMap = par => {
    const { address = [], zoom = [], center = [] } = selectedBuilding || {};
    const index = address.indexOf(subLink);
    if (par === 'z') {
      return zoom[index];
    } else if (par === 'c') {
      return center[index];
    } else {
      return [];
    }
  };

  const renderImage = item => (
    <img
      src={item.original}
      alt={'Building view'}
      style={{ height: '75vh', objectFit: 'cover', margin: 'auto' }}
    />
  );

  return access ? (
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
              <MenuList fontSize="10px" padding="0">
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__1___0-0`}
                >
                  Building 1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__1a__0-0`}
                >
                  Building 1"А"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__1b__0-0`}
                >
                  Building 1"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__1m__0-0`}
                >
                  Building 1"M"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__2___0-0`}
                >
                  Building 2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__2b__0-0`}
                >
                  Building 2"Б"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__2v__0-0`}
                >
                  Building 2"В"
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__2e1_0-0`}
                >
                  Building 2"Е"/1
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__2e2_0-0`}
                >
                  Building 2"Е"/2
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__3___0-0`}
                >
                  Building 3:
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b4-5___0-0`}
                >
                  Building 4-5
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b__6___0-0`}
                >
                  Building 6
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b_27___0-0`}
                >
                  Building 27
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b_28___0-0`}
                >
                  Building 28
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b_46___0-0`}
                >
                  Building 46
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b103___0-0`}
                >
                  Building 103 (2022)
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b104___0-0`}
                >
                  Building 104 (2022)
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b112___0-0`}
                >
                  Building 112
                </MenuItem>
                <MenuItem
                  icon={<GiNuclearWaste />}
                  as="a"
                  href={`${address}?key=b120___0-0`}
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
              <MenuList fontSize="10px">
                {processingMenu().map((item, iter) => (
                  <MenuItem
                    key={iter}
                    icon={<CiLineHeight />}
                    as="a"
                    href={`${address}?key=${item.address}`}
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
            <MapBox>
              <MapContainer
                center={processingMap('c')}
                zoom={processingMap('z')}
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
                      <ItemName>
                        Ambien dose equivalent rate in air, μSv/h{' '}
                      </ItemName>
                      {attributeSchema.gamma.list.map(item => (
                        <Item key={item.color}>
                          <ColorAttribute color={item.color} />
                          <TextAttribute>{item.value}</TextAttribute>
                        </Item>
                      ))}
                    </LegendItem>
                    <LegendItem>
                      <ItemName>
                        Alfa-/beta-particles flex, pcs/sq.m/min{' '}
                      </ItemName>
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
          <TabPanel height="100%" padding="0" margin="0">
            <Tabs>
              <TabList
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <SelectedTab>
                  <Tab>Floor</Tab>
                  <Tab>Wall</Tab>
                  <Tab>Diveces, eqvipments and so on</Tab>
                  <Tab>Samples </Tab>
                </SelectedTab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TableContainer height="60vh" overflowY="auto">
                    <Table size="sm">
                      <TableCaption placement="top">
                        {`Data about floor contamination in building No ${selectedBuilding.no}. `}
                        Link on final buildings reports{' '}
                        <Link href="https://drive.google.com/drive/folders/149ATMNwS_5cmVtoNSjWDE61JjNo1Fqvr?usp=drive_link">
                          <b>HERE </b>
                        </Link>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th textTransform="none">H, m</Th>
                          <Th textTransform="none">Point</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">Type</Th>
                          <Th textTransform="none">Order</Th>
                          <Th textTransform="none">Measure</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">AEDR at 1.0 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataSetFloor.map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.H.toFixed(1)}</Td>
                            <Td>{item.Point}</Td>
                            <Td>{item.Room}</Td>
                            <Td>{item.Type}</Td>
                            <Td>{item.Order}</Td>
                            <Td>{item.Measure}</Td>
                            <Td>{item.AEDR_01}</Td>
                            <Td>{item.AEDR_10}</Td>
                            <Td>{item.Alfa}</Td>
                            <Td>{item.Beta}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th textTransform="none">H, m</Th>
                          <Th textTransform="none">Point</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">Type</Th>
                          <Th textTransform="none">Order</Th>
                          <Th textTransform="none">Measure</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">AEDR at 1.0 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer height="60vh" overflowY="auto">
                    <Table size="sm">
                      <TableCaption placement="top">
                        {`Data about wall contamination in building No ${selectedBuilding.no}. `}
                        Link on final buildings reports{' '}
                        <Link href="https://drive.google.com/drive/folders/149ATMNwS_5cmVtoNSjWDE61JjNo1Fqvr?usp=drive_link">
                          <b>HERE </b>
                        </Link>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th textTransform="none">H, m</Th>
                          <Th textTransform="none">Point</Th>
                          <Th textTransform="none">Build</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">Type</Th>
                          <Th textTransform="none">Order</Th>
                          <Th textTransform="none">Measure</Th>
                          <Th textTransform="none">Measure H, m</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataSetWall.map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.H.toFixed(1)}</Td>
                            <Td>{item.Point}</Td>
                            <Td>{item.Build}</Td>
                            <Td>{item.Room}</Td>
                            <Td>{item.Type}</Td>
                            <Td>{item.Order}</Td>
                            <Td>{item.Measure}</Td>
                            <Td>{item.Sample_H_m}</Td>
                            <Td>{item.AEDR_01}</Td>
                            <Td>{item.Alfa}</Td>
                            <Td>{item.Beta}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th textTransform="none">H, m</Th>
                          <Th textTransform="none">Point</Th>
                          <Th textTransform="none">Build</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">Type</Th>
                          <Th textTransform="none">Order</Th>
                          <Th textTransform="none">Measure</Th>
                          <Th textTransform="none">Measure H, m</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer height="60vh" overflowY="auto">
                    <Table size="sm">
                      <TableCaption placement="top">
                        {`Data about equipment's contamination in building No ${selectedBuilding.no}. `}
                        Link on final buildings reports{' '}
                        <Link href="https://drive.google.com/drive/folders/149ATMNwS_5cmVtoNSjWDE61JjNo1Fqvr?usp=drive_link">
                          <b>HERE </b>
                        </Link>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th textTransform="none">Equipment name, m</Th>
                          <Th textTransform="none">Mark</Th>
                          <Th textTransform="none">Material</Th>
                          <Th textTransform="none">Width/Diameter, m</Th>
                          <Th textTransform="none">Length, m</Th>
                          <Th textTransform="none">Height, mr</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                          <Th textTransform="none">Contamination level</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataSetEq.map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.eqName}</Td>
                            <Td>{item.mark}</Td>
                            <Td>{item.material}</Td>
                            <Td>{item.d}</Td>
                            <Td>{item.l}</Td>
                            <Td>{item.h}</Td>
                            <Td>{item.AEDR}</Td>
                            <Td>{item.alfa}</Td>
                            <Td>{item.beta}</Td>
                            <Td>{item.level}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th textTransform="none">Equipment name, m</Th>
                          <Th textTransform="none">Mark</Th>
                          <Th textTransform="none">Material</Th>
                          <Th textTransform="none">Width/Diameter, m</Th>
                          <Th textTransform="none">Length, m</Th>
                          <Th textTransform="none">Height, mr</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">Alfa, pcs/sq.m/min</Th>
                          <Th textTransform="none">Beta, pcs/sq.m/min</Th>
                          <Th textTransform="none">Contamination level</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel>
                  <TableContainer height="60vh" overflowY="auto">
                    
                    <Table size="sm"> 
                      <TableCaption placement="top" >
                        {`Data about samples in building No ${selectedBuilding.no}. `}
                        Link on final buildings reports{' '}
                        <Link href="https://drive.google.com/drive/folders/149ATMNwS_5cmVtoNSjWDE61JjNo1Fqvr?usp=drive_link">
                          <b>HERE </b>
                        </Link>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th textTransform="none">H at ground, m</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">
                            Equipment type identifier
                          </Th>
                          <Th textTransform="none">
                            Equipment No
                          </Th>
                          <Th textTransform="none">Sample serial number</Th>
                          <Th textTransform="none">
                            Measurement/sampling purpose
                          </Th>
                          <Th textTransform="none">Sample aggregate state</Th>
                          <Th textTransform="none">Width, m</Th>
                          <Th textTransform="none">Length, m</Th>
                          <Th textTransform="none">Height, m</Th>
                          <Th textTransform="none">Thickness, mm</Th>
                          <Th textTransform="none">Material</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">
                            Alpha particle flux density, pcs./(min·cm2)
                          </Th>
                          <Th textTransform="none">
                            Beta particle flux density, pcs./(min·cm2)
                          </Th>
                          <Th textTransform="none">Photo</Th>
                          <Th textTransform="none">Sampling report No </Th>
                          <Th textTransform="none">Sample passport No.</Th>
                          <Th textTransform="none">Test protocol No.</Th>
                          <Th textTransform="none">
                        Pb-210 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        U_238 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-230 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        U-235 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Ra-226 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-228 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-232 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        K-40 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Cs-137 activity comcentration
                          </Th>
                          <Th textTransform="none">Total alpha activity</Th>
                          <Th textTransform="none">Total beta activity</Th>
                          <Th textTransform="none">
                        U-234 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-228 activity comcentration
                          </Th>
                          <Th textTransform="none">As mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cd mass fraction, mg/kg</Th>
                          <Th textTransform="none">Co mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cr mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cu mass fraction, mg/kg</Th>
                          <Th textTransform="none">Fe mass fraction, mg/kg</Th>
                          <Th textTransform="none">Hq mass fraction, mg/kg</Th>
                          <Th textTransform="none">Mn mass fraction, mg/kg</Th>
                          <Th textTransform="none">Ni mass fraction, mg/kg</Th>
                          <Th textTransform="none">Pb mass fraction, mg/kg</Th>
                          <Th textTransform="none">Ti mass fraction, mg/kg</Th>
                          <Th textTransform="none">V mass fraction, mg/kg</Th>
                          <Th textTransform="none">Zn mass fraction, mg/kg</Th>
                          <Th textTransform="none">Se mass fraction, mg/kg</Th>
                          <Th textTransform="none">Notes</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataSetSamples.map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.H}</Td>
                            <Td>{item.Room}</Td>
                            <Td>{item.EqID}</Td>
                            <Td>{item.EqNumber}</Td>
                            <Td>{item.OrderNo}</Td>
                            <Td>{item.AimMeasure}</Td>
                            <Td>{item.AggregateState}</Td>
                            <Td>{item.W_m}</Td>
                            <Td>{item.L_m}</Td>
                            <Td>{item.H_m}</Td>
                            <Td>{item.T_mm}</Td>
                            <Td>{item.material}</Td>
                            <Td>{item.AEDR_01}</Td>
                            <Td>{item.alfa}</Td>
                            <Td>{item.beta}</Td>
                            <Td>{item.photo}</Td>
                            <Td>{item.ActNo}</Td>
                            <Td>{item.PassportNo}</Td>
                            <Td>{item.ProtocolNo}</Td>
                            <Td>{item.Pb210_AC}</Td>
                            <Td>{item.U238_AC}</Td>
                            <Td>{item.Th230_AC}</Td>
                            <Td>{item.U235_AC}</Td>
                            <Td>{item.Ra226_AC}</Td>
                            <Td>{item.Th228_AC}</Td>
                            <Td>{item.Th232_AC}</Td>
                            <Td>{item.K40_AC}</Td>
                            <Td>{item.Cs137_AC}</Td>
                            <Td>{item.totalAlfa}</Td>
                            <Td>{item.totalBeta}</Td>
                            <Td>{item.U234_AC}</Td>
                            <Td>{item.Po210_AC}</Td>
                            <Td>{item.As_mf_mg_kg}</Td>
                            <Td>{item.Cd_mf_mg_kg}</Td>
                            <Td>{item.Co_mf_mg_kg}</Td>
                            <Td>{item.Cr_mf_mg_kg}</Td>
                            <Td>{item.Cu_mf_mg_kg}</Td>
                            <Td>{item.Fe_mf_mg_kg}</Td>
                            <Td>{item.Hg_mf_mg_kg}</Td>
                            <Td>{item.Mn_mf_mg_kg}</Td>
                            <Td>{item.Ni_mf_mg_kg}</Td>
                            <Td>{item.Pb_mf_mg_kg}</Td>
                            <Td>{item.Ti_mf_mg_kg}</Td>
                            <Td>{item.V_mf_mg_kg}</Td>
                            <Td>{item.Zn_mf_mg_kg}</Td>
                            <Td>{item.Se_mf_mg_kg}</Td>
                            <Td>{item.Notes}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                        <Th textTransform="none">H at ground, m</Th>
                          <Th textTransform="none">Room</Th>
                          <Th textTransform="none">
                            Equipment type identifier
                          </Th>
                          <Th textTransform="none">
                            Equipment No
                          </Th>
                          <Th textTransform="none">Sample serial number</Th>
                          <Th textTransform="none">
                            Measurement/sampling purpose
                          </Th>
                          <Th textTransform="none">Sample aggregate state</Th>
                          <Th textTransform="none">Width, m</Th>
                          <Th textTransform="none">Length, m</Th>
                          <Th textTransform="none">Height, m</Th>
                          <Th textTransform="none">Thickness, mm</Th>
                          <Th textTransform="none">Material</Th>
                          <Th textTransform="none">AEDR at 0.1 m, μSv/h</Th>
                          <Th textTransform="none">
                            Alpha particle flux density, pcs./(min·cm2)
                          </Th>
                          <Th textTransform="none">
                            Beta particle flux density, pcs./(min·cm2)
                          </Th>
                          <Th textTransform="none">Photo</Th>
                          <Th textTransform="none">Sampling report No </Th>
                          <Th textTransform="none">Sample passport No.</Th>
                          <Th textTransform="none">Test protocol No.</Th>
                          <Th textTransform="none">
                        Pb-210 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        U_238 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-230 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        U-235 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Ra-226 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-228 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-232 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        K-40 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Cs-137 activity comcentration
                          </Th>
                          <Th textTransform="none">Total alpha activity</Th>
                          <Th textTransform="none">Total beta activity</Th>
                          <Th textTransform="none">
                        U-234 activity comcentration
                          </Th>
                          <Th textTransform="none">
                        Th-228 activity comcentration
                          </Th>
                          <Th textTransform="none">As mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cd mass fraction, mg/kg</Th>
                          <Th textTransform="none">Co mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cr mass fraction, mg/kg</Th>
                          <Th textTransform="none">Cu mass fraction, mg/kg</Th>
                          <Th textTransform="none">Fe mass fraction, mg/kg</Th>
                          <Th textTransform="none">Hq mass fraction, mg/kg</Th>
                          <Th textTransform="none">Mn mass fraction, mg/kg</Th>
                          <Th textTransform="none">Ni mass fraction, mg/kg</Th>
                          <Th textTransform="none">Pb mass fraction, mg/kg</Th>
                          <Th textTransform="none">Ti mass fraction, mg/kg</Th>
                          <Th textTransform="none">V mass fraction, mg/kg</Th>
                          <Th textTransform="none">Zn mass fraction, mg/kg</Th>
                          <Th textTransform="none">Se mass fraction, mg/kg</Th>
                          <Th textTransform="none">Notes</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <ImageGallery
              thumbnailPosition="right"
              showBullets={true}
              items={listPhotos()}
              renderItem={renderImage}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BuildingSpace>
  ) : (
    <p>You don't have access her!</p>
  );
};
