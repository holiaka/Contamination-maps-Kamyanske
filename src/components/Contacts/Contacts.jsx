// import { Suspense, lazy } from "react";
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { selectError, selectIsLoading } from 'redux/contacts/selector';

export const Contacts = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
        <div>
        <h1
          style={{
            margin: 0,
            fontSize: '36px',
            textAlign: 'center',
          }}
        >
          Phonebook
        </h1>
        <ContactForm></ContactForm>
        <h2
          style={{
            margin: 0,
            fontSize: '28px',
            textAlign: 'center',
          }}
        >
          Contacts
        </h2>
        <Filter></Filter>
        { isLoading && <Loader></Loader> }
        {!isLoading && !error && <ContactList></ContactList>}
        {!isLoading && error && <Error></Error>}
      </div>     
    </div>
  );
};