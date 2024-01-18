import { Button, Text } from '@chakra-ui/react';
import { Box, DataBox } from './GeoDataBox.styled.js';
import { IoMdCloseCircleOutline } from "react-icons/io";

const fontSizeLegend = '16px';
const fontSizeDiscrption = '14px';

export const GeoDataBox = (props) => {
  const { id, lat, lng, positionX, positionY, clientX, clientY, AEDR01, AEDR1, alfaDF, betaDF } =
      props.geoData;    
    const { setGeoData } = props;

    console.log(props);

  return (
    <DataBox
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
      }}
    >
      <Box>
        <Text fontSize={fontSizeLegend} as="b">
          Description:
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Point ID:</b> {id};
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Lat:</b> {lat};
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Lng:</b> {lng};
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>AEDR h=0.1 m:</b> {AEDR01} mkSv;
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>AEDR h=1.0 m:</b> {AEDR1} mkSv;
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Beta-particles flux density:</b> {betaDF} pcs/(min sq.cm);
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Alfa-particles flux density:</b> {alfaDF} pcs/(min sq.cm)
        </Text>
      </Box>
          <Button colorScheme="teal" width={20} borderRadius={19}>
              <IoMdCloseCircleOutline size={40}></IoMdCloseCircleOutline>
      </Button>
    </DataBox>
  );
};
