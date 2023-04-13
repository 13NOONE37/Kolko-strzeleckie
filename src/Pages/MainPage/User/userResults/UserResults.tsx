import React from 'react';

import styles from './UserResults.module.css';
import AnimatedPage from 'components/AnimatedPage/AnimatedPage';
import Results from 'components/Results/Results';

export default function UserResults() {
  return (
    <AnimatedPage>
      <div className={styles.container}>
        <Results />
      </div>
    </AnimatedPage>
  );
}
