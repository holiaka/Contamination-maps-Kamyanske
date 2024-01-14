import { NotFoundBackgraund } from "./NotFound.styled";
import { Text, useColorModeValue } from "@chakra-ui/react";

export const NotFound = () => {
    
const option = {
    textColor: useColorModeValue('gray.800', 'white'),
  };

    return (
        <NotFoundBackgraund>
            <Text >Oops!!!</Text>
            <Text color={option.textColor}>Not existing page for this address!</Text>
        </NotFoundBackgraund>


    );
};