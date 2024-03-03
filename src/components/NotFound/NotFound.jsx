import { NotFoundBackgraund } from "./NotFound.styled";
import { Text, useColorModeValue } from "@chakra-ui/react";

export const NotFound = () => {
    
    const option = {
        oopsColor: "#ff0000",
    textColor: useColorModeValue('red.500', 'red.300'),
  };

    return (
        <NotFoundBackgraund >            
            <Text color={option.oopsColor}>Oops!!!</Text>
            <Text color={option.textColor} textAlign={"center"}> Not existing page for<br/> this address!</Text>    
        </NotFoundBackgraund>


    );
};