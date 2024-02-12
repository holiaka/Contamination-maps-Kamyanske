import styled from 'styled-components';
import { Form, Field } from 'formik';

export const SubmitForm = styled(Form)`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: lightgray;
  width: 50%;
  min-width: 320px;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputBox = styled.div`
  margin-bottom: 20px;
  line-height: 0.6;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputName = styled.p`
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
  font-weight: 700;
`;

export const ErrorContainer = styled.div`
display: flex;
justify-content: end;
  height: 10px;
`;

export const ErrorText = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-bottom: 0;
`;

export const Input = styled(Field)`
  margin-left: auto;
  margin-right: auto;

  font-size: 24px;
  font-weight: 500;
  text-align: center;

  height: 30px;
  width: 80%;
  border-radius: 5px;

@media (max-width: 720px) {
    width: 100%;
  }
`;

export const SubmitBtn = styled.button`
  margin-left: auto;
  margin-right: auto;

  font-size: 20px;
  color: #319795;
  font-weight: 500;

  transition: 250ms background-color;
  transition: 250ms color;
  padding: 10px;
  min-width: 100px;
  border-radius: 10px;
  border: 2px solid #319795;

  :hover {
    color: #FFFFFF;
    background-color: #319795;
  }
`;
