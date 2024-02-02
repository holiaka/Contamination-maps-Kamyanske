import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ErrorText,
  SubmitForm,
  InputBox,
  Input,
  InputName,
  SubmitBtn,
} from '../components/ContactForm/ContactForms';
import { signInFetch } from './../firebase/sdk';
import { useOutletContext, useNavigate } from "react-router-dom";
import { notifyToast } from './../components/Notify/notifyPropertyCode';



const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({

  email: Yup.string()
    .min(3, 'Too Short!')
        .required('Required'),
  password: Yup.string()
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

export const LogIn = () => {
  const [setUserEmail, setToken ] = useOutletContext();
  const navigate = useNavigate();

  const onSubmit = async({ email, password }) => { 
    const fetchData = await signInFetch(email, password); 
    
    console.log('fetchData', fetchData, fetchData.accessToken);
    
    if (fetchData.accessToken !== undefined) {
      setUserEmail(fetchData.email);
      setToken(fetchData.accessToken);      
      navigate("/", { replace: true });  
      notifyToast('success', 'You have successfully logged in to your profile!');
    } else {
      notifyToast('error', 'You are not logged in!', `${fetchData}`);
    }   
  };

  const onSubmitInner = (value, { resetForm }) => {
    onSubmit(value);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitInner}
      validationSchema={validationSchema}
    >
      <SubmitForm>        
        <InputName>Email: </InputName>
        <InputBox>
          <Input
            type="email"
            name="email"
            placeholder="Enter e-mail"
            required
          ></Input>
          <FormError name="email" />
              </InputBox>
              <InputName>Email: </InputName>
        <InputBox>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          ></Input>
          <FormError name="password" />
        </InputBox>
        <SubmitBtn type="submit">Sign In</SubmitBtn>
      </SubmitForm>
    </Formik>
  );
};