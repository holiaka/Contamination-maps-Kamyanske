import { Button, Text } from '@chakra-ui/react';
import { Box, DataBox } from './GeoDataBox.styled.js';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { access } from 'components/SharedLayout/SharedLayout.jsx';

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

  const navigate = useNavigate();

  const boxLocalisation = () => {
    if (clientX > 0.5 * width && clientY > 0.5 * hight) {
      return '-105%, -105%';
    } else if (clientX < 0.5 * width && clientY > 0.5 * hight) {
      return '5%, -105%';
    } else if (clientX > 0.5 * width && clientY < 0.5 * hight) {
      return '-105%, 5%';
    } else {
      return '5%, 5%';
    }
  };

  const roundFn = function (num) {
    num = num.toFixed(7);
    return num;
  };

  function onClose() {
    setGeoData(null);
  };

  function moveToRegistrationPage(){
    navigate('registration');
  };

  return (
    <DataBox
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        transform: `translate(${boxLocalisation()})`,
        transition: 'transform 500ms ease',
      }}
    >
      {access ? (
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
            <b>Beta-particles flux density:</b>
            <br /> {betaDF} pcs/(min sq.cm);
          </Text>
          <Text fontSize={fontSizeDiscrption}>
            <b>Alfa-particles flux density:</b>
            <br /> {alfaDF} pcs/(min sq.cm)
          </Text>
        </Box>
      ) : (
        <Box style={{ justifyContent: 'center', alignItems: 'center',  }}>
          <Text fontSize="20px" fontWeight='700' mb='10px'>
            Only a registered user can view the results of observations!
          </Text>
          <Text fontWeight='500'>
            Do you want to go to the registration page?
          </Text>
          <Button type="button" colorScheme="teal" padding={1} borderRadius={5} onClick={moveToRegistrationPage}>
            Yes, I do!
          </Button>
        </Box>
      )}
      <Button
        type="button"
        colorScheme="teal"
        padding={1}
        borderRadius={25}
        onClick={onClose}
      >
        <IoMdCloseCircleOutline size={25}></IoMdCloseCircleOutline>
      </Button>
    </DataBox>
  );
};
