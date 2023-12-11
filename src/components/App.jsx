import { Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Contacts } from './Contacts/Contacts';
import { About } from "./About/About";
import { RegisterForm } from "../pages/Register";
import { LogIn} from "../pages/LogIn"

export const App = () => {  
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
      <Suspense>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Contacts />}></Route>
            <Route path="/about" element={<About />}></Route>   
            <Route path="/registration" element={<RegisterForm />}></Route>
            <Route path="/login" element={<LogIn /> }></Route>
          </Route>
        </Routes>
      </Suspense>       
      </div>

  );
};
