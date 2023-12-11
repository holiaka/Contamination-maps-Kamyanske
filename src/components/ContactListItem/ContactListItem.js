import styled from 'styled-components';

export const Item = styled.li`
width: 620px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;

  border: 1px dashed black;
`;

export const Button = styled.button`
  font-size: 20px;
  width: 100px;
  transition: 250ms, background-color;
  :hover {
    background-color: lightblue;
  }
`;

export const TextContainer = styled.div`
`;

export const ContactText = styled.p`
  max-width: 500px; 
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`;
