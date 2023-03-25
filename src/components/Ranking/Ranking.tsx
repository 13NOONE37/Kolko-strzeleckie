import Select from 'components/Select/Select';
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

const Ranking: FC = () => {
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
      <div className={styles.heading}>
        <span className={styles.element}>
          <h2>Najlepsi w sezonie: </h2>
          {/* <span className={styles.color}>{'2022/23'}</span> */}
          <Select
            placeholder="Sezon"
            defaultValue={{ label: '2022/23', value: '22/23' }}
            options={[
              { label: '2022/23', value: '22/23' },
              { label: '2021/22', value: '21/22' },
              { label: '2020/21', value: '20/21' },
            ]}
            changeCallback={() => {}}
            isSearchable={true}
          />
        </span>
        <span className={styles.element}>
          <h2>Liczba treningów:</h2>
          {/* <span className={styles.color}>{'4'}</span> */}
          <Select
            placeholder="Liczba treningów"
            defaultValue={{ label: '1', value: 1 }}
            options={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 },
              { label: '7', value: 7 },
              { label: '8', value: 8 },
              { label: '9', value: 9 },
              { label: '10', value: 10 },
            ]}
            changeCallback={() => {}}
            isSearchable={true}
          />
        </span>
      </div>

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
