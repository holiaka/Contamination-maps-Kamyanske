import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Text } from '@chakra-ui/react';
import {
  ErrorText,
  SubmitForm,
  InputBox,
  Input,
  InputName,
  SubmitBtn,
} from '../components/ContactForm/ContactForms';
import { changePassword, onRemoveAccouant } from './../firebase/sdk';
import { useNavigate, useOutletContext  } from "react-router-dom";
import { notifyToast } from './../components/Notify/notifyPropertyCode';
import { Button } from '@chakra-ui/react';
import { FaUserAltSlash } from "react-icons/fa";

const initialValues = {  
    password1: '',
    password2: '',
};

const validationSchema = Yup.object({ 
  password1: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
        .required('Required'),
  password2: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
        .required('Required'),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const ProfilManagment = () => {  
    const [setUserEmail, setToken, setError] = useOutletContext();
    const navigate = useNavigate();
  
    const onSubmit = async ({ password1, password2 }) => {
        let password = '';
        if (password1 !== password2) {
            notifyToast('error', 'The duplicate and previous passwords in the form are not identical!');
            return;
        } else {
            notifyToast('success', 'The duplicate and previous passwords in the form are input correctly!');
            password = password1;
        };
      const fetchData = await changePassword(password);   
      console.log(fetchData);
        if (fetchData.accessToken !== undefined) {
            notifyToast('success', 'Your account password was successfully changed!');
        } else {
            notifyToast('error', fetchData);
        };
  };

  const onSubmitInner = (value, { resetForm }) => {
    onSubmit(value);
    resetForm();
  };
    
  const onDelete = async() => {
    try {
      const data = await onRemoveAccouant();
      console.log('fuilfiled', data);
      navigate('/', { replace: true })
    } catch (error) {
      console.log('reject', error.message);
    }
    

    }

  return (
    <>
    <Text>Change password</Text>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitInner}
      validationSchema={validationSchema}
    >      
      <SubmitForm>
                <InputName>Password: </InputName>
        <InputBox>
          <Input
            type="password"
            name="password1"
            placeholder="Your new password!"
            required
          ></Input>
          <FormError name="password1" />
        </InputBox>

              <InputName>Password: </InputName>
        <InputBox>
          <Input
            type="password"
            name="password2"
            placeholder="Your new password!"
            required
          ></Input>
          <FormError name="password" />
        </InputBox>
        <SubmitBtn type="submit">Create account</SubmitBtn>
      </SubmitForm>
          </Formik>
          
          <div style={{minHeight: '20px'}}>
              <Text color='red'> Deleting your account now:   <Button onClick={onDelete} type='button' width='100px' colorScheme="red" leftIcon={< FaUserAltSlash /> }>Delete</Button></Text> 
          </div>
      </>


  );
};
