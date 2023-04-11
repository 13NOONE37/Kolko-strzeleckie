import React from 'react';

import Ranking from 'components/Ranking/Ranking';

import styles from './UserRanking.module.css';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';
import useSeasons from 'utils/useSeasons';

export default function UserRanking() {
  const { data, loading } = useSeasons();
  return (
    <AnimatedPage>
      <div className={styles.rankings}>
        <Ranking />
      </div>
    </AnimatedPage>
  );
}
