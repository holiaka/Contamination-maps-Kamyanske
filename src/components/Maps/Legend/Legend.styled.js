import styled from "styled-components";

export const LegendBox = styled.div`
position: absolute;
right: 10px;
bottom: 30px;
z-index: 1001;

display: flex;
flex-direction: column;
align-items: baseline;
gap: 5px;
max-width: 45%;
max-height: 45vh;

padding: 5px;
background-color: #cccccc;
border-radius: 5px;
`;

export const LegendTitle = styled.h2`
font-size: 20px;
font-weight: 700;
`;

export const Item = styled.div`
display: flex;
gap: 10px;
/* pointer-events: none; */
`;

export const ColorAttribute = styled.div`
background-color: ${(props) => props.color};
width: 40px;


`;

export const TextAttribute = styled.p`
font-size: 16px;


`;