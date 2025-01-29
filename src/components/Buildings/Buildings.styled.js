import styled from 'styled-components';


export const BuildingSpace = styled.div`
width: 100%;
height: 100%;
`;

export const MenuSpace = styled.div`
display: flex;
flex-direction: row;
gap: 10px;    

`;

export const SelectedTab = styled.div`
display: flex;
flex-direction: row;
gap: 2px;    

`;

export const MapBox = styled.div`
display: flex;
width: 100%;
height: 78vh;
`;

export const MapInfo = styled.div`
width: 30%;
height: auto;
padding: 10px;

`;

export const MapTitle = styled.h1`
width: auto;
font-size: 20px;
text-align: center;
font-weight: 700;
`;

export const MapLegend = styled.h2`
width: auto;
font-size: 16px;
text-align: center;
font-weight: 500;

`;

export const ItemName = styled.h3`
width: auto;
font-size: 14px;
text-align: center;
font-weight: 500;
`;

export const LegendConteiner = styled.div`
width: 100%;
height: 60vh;
overflow: hidden;
position: relative;
`

export const LegendBox = styled.div`
width: 100%;
height:100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
padding: 10px;

margin-bottom: 100px;
`;

