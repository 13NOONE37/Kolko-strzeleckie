import React, { FC } from 'react';
import styles from './TrainingResult.module.css';

import { ReactComponent as Bolt } from 'assets/bolt.svg';
import { ReactComponent as Fire } from 'assets/fire.svg';
import { ReactComponent as Note } from 'assets/note.svg';
interface TrainingResult {
  date: Date;
  points: number;
  tens: number;
  note?: string | undefined;
}
const TrainingResult: FC<TrainingResult> = ({ date, points, tens, note }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles['box__date']}`}>
        {date.toLocaleDateString()}
      </div>
      <div className={`${styles.box} ${styles['box__points']}`}>
        <span className={styles.info}>
          <Bolt />
          Punkty
        </span>
        <span className={styles.result}>{points}</span>
      </div>
      <div className={`${styles.box} ${styles['box__tens']}`}>
        <span className={styles.info}>
          <Fire />
          Dziesiątki
        </span>
        <span className={styles.result}>{tens}</span>
      </div>
      <div className={`${styles.box} ${styles['box__note']}`}>
        <span className={styles.info}>
          <Note />
          Uwagi:
        </span>
        <span className={styles.result}>{note}</span>
      </div>
    </div>
  );
};

export default TrainingResult;
