import styled from 'styled-components';
import { Form, Field } from 'formik';

export const SubmitForm = styled(Form)`
    padding: 20px;
    margin-bottom: 20px;    
    border-radius: 20px;
    background-color: lightgray;
    width: 600px;  
`;

export const InputBox = styled.div`
    margin-bottom: 20px;
    line-height: 0.6;

    display: flex;
    gap: 10px;
`

export const InputName = styled.p`
    margin: 0;
    font-size: 24px;
`;

export const ErrorText = styled.p`
    color: #ff0000;
    font-size: 12px;
    margin-bottom: 0;
`;

export const Input = styled(Field)`
    font-size: 20px;
    width: 300px;
    height: 20px;
`;

export const SubmitBtn = styled.button`
    margin-left: 250px;
    font-size: 20px;
    transition: 250ms background-color;
    padding: 10px;
    border-radius: 10px;
    :hover{
        background-color: lightblue;
    }
`;
