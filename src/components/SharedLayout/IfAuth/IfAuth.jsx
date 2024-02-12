import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { Avatar } from '@chakra-ui/react';
import { ExitButton } from './IfAuth.styled';
import { HeaderNav } from '../SharedLayout.styled';
import { signOutFeatch } from './../../../firebase/sdk';
import { notifyToast } from 'components/Notify/notifyPropertyCode';

export const IfAuth = (props) => {
  const { email, setEmail, setToken } = props;
  
  const createInitials = (name) => {
    if (name.length > 0) {
      const firstL = name[0].toUpperCase();
      const secondL = name[1].toUpperCase();
      return `${firstL} ${secondL}`;
    } else {
      return;
    }
  }

  const navigate = useNavigate();

  const onClick = async () => {
    const fetchData = await signOutFeatch();
    if (fetchData === 'success') {
      setEmail('');
      setToken('');
      notifyToast('info', 'Connection session ended!');
      navigate('/login', { replace: true });
    } else {
      notifyToast('error', 'An error occurred!');
    }
  };

  const onClickAvatar = async () => {
    navigate('/profil');
  }


  return (
    <HeaderNav>
      <Avatar name = {createInitials(email)} as="button" _hover={{ bg: "teal.600"} }
    _focus={{ boxShadow: "outline" }} onClick={onClickAvatar}></Avatar>
      <ExitButton colorScheme="teal" onClick={onClick}>
        <ImExit></ImExit>
      </ExitButton>
    </HeaderNav>
  );
};
