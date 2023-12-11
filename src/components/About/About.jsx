import { Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Box } from './About.styled';

export const About = () => {

  const option = {  
  textColor: useColorModeValue('gray.800', 'white'),
};
  return (
    <Box>
      <Heading color={option.textColor} fontSize='50px'> Hello everybody!</Heading>
      <Text color={option.textColor} fontSize='20px'>
        I created this project within the React course at the GOIT school. If
        you see any defect or bug, or you have suggestions on how something can
        be done better, you can contact me by e-mail or by phone. Contact
        details are listed at the bottom of the site pages.
      </Text >
      <Button type="button" colorScheme='teal' variant='outline' size='md'>Try now!</Button>
    </Box>
  );
};
