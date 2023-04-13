import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import React, { FC, useEffect, useState } from 'react';
import styles from './EditTraining.module.css';
import getUsers from 'utils/getUsers';
import getUserTrainingInfo from 'utils/getUserTrainingInfo';

interface TrainingType {
  training_id: string | number;
  user_id: string | number;
  date: Date;
  points: number;
  tens: number;
  note: string | undefined;
}
const Training: FC<TrainingType> = ({
  training_id,
  user_id,
  date,
  points,
  tens,
  note,
}) => {
  return (
    <div className={styles.record}>
      <input type="number" value={points} />
      <input type="number" value={tens} />
      <textarea>{note}</textarea>
    </div>
  );
};

interface EditTrainingType {
  training_id: string | number;
}
const EditTraining: FC<EditTrainingType> = ({ training_id }) => {
  const [loading, setLoading] = useState(true);

  const [trainingInfo, setTrainingInfo] = useState<TrainingType[] | undefined>(
    undefined,
  );
  const [currentUser, setCurrentUser] = useState<SelectOption | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<SelectOption[] | undefined>(undefined);

  const changeUser = (user: SelectOption | null) => {
    if (!user) return;
    setCurrentUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
      if (data) {
        setCurrentUser(data[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserTrainingInfo(training_id);
      if (data) {
        setTrainingInfo(data as any);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        '...'
      ) : (
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.element}>
              <h2>Użytkownik: </h2>
              <Select
                placeholder="Użytkownik"
                defaultValue={currentUser}
                options={users}
                changeCallback={changeUser}
                isSearchable={true}
                width="100%"
              />
            </span>
          </div>

          <div className={styles.ranking}>
            {/* {trainingInfo?.map((info) => {
              <Training
                training_id={training_id}
                user_id={currentUser?.value}
                {...info}
              />;
            })} */}
          </div>
        </div>
      )}
    </>
  );
};

export default EditTraining;
