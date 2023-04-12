import React from 'react';

import Ranking from 'components/Ranking/Ranking';

import styles from './UserRanking.module.css';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';

export default function UserRanking() {
  return (
    <AnimatedPage>
      <div className={styles.rankings}>
        <Ranking />
      </div>
    </AnimatedPage>
  );
}
