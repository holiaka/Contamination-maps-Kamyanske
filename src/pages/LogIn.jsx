import { useDispatch} from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { selectContacts } from 'redux/selector';
import {
  ErrorText,
  SubmitForm,
  InputBox,
  Input,
  InputName,
  SubmitBtn,
} from '../components/ContactForm/ContactForms';
import { logIn } from '../redux/auth/operations';


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
  const dispatch = useDispatch();

//   const oldContacts = useSelector(selectContacts);

  const onSubmit = ({ email, password }) => { 
      dispatch(logIn({ email, password }));    
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
        <SubmitBtn type="submit">Create account</SubmitBtn>
      </SubmitForm>
    </Formik>
  );
};