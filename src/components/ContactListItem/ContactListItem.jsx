import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/contacts/operations';
import { ContactText, Button, Item, TextContainer } from './ContactListItem';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <Item>
      <TextContainer>
        <ContactText>
          {name}: {number}
      </ContactText>
      </TextContainer>
            <Button
        type="button"
        id={id}
        onClick={() => dispatch(editContact(id))}
      >
        Edit
      </Button>
      <Button
        type="button"
        id={id}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </Button>
    </Item>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
