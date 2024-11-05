import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';

export const Buildings = () => {
  return (
      <Tabs>          
        <TabList>
        <Button>Button</Button>      
        <Tab>Building Schema</Tab>
        <Tab>Measurment data</Tab>
        <Tab>Photos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Tabs>
            <TabList>
              <Tab>H = 0m</Tab>
              <Tab>H = 1m</Tab>
              <Tab>H = 2m</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>1</TabPanel>
              <TabPanel>2</TabPanel>
              <TabPanel>3</TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
