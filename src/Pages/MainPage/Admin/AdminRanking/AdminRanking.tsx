import Header from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import styles from './AdminRanking.module.css';

import { ReactComponent as Logout } from 'assets/logout.svg';
import Ranking from 'components/Ranking/Ranking';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';

export default function AdminRanking() {
  const { user } = useContext(AppContext);
  return (
    <AnimatedPage>
      <div id={styles.container}>
        <Header
          text={`${user?.firstName} ${user?.secondName}`}
          CTA={{ Icon: Logout, text: 'Wyloguj się' }}
        />
        <div className={styles.rankings}>
          <Ranking />
        </div>
        <AdminNavbar />
      </div>
    </AnimatedPage>
  );
}
