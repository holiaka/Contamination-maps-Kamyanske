import { Button, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { headerFontSize, mainFontSize } from './About.my-chakra-ui';
import { Box } from './About.styled';

export const About = () => {
  const navigate = useNavigate;

  const onClick = () => {
    navigate("/", { replace: false });
  };

  const option = {
    textColor: useColorModeValue('gray.800', 'white'),
  };

  return (
    <Box>
      <Heading color={option.textColor} fontSize={headerFontSize}>
        About the Project and This Website
      </Heading>
      <Text color={option.textColor} fontSize={mainFontSize}>
        This website presents the results of an investigation into the
        now-defunct Prydniprovskyi Chemical Plant in Kamyanske City, Dnipro
        region (Ukraine). The plant processed uranium ore for the Soviet nuclear
        program from 1948 to 1991, producing yellowcake. The site includes
        spatial products from previous research that showcase the volume of work
        realized up to 2016 <Link color='blue'> [LINK] </Link>, as well as results from new observations in
        the study area during 2023-2024 <Link color='blue'>[LINK]</Link>. All output data are presented as
        maps, offering the possibility to obtain interactive information for
        individual observations (points). This project also investigated 20
        buildings characterized by significant radioactive contamination. The
        European Commission finances this work "The Development of a Plan for
        Handling Radiation-Contaminated Materials" within the framework of
        technical assistance INSC/2021/427-030. This initiative is implemented
        in collaboration with the Ministry of Energy of Ukraine and the state
        enterprise "Barrier" in Kamyanske.
      </Text>
      <Button
        type="button"
        onClick={onClick}
        colorScheme="teal"
        variant="outline"
        size="md"
      >
        Try now!
      </Button>
    </Box>
  );
};
