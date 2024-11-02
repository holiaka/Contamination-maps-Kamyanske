import {
  LegendBox,
  LegendTitle,
  Item,
  ColorAttribute,
  TextAttribute,
} from './Legend.styled';
import { Button } from '@chakra-ui/react';
import { attributeSchema } from './legendAttribute';
import { useState } from 'react';



export const Legend = () => {
    const [legend, setLegend] = useState(() => [])
    
    const toggleLegends = (e) => {
        console.log(e.target)
        console.log(legend)

    }

  return (
    <LegendBox>
      <div>
        Show legend:
              <Button onClick = {toggleLegends} variant='outline'>Gamma dose rate</Button> and / or
              <Button onClick={toggleLegends} variant={'solid'}>Beta-particals flux</Button>
      </div>
      <LegendTitle>
        Ambien dose equivalent <br /> rate in air, &mu;Sv/h:{' '}
      </LegendTitle>
      {attributeSchema.map(item => (
        <Item key={item.color}>
          <ColorAttribute color={item.color} />
          <TextAttribute>{item.value}</TextAttribute>
        </Item>
      ))}
    </LegendBox>
  );
};
