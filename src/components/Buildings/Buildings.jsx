import { useState, useEffect } from 'react';
import {
  MapContainer,
  // Marker,
  // Popup,
  TileLayer,
  // GeoJSON,
  LayersControl,
  // Circle,
  // useMap,
  // CircleMarker,
} from 'react-leaflet';
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
import { GiNuclearWaste,  GiHamburgerMenu, } from 'react-icons/gi';
import { CiLineHeight } from "react-icons/ci";
import { BuildingSpace, SelectedTab, MenuSpace, MapBox, MapInfo, MapTitle, MapLegend } from './Buildings.styled';

let { origin, pathname } = window.location;
let address = `${origin}${pathname}`;

// const buildingData = 
//   [
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1A", h: [-5.6, 0.0], address: ["b__1a_-5-6", "b__1a__0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1Б", h: [0.0, 9.0], address: ["b__1b__0-0", "b__1b__9-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1М", h: [-3.7, 0.0, 2,5], address: ["b__1m_-3-7", "b__1m__0-0", "b__1m__2-5"], center: [[48.495, 34.68], [48.495, 34.68], [48.495, 34.68]], zoom: [18, 18, 18] },
//     { no: "2", h: [0.0, 2.2, 4.4, 6.8], address: ["b__2___0-0", "b__2___2-2", "b__2___4-4", "b__2___6-8"], center: [[48.495, 34.68], [48.495, 34.68], [48.495, 34.68], [48.495, 34.68]], zoom: [18, 18, 18, 18] },
//     { no: "2Б", h: [-8.0, -4.0, 0.0, 5.0, 10.0, 15.0, 20.0, 24.0], address: ["b__2b_-8-0", "b__2b_-4-0", "b__2b__0-0", "b__2b__5-0", "b__2b_10-0", "b__2b_15-0", "b__2b_20-0", "b__2b_24-0"], center: [[48.495, 34.68], [48.495, 34.68], [48.495, 34.68], [48.495, 34.68], [48.495, 34.68], [48.495, 34.68],[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18, 18, 18, 18, 18, 18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//     { no: "1", h: [-4.0, 0.0], address: ["b__1__-4-0", "b__1___0-0"], center: [[48.495, 34.68], [48.495, 34.68]], zoom: [18, 18] },
//   ];




export const Buildings = () => {
  const [pagePath, setPagePath] = useState();
  console.log(pagePath);
  
  useEffect(() => {
    setPagePath(window.location.search);
  }, [setPagePath],)
  

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
            <MenuList fontSize="12px" padding='0'>
              <MenuItem icon={<GiNuclearWaste />} as='a' href={`${address}?jgopfdjh`} >Building 1</MenuItem>
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
              <MenuItem icon={<CiLineHeight />} as='a' href={`${address}?jgopfdjh`} >Building 1</MenuItem>
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
          <TabPanel height='100%' padding='0' margin='0'>
            <MapBox>
              <MapContainer
              center={[48.495, 34.68]}
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
                  />
                </LayersControl.BaseLayer>
              </LayersControl>
              </MapContainer>
              <MapInfo>
                <MapTitle>Building No  ${ }</MapTitle>
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
