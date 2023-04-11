import { HeaderCTA } from 'components/Header/Header';
import Select from 'components/Select/Select';
import React, { FC, useEffect, useState } from 'react';
import styles from './Trainings.module.css';

interface TrainingType {
  id: String | Number;
  date: Date;
}
const Training: FC<TrainingType> = ({ id, date }) => {
  const [showNote, setShowNote] = useState(false);
  return (
    <div className={styles.record}>
      <span className={styles.date}>{date.toLocaleDateString()}</span>

      <HeaderCTA text="Edytuj" />
    </div>
  );
};

const Trainings: FC = () => {
  const [season, setSeason] = useState(null);

  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  useEffect(() => {
    //fetch data
    setTrainings([
      {
        id: '342dfasdf',
        date: new Date(2022, 7, 14),
      },
      {
        id: '342dfasdf',
        date: new Date(2022, 6, 13),
      },
      {
        id: '342dfasdf',
        date: new Date(2022, 5, 12),
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.element}>
          <h2>Sezon: </h2>
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
            width="100%"
          />
        </span>
        <span className={styles.element}>
          <h2>Trening: </h2>
          <HeaderCTA text="Klinij by stworzyć" />
        </span>
      </div>

      <div className={styles.ranking}>
        {trainings.length > 0 ? (
          <>
            {trainings.map((training) => (
              <Training {...training} />
            ))}
          </>
        ) : (
          <h1>display skeleton loading</h1>
        )}
      </div>
    </div>
  );
};

export default Trainings;
