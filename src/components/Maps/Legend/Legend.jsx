
import { LegendBox, LegendTitle, Item, ColorAttribute, TextAttribute } from "./Legend.styled";
import { attributeSchema } from "./legendAttribute";


export const Legend = () => {
    
    return (
        <LegendBox>
            <LegendTitle>AEDR, mkSv: </LegendTitle>
            {attributeSchema.map((item) => <Item key={item.color}><ColorAttribute color={item.color} /><TextAttribute>{item.value}</TextAttribute></Item>)}

        </LegendBox>        
    );
};