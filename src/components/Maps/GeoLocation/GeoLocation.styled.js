import styled from "styled-components";
import { TbCurrentLocation,  TbCurrentLocationOff } from "react-icons/tb";


export const SwitchGeolocation = styled.button`
    position: absolute;
    left: 10px;
    bottom: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1000;
    /* pointer-events: none; */
`;

export const Follow = styled(TbCurrentLocation)`
width: 30px;
height: 30px;
fill: green;
:hover{
    fill: lightgreen;
    transition: fill 500ms;
}
`;

export const UnFollow = styled(TbCurrentLocationOff)`
width: 30px;
height: 30px;
fill: red;
:hover{
    fill: lightpink;
    transition: fill 500ms;
}
`;
