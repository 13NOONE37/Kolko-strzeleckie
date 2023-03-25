import React, { useContext } from 'react';
import AppContext from 'store/AppContext';

import Ranking from 'components/Ranking/Ranking';
import Header from 'components/Header/Header';
import UserNavbar from 'components/Nav/ReadyVariations/UserNavbar';

import styles from './UserRanking.module.css';
import { ReactComponent as Logout } from 'assets/logout.svg';

export default function UserRanking() {
  const { user } = useContext(AppContext);
  return (
    <div id={styles.container}>
      <Header
        text={`${user?.firstName} ${user?.secondName}`}
        CTA={{ Icon: Logout, text: 'Wyloguj się' }}
      />
      <div className={styles.rankings}>
        <Ranking />
      </div>
      <UserNavbar />
    </div>
  );
}
