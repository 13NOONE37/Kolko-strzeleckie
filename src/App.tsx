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
  // const [isLogged, setIsLogged] = useState(false);
  // const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [user, setUser] = useState(null);

  useSession(setIsLogged, setUser);

  // const { steps, currentStep, nextStep, prevStep } = useProgressBarValues(3, 1);

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

// <>
/* <LoginPage /> */
{
  /* <Header
        text="Paweł Paluszkiewicz"
        CTA={{ Icon: Logout, text: 'Wyloguj się' }}
        // progressBar={true}
        // progressProps={{
        //   steps: steps,
        //   currentStep: currentStep,
        // }}
      /> */
}

{
  /* <div style={{ display: 'flex', gap: '10px' }}>
        <Select
          placeholder="Sezon:"
          defaultValue={{ label: 'Sezon 19/20', value: '19/20' }}
          options={[
            { label: 'Sezon 19/20', value: '19/20' },
            { label: 'Sezon 20/21', value: '20/21' },
            { label: 'Sezon 21/22', value: '21/22' },
          ]}
          changeCallback={() => {}}
          isSearchable={false}
        />
        <Select
          placeholder="Liczba treningów"
          options={[
            { label: 'Wszysktie', value: -1 },
            { label: 'Liczba treningów: 1', value: 1 },
            { label: 'Liczba treningów: 2', value: 2 },
            { label: 'Liczba treningów: 3', value: 3 },
            { label: 'Liczba treningów: 4', value: 4 },
            { label: 'Liczba treningów: 5', value: 5 },
            { label: 'Liczba treningów: 6', value: 6 },
            { label: 'Liczba treningów: 7', value: 7 },
            { label: 'Liczba treningów: 8', value: 8 },
            { label: 'Liczba treningów: 9', value: 9 },
            { label: 'Liczba treningów: 10', value: 10 },
          ]}
          changeCallback={() => {}}
          isSearchable={true}
          width={'220px'}
        />
      </div> */
}
{
  /* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TrainingResult date={new Date()} points={89} tens={9} />
        <TrainingResult
          date={new Date()}
          points={89}
          tens={9}
          note={
            'Użyto tłumika lorem ipaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasum dolo realerm'
          }
        />
      </div> */
}
{
  /* <div style={{ width: '100%', height: `100%`, overflow: 'auto' }}>
        <Ranking />
      </div> */
}
{
  /* <UserNavbar /> */
}

{
  /* <AdminNavbar /> */
}
// </>
