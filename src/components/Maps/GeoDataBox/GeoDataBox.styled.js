import styled from 'styled-components';

export const DataBox = styled.div`
  position: absolute;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  /* pointer-events: none; */

  z-index: 10000;

  display: flex;
  justify-content: space-between;
  max-width: 45%;
  min-width: 320px;
  max-height: 45vh;
  font-size: 18px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
