import React, { useState } from 'react';
import './App.css';
import Header, { useProgressBarValues } from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import UserNavbar from './components/Nav/ReadyVariations/UserNavbar';
import { ReactComponent as Logout } from 'assets/logout.svg';
function App() {
  // const { steps, currentStep, nextStep, prevStep } = useProgressBarValues(3, 1);
  return (
    <>
      <Header
        text="Paweł Paluszkiewicz"
        CTA={{ Icon: Logout, text: 'Wyloguj się' }}
        // progressBar={true}
        // progressProps={{
        //   steps: steps,
        //   currentStep: currentStep,
        // }}
      />
      {/* <UserNavbar /> */}
      <AdminNavbar />
    </>
  );
}

export default App;
