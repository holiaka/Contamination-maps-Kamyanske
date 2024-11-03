import styled from "styled-components";

export const LegendBox = styled.div`
position: absolute;
right: 10px;
bottom: 30px;
z-index: 1001;

display: flex;
flex-direction: column;
align-items: center;
gap: 5px;
max-width: 45%;
max-height: 45vh;

padding: 5px;
background-color: #cccccc;
border-radius: 5px;
`;

export const LegendTop = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-items: center;
`;

export const LegendTitle = styled.h2`
font-size: 14px;
font-weight: 700;
`;

export const LegendBottom = styled.div`
display: flex;
align-items: baseline;
gap: 10px;



`

export const LegendItem = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
justify-items: center;
gap: 5px;
max-width: 150px;
`;

export const FuatureTitle = styled.h3`
font-weight: 700;
`;

export const Item = styled.div`
display: flex;
gap: 5px;
/* pointer-events: none; */
`;

export const ColorAttribute = styled.div`
background-color: ${(props) => props.color};
width: 40px;
`;

export const TextAttribute = styled.p`
font-size: 12px;
`;