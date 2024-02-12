import { Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Maps } from './Maps/Maps';
import { About } from "./About/About";
import { RegisterForm } from "../auth-pages/Register";
import { LogIn} from "../auth-pages/LogIn"
import { NotFound } from "./NotFound/NotFound";
import { ProfilManagment } from "auth-pages/ProfileManagement";

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
            <Route index element={<Maps />}></Route>
            <Route path="/about" element={<About />}></Route>   
            <Route path="/registration" element={<RegisterForm />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/profil" element={<ProfilManagment /> }></Route>
            <Route path="*" element={< NotFound/> }></Route>
          </Route>
        </Routes>
      </Suspense>       
      </div>

  );
};
