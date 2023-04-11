import React from 'react';

import AnimatedPage from 'components/AnimatedPage/AnimatedPage';
import styles from './AdminTraining.module.css';
import Trainings from 'components/Tranings/Trainings';

export default function AdminTraining() {
  return (
    <AnimatedPage>
      <div className={styles.container}>
        <Trainings />
      </div>
    </AnimatedPage>
  );
}
