import Header from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import styles from './AdminResults.module.css';

import { ReactComponent as Logout } from 'assets/logout.svg';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';

export default function AdminResults() {
  const { user } = useContext(AppContext);
  return (
    <AnimatedPage>
      <div id={styles.container}>
        <Header
          text={`${user?.firstName} ${user?.secondName}`}
          CTA={{ Icon: Logout, text: 'Wyloguj się' }}
        />
        <div></div>
        <AdminNavbar />
      </div>
    </AnimatedPage>
  );
}
