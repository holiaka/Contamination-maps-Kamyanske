
import { LegendBox, LegendTitle, Item, ColorAttribute, TextAttribute } from "./Legend.styled";
import { attributeSchema } from "./legendAttribute";


export const Legend = () => {
    
    return (
        <LegendBox>
            <LegendTitle>Ambien dose equivalent rate in air, &mu;Sv: </LegendTitle>
            {attributeSchema.map((item) => <Item key={item.color}><ColorAttribute color={item.color} /><TextAttribute>{item.value}</TextAttribute></Item>)}

        </LegendBox>        
    );
};