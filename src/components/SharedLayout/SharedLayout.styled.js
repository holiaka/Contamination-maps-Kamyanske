import styled from 'styled-components';
import { Text } from '@chakra-ui/react';

export const Container = styled.div`
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(
    90deg,
    rgba(134, 135, 136, 0) 0%,
    rgba(134, 135, 136, 0.19931722689075626) 10%,
    rgba(116, 121, 116, 0.30015756302521013) 50%,
    rgba(134, 135, 136, 0.2) 90%,
    rgba(134, 135, 136, 0) 100%
  );
  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  border-bottom: 1px solid #000000;
`;
export const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;
export const HeaderSide = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderNav = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  justify-content: baseline;
  align-items: center;
`;

export const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 85vh;
  margin-left: 0;
  margin-right: 0;

  @media (max-width: 420px) {
    height: 90vh;
  }
`;

export const Footer = styled.footer`
  margin-left: auto;
  margin-right: auto;

  height: 5vh;
  width: 80%;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding: 5px;
`;

export const FooterText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
