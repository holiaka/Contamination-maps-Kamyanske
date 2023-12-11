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
import { registration } from '../redux/auth/operations';


const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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

export const RegisterForm = () => {
  const dispatch = useDispatch();

//   const oldContacts = useSelector(selectContacts);

  const onSubmit = ({ name, email, password }) => { 
      dispatch(registration({ name, email, password }));    
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
        <InputName>Name: </InputName>
        <InputBox>
          <Input type="text" name="name" required></Input>
          <FormError name="name" />
        </InputBox>
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
