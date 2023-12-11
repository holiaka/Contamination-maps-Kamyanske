import { useSelector } from 'react-redux';
import { ContactListItem } from 'components/ContactListItem/ContactListItem.jsx';
import { Wrapper } from './ContactList.styled';
import { selectVisibleContacts } from 'redux/contacts/selector';

export const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  
  return (
    <Wrapper>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
        ></ContactListItem>
      ))}
    </Wrapper>
  );
};
