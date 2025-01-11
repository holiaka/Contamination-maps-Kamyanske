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
import { GiNuclearWaste } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BuildingSpace, SelectedTab } from './Buildings.styled';
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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
            />
            <MenuList fontSize="14px">
              <MenuItem icon={<GiNuclearWaste />}>Building 1: </MenuItem>
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
              <MenuItem icon={<GiNuclearWaste />}>Building </MenuItem>
              <MenuItem icon={<GiNuclearWaste />}>Building </MenuItem>
              <MenuItem icon={<GiNuclearWaste />}>Building </MenuItem>
              <MenuItem icon={<GiNuclearWaste />}>Building </MenuItem>
              <MenuItem icon={<GiNuclearWaste />}>Building </MenuItem>

            </MenuList>
          </Menu>
          <SelectedTab>
            <Tab>Scheme of the building</Tab>
            <Tab>Measurment data</Tab>
            <Tab>Photos</Tab>
          </SelectedTab>
          <div></div>
        </TabList>

        <TabPanels>
          <TabPanel height='100%' padding='0' margin='0'>
            <MapContainer
              center={[48.495, 34.68]}
              zoom={17}
              style={{
                height: '80vh',
                width: '100%',
              }}
              minZoom={14}
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
