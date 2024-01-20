import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { Avatar } from '@chakra-ui/react';
import { ExitButton } from './IfAuth.styled';
import { HeaderNav } from '../SharedLayout.styled';
import { signOutFeatch } from './../../../firebase/sdk';
import { FaUserPen } from "react-icons/fa6";

export const IfAuth = (props) => {
  const { email, setEmail, setToken, setError } = props;
  
  const createInitials = (name) => {
    if (name.length > 0) {
      const firstL = name[0].toUpperCase();
      const secondL = name[1].toUpperCase();
      console.log(`${firstL} ${secondL}`)
      return `${firstL} ${secondL}`;
    } else {
      return;
    }
  }

  const navigate = useNavigate();

  const onClick = async () => {
    console.log(props);
    const fetchData = await signOutFeatch();   
    setEmail('');
    setToken('');
    setError('');
    console.log('Output Data', fetchData);
    navigate('/login', { replace: true });
  };

  const onClickAvatar = async () => {
    navigate('/profil');
  }


  return (
    <HeaderNav>
      <Avatar name = {createInitials(email)} as="button" _hover={{ bg: "teal.600"} }
    _focus={{ boxShadow: "outline" }} onClick={onClickAvatar}></Avatar>
      <ExitButton marginTop='5' marginRight='10' colorScheme="teal" onClick={onClick}>
        <ImExit></ImExit>
      </ExitButton>
    </HeaderNav>
  );
};
