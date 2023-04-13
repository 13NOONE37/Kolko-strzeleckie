import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import pages, { pageRoleType, pageType } from 'Pages/pages';
import GuestRoute from 'Pages/GuestRoute';
import AppContext from 'store/AppContext';
import NotFound from 'Pages/NotFound/NotFound';
import PrivateRoute from 'Pages/PrivateRoute';
import { AnimatePresence } from 'framer-motion';
import useSession from 'utils/useSession';

function App() {
  axios.defaults.withCredentials = true;
  const [isLogged, setIsLogged] = useState(null);
  const [user, setUser] = useState(null);

  useSession(setIsLogged, setUser);

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="*" element={<NotFound />} />
          {pages.authPages.map((authPage: pageRoleType) => {
            return (
              <Route
                path={authPage.path}
                element={
                  <PrivateRoute
                    roles={authPage.roles}
                    children={authPage.element}
                  />
                }
                key={authPage.path}
              >
                {authPage.subPages?.map((subPage) => (
                  <Route
                    path={subPage.path}
                    key={subPage.path}
                    element={subPage.element}
                  />
                ))}
              </Route>
            );
          })}

          <Route path="/" element={<GuestRoute />}>
            {pages.guestPages.map((guestPage: pageType, index: number) => {
              return (
                <Route
                  path={guestPage.path}
                  element={guestPage.element}
                  key={index}
                />
              );
            })}
          </Route>
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;
