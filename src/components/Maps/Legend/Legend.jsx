import {
  LegendBox,
  LegendTitle,
  Item,
  ColorAttribute,
  TextAttribute,
  LegendTop,
  LegendItem,
  FuatureTitle,
  LegendBottom,
} from './Legend.styled';
import { Button } from '@chakra-ui/react';
import { attributeSchema } from './legendAttribute';
import { useState } from 'react';

export const Legend = () => {
  const [legend, setLegend] = useState(() => []);

  const toggleLegends = e => {
    if (e.target.innerText === 'Gamma dose rate') {
      if (legend.includes('Gamma dose rate')) {
        setLegend(() => legend.filter(item => item !== 'Gamma dose rate'));
      } else {
        setLegend(legend => [...legend, 'Gamma dose rate']);
      }
    } else {
      if (legend.includes('Beta-particals flux')) {
        setLegend(() => legend.filter(item => item !== 'Beta-particals flux'));
      } else {
        setLegend(legend => [...legend, 'Beta-particals flux']);
      }
    }
    console.log(legend);
  };

  return (
    <LegendBox>
      <LegendTop>
        <LegendTitle>Show legend:</LegendTitle>
        <div>
          <Button onClick={toggleLegends} colorScheme="teal" size="sm">
            Gamma dose rate
          </Button>
          &nbsp; and / or &nbsp;
          <Button onClick={toggleLegends} colorScheme="teal" size="sm">
            Beta-particals flux
          </Button>
        </div>
      </LegendTop>
      <LegendBottom>
        {legend.includes('Gamma dose rate') ? (
          <LegendItem>
            <FuatureTitle>{attributeSchema.gamma.title}</FuatureTitle>
            {attributeSchema.gamma.list.map(item => (
              <Item key={item.color}>
                <ColorAttribute color={item.color} />
                <TextAttribute>{item.value}</TextAttribute>
              </Item>
            ))}
          </LegendItem>
        ) : null}
        {legend.includes('Beta-particals flux') ? (
          <LegendItem>
            <FuatureTitle>{attributeSchema.beta.title}</FuatureTitle>
            {attributeSchema.beta.list.map(item => (
              <Item key={item.color}>
                <ColorAttribute color={item.color} />
                <TextAttribute>{item.value}</TextAttribute>
              </Item>
            ))}
          </LegendItem>
        ) : null}
      </LegendBottom>
    </LegendBox>
  );
};
