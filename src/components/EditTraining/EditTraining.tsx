import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import { FC, useEffect, useState } from 'react';
import styles from './EditTraining.module.css';
import getUsers from 'utils/getUsers';
import getUserTrainingInfo from 'utils/getUserTrainingInfo';
import updateTraining from 'utils/updateTraining';
import Loader from 'components/Loader/Loader';

interface TrainingType {
  training_id: string | number;
  setTrainingEditing: (a: null) => void;
}
interface EditTrainingType {
  points: number | undefined;
  tens: number | undefined;
  note: string | undefined;
}
interface EditFieldsType {
  training_id: string;
  user_id: string;
  currentTrainingInfo: EditTrainingType;
  setCurrentTrainingInfo: (a: EditTrainingType) => void;
}
const EditFields: FC<EditFieldsType> = ({
  training_id,
  user_id,
  currentTrainingInfo,
  setCurrentTrainingInfo,
}) => {
  const [info, setInfo] = useState<string | null>(null);
  const handleSaveData = async () => {
    if (
      currentTrainingInfo.points === undefined ||
      currentTrainingInfo.tens === undefined ||
      currentTrainingInfo.note === undefined
    )
      return;
    const result = await updateTraining(
      training_id,
      user_id,
      currentTrainingInfo.points,
      currentTrainingInfo.tens,
      currentTrainingInfo.note,
    );
    console.log('Result: ', result);
    const tempResponse = result;
    setInfo(tempResponse.message || null);
    setTimeout(() => setInfo(null), 3000);
  };
  return (
    <>
      <span className={styles.info}>{info}</span>
      <input
        type="number"
        placeholder="Punkty"
        value={currentTrainingInfo.points}
        onChange={(e) =>
          setCurrentTrainingInfo({
            ...currentTrainingInfo,
            points: Math.max(0, Math.min(100, e.target.valueAsNumber)),
          })
        }
        className={`${styles.input} ${styles.points}`}
      />
      <input
        type="number"
        placeholder="Dziesiątki"
        value={currentTrainingInfo.tens}
        onChange={(e) =>
          setCurrentTrainingInfo({
            ...currentTrainingInfo,
            tens: Math.max(0, Math.min(10, e.target.valueAsNumber)),
          })
        }
        className={`${styles.input} ${styles.tens}`}
      />
      <textarea
        className={`${styles.input} ${styles.note}`}
        placeholder="Uwagi"
        value={currentTrainingInfo.note}
        onChange={(e) =>
          setCurrentTrainingInfo({
            ...currentTrainingInfo,
            note: e.target.value,
          })
        }
      />
      <HeaderCTA text="Zapisz" callback={handleSaveData} />
    </>
  );
};

const EditTraining: FC<TrainingType> = ({
  training_id,
  setTrainingEditing,
}) => {
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<SelectOption | undefined>(
    undefined,
  );
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [currentUserTrainingInfo, setCurrentUserTrainingInfo] = useState<
    EditTrainingType | undefined
  >(undefined);
  const [users, setUsers] = useState<SelectOption[] | undefined>(undefined);

  const changeUser = (user: SelectOption | null) => {
    if (!user) return;
    setCurrentUser(user);

    let index = users?.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(user),
    );
    if (typeof index === 'number') {
      setCurrentUserIndex(index);
    }
  };
  const prevIndex = () => {
    if (!users) return;

    const index = Math.max(0, Math.min(users.length - 1, currentUserIndex - 1));

    changeUser(users[index]);
    setCurrentUserIndex(index);
  };
  const nextIndex = () => {
    if (!users) return;

    const index = Math.max(0, Math.min(users.length - 1, currentUserIndex + 1));

    changeUser(users[index]);
    setCurrentUserIndex(index);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
      if (data) {
        setCurrentUser(data[0]);
        setCurrentUserIndex(0);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserTrainingInfo(
        String(training_id),
        String(currentUser?.value),
      );

      if (data && currentUser) {
        console.log(data);
        setCurrentUserTrainingInfo(data);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.cancel}>
              <HeaderCTA
                text="Wyjdź"
                callback={() => {
                  if (
                    window.confirm('Czy chcesz zakończyć edytowanie treningu?')
                  ) {
                    setTrainingEditing(null);
                  }
                }}
              />
            </span>

            <span className={styles.element}>
              <HeaderCTA text="Poprzedni" callback={prevIndex} />
              <Select
                placeholder="Użytkownik"
                defaultValue={currentUser}
                options={users}
                changeCallback={changeUser}
                isSearchable={true}
                width="100%"
              />
              <HeaderCTA text={'Następny'} callback={nextIndex} />
            </span>
          </div>

          <div className={styles.fields}>
            {currentUserTrainingInfo && (
              <EditFields
                training_id={String(training_id)}
                user_id={String(currentUser?.value)}
                currentTrainingInfo={currentUserTrainingInfo}
                setCurrentTrainingInfo={setCurrentUserTrainingInfo}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditTraining;
