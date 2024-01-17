
import { Button, Text } from "@chakra-ui/react";
import { Box, DataBox } from "./GeoDataBox.styled.js";

const fontSizeLegend = '18px';
const fontSizeDiscrption = '12px';

export const GeoDataBox = () => {
    
    return (
        <DataBox>        
        <Box >
            <Text fontSize={fontSizeLegend} as='b'>Description:</Text>
            <Text fontSize={fontSizeDiscrption}><b>AEDR h=0.1 m:</b> 120 mkSv</Text>
            <Text fontSize={fontSizeDiscrption}><b>ADER h=1.0 m:</b> 120 mkSv</Text>
            <Text fontSize={fontSizeDiscrption}><b>Surface beta-particles flux density:</b> 120 pcs/(min sq.cm)</Text>
            </Box>
        <Button></Button>    
        </DataBox>
        
    );
};

