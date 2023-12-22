import { NavLink } from "react-router-dom";
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(90deg, rgba(134,135,136,0) 0%, rgba(134,135,136,0.19931722689075626) 10%, rgba(116,121,116,0.30015756302521013) 50%, rgba(134,135,136,0.2) 90%, rgba(134,135,136,0) 100%);
`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    height: 10vh;
    

`
export const InnerHeader = styled.div`

`
export const HeaderSide = styled.div`

`

export const HeaderNav = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    border-bottom: 1px solid;
`

export const Link = styled(NavLink)`
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    :hover{
        color: blue;
    }
`;

export const Footer = styled.footer`

height: 5vh;
bottom: 0px;
display: flex;
gap: 20px;
flex-direction: column;
`