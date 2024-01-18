import styled from 'styled-components';

export const DataBox = styled.div`
  position: absolute;
  padding: 10px;
  background-color: white;
  border-radius: 10px;

  z-index: 1000000000;

  display: flex;
  max-width: 30%;
  max-height: 30vh;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
