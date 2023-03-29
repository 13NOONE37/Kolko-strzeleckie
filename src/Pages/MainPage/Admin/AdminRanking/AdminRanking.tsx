import React from 'react';

import styles from './AdminRanking.module.css';
import Ranking from 'components/Ranking/Ranking';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';

export default function AdminRanking() {
  return (
    <AnimatedPage>
      <div className={styles.rankings}>
        <Ranking />
      </div>
    </AnimatedPage>
  );
}
