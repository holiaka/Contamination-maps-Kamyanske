import styled from "styled-components";

export const LegendBox = styled.div`
position: absolute;
right: 10px;
bottom: 30px;
z-index: 1001;

display: flex;
flex-direction: column;
align-items: baseline;
max-width: 20%;
max-height: 20vh;

padding: 5px;
background-color: #ffffff;
`;

export const LegendTitle = styled.h2`
font-size: 20px;
font-weight: 700;
`;

export const Item = styled.div`
display: flex;
`;

export const ColorAttribute = styled.div`
background-color: ${(props) => props.color};
width: 10px;


`;

export const TextAttribute = styled.p`



`;