import Header from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import styles from './AdminRanking.module.css';

import { ReactComponent as Logout } from 'assets/logout.svg';
import Ranking from 'components/Ranking/Ranking';
import Select from 'components/Select/Select';

export default function AdminRanking() {
  const { user } = useContext(AppContext);
  return (
    <div id={styles.container}>
      <Header
        text={`${user?.firstName} ${user?.secondName}`}
        CTA={{ Icon: Logout, text: 'Wyloguj się' }}
      />
      <div className={styles.rankings}>
        {/* 
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
        /> */}
        <Ranking
          text={
            <>
              Najlepsi w sezonie <span>{'2022/23'}</span>{' '}
              <span style={{ fontSize: '20px' }}>
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
              </span>
              <br />
              <br />
              Liczba treningów: <span>{4}</span>
            </>
          }
        />
      </div>
      <AdminNavbar />
    </div>
  );
}
