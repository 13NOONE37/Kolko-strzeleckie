import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header, { useProgressBarValues } from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import UserNavbar from './components/Nav/ReadyVariations/UserNavbar';
import { ReactComponent as Logout } from 'assets/logout.svg';
import Select from 'components/Select/Select';
import TrainingResult from 'components/TrainingResult/TrainingResult';
import Ranking from 'components/Ranking/Ranking';
import LoginPage from 'Pages/LoginPage/LoginPage';
import pages, { pageRoleType, pageType } from 'Pages/pages';
import AuthRoute from 'Pages/PrivateRoute';
import GuestRoute from 'Pages/GuestRoute';
import AppContext from 'store/AppContext';
import NotFound from 'Pages/NotFound/NotFound';
import { ROLE } from 'Pages/roles';
import PrivateRoute from 'Pages/PrivateRoute';
function App() {
  // const [isLogged, setIsLogged] = useState(false);
  // const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState({
    role: ROLE.Admin,
    firstName: 'Oliwer',
    secondName: 'Klauze',
  });

  // const { steps, currentStep, nextStep, prevStep } = useProgressBarValues(3, 1);

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
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
            />
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
