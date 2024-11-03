import {
  LegendBox,
  LegendTitle,
  Item,
  ColorAttribute,
  TextAttribute,
  LegendTop,
} from './Legend.styled';
import { Button } from '@chakra-ui/react';
import { attributeSchema } from './legendAttribute';
import { useState } from 'react';



export const Legend = () => {
    const [legend, setLegend] = useState(() => [])
    
    const toggleLegends = (e) => {
        console.log(e.target.innerText)
        console.log(legend)

    }

  return (
    <LegendBox>
      <LegendTop>
        <LegendTitle>
          Show legend:
        </LegendTitle>
        <div>
          <Button onClick = {toggleLegends} colorScheme='teal'>Gamma dose rate</Button> and / or
          <Button onClick={toggleLegends} colorScheme='teal' size="xs" >Beta-particals flux</Button>
              </div>
              
      </LegendTop>
      <LegendTitle>
        {attributeSchema.gamma.title}
      </LegendTitle>
      {attributeSchema.gamma.list.map(item => (
        <Item key={item.color}>
          <ColorAttribute color={item.color} />
          <TextAttribute>{item.value}</TextAttribute>
        </Item>
      ))}
    </LegendBox>
  );
};
