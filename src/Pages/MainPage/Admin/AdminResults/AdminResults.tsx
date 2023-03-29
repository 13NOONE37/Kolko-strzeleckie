import React from 'react';

import styles from './AdminResults.module.css';

import AnimatedPage from 'components/AnimatedPage/AnimatedPage';
import TrainingResult from 'components/TrainingResult/TrainingResult';
import Results from 'components/Results/Results';

export default function AdminResults() {
  return (
    <AnimatedPage>
      <div className={styles.container}>
        <Results />
        {/* <TrainingResult date={new Date()} points={100} tens={10} />
        <TrainingResult date={new Date()} points={100} tens={10} />
        <TrainingResult date={new Date()} points={100} tens={10} /> */}
      </div>
    </AnimatedPage>
  );
}
