import React, { FC, useEffect, useState } from 'react';
import styles from './Ranking.module.css';

interface UserType {
  firstName: string;
  secondName: string;
  points: number;
  tens: number;
}
interface RankingPlaceType extends UserType {
  index: number;
}
const RankingPlace: FC<RankingPlaceType> = ({
  firstName,
  secondName,
  points,
  tens,
  index,
}) => {
  return (
    <div className={styles.record} tabIndex={0}>
      <span className={styles.place}>{index + 1}</span>
      <span className={styles.name}>
        <span className={styles.secondName}>{secondName}</span>{' '}
        <span className={styles.firstName}>{firstName}</span>
      </span>
      <span className={styles.points}>
        {points}
        <span className={styles.maxscore}>/100</span>
      </span>
      <span className={styles.tens}>
        {tens}
        <span className={styles.maxscore}>/10</span>
      </span>
    </div>
  );
};

interface RankingType {
  text: JSX.Element;
}
const Ranking: FC<RankingType> = ({ text }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  useEffect(() => {
    //fetch data
    setUsers([
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Maksymilian',
        secondName: 'Morawiecki',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
      {
        firstName: 'Jan',
        secondName: 'Kowalski',
        points: 83,
        tens: 3,
      },
      {
        firstName: 'Adam',
        secondName: 'Kowalski',
        points: 73,
        tens: 2,
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{text}</h2>

      <div className={styles.names}>
        <span>Uczeń</span>
        <span>Punkty</span>
        <span>Dziesiątki</span>
      </div>

      <div className={styles.ranking}>
        {users.length > 0 ? (
          <>
            {users.map((user: UserType, index: number) => (
              <RankingPlace {...user} index={index} />
            ))}
          </>
        ) : (
          <h1>display skeleton loading</h1>
        )}
      </div>
    </div>
  );
};

export default Ranking;
