import { Button, Text } from '@chakra-ui/react';
import { Box, DataBox } from './GeoDataBox.styled.js';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const fontSizeLegend = '16px';
const fontSizeDiscrption = '14px';

let width = document.documentElement.clientWidth;
let hight = document.documentElement.clientHeight;

export const GeoDataBox = props => {
  const {
    id,
    lat,
    lng,
    positionX,
    positionY,
    clientX,
    clientY,
    AEDR01,
    AEDR1,
    alfaDF,
    betaDF,
  } = props.geoData;
  const { setGeoData } = props;

  console.log(setGeoData);

  const boxLocalisation = () => {
    if (width - clientX < 0.5 * width && hight - clientY < 0.5 * hight) {
      return '-105%, -105%';
    } else if (
      width - clientX > 0.5 * width &&
      hight - clientY < 0.5 * hight
    ) {
      return '5%, -105%';
    } else if (
      width - clientX < 0.5 * width &&
      hight - clientY > 0.5 * hight
    ) {
      return '-105%, 5%';
    } else {
      return '5%, 5%';
    }
  };

  const roundFn = function (num) {
    num = num.toFixed(7);
    return num;
  };

  console.log("position", boxLocalisation(), positionX, positionY, clientX, clientY);

  return (
    <DataBox
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        transform: `translate(${boxLocalisation()})`,
        // transition: 'transform 500ms ease',
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
          <b>Lat:</b> {roundFn(lat)};
        </Text>
        <Text fontSize={fontSizeDiscrption}>
          <b>Lng:</b> {roundFn(lng)};
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
      <Button colorScheme="teal" padding={1} borderRadius={25}>
        <IoMdCloseCircleOutline size={25}></IoMdCloseCircleOutline>
      </Button>
    </DataBox>
  );
};