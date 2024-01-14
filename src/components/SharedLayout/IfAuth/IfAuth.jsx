import { Navigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { Avatar } from '@chakra-ui/react';
import { ExitButton } from './IfAuth.styled';
import { HeaderNav } from '../SharedLayout.styled';

export const IfAuth = (email) => {
  const name = email.email;
  console.log(name);
  const createInitials = (name) => {
    console.log(name);
    const firstL = name[0].toUpperCase();
    const secondL = name[1].toUpperCase();
    return `${firstL} ${secondL}`;
  }


  return (
    <HeaderNav>
      <Avatar name = {createInitials(name)}></Avatar>
      <ExitButton marginTop='5' marginRight='10' colorScheme="teal" >
        <ImExit></ImExit>
      </ExitButton>
    </HeaderNav>
  );
};
