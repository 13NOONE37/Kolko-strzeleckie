import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import { FC, useEffect, useState } from 'react';
import styles from './EditTraining.module.css';
import getUsers from 'utils/getUsers';
import getUserTrainingInfo from 'utils/getUserTrainingInfo';
import updateTraining from 'utils/updateTraining';

interface EditFieldsType {
  training_id: string;
  user_id: string;
  points: number | undefined;
  tens: number | undefined;
  note: string | undefined;
}
const EditFields: FC<EditFieldsType> = ({
  training_id,
  user_id,
  points,
  tens,
  note,
}) => {
  const [pointsLocal, setPoints] = useState(points);
  const [tensLocal, setTens] = useState(tens);
  const [noteLocal, setNote] = useState(note);
  const handleSaveData = async () => {
    if (
      pointsLocal === undefined ||
      tensLocal === undefined ||
      noteLocal === undefined
    )
      return;
    console.log(training_id, user_id, noteLocal);
    const result = await updateTraining(
      training_id,
      user_id,
      pointsLocal,
      tensLocal,
      noteLocal,
    );
    console.log(result);
  };
  return (
    <>
      <input
        type="number"
        placeholder="Punkty"
        value={pointsLocal}
        onChange={(e) =>
          setPoints(Math.max(0, Math.min(100, e.target.valueAsNumber)))
        }
        className={`${styles.input} ${styles.points}`}
      />
      <input
        type="number"
        placeholder="Dziesiątki"
        value={tensLocal}
        onChange={(e) =>
          setTens(Math.max(0, Math.min(10, e.target.valueAsNumber)))
        }
        className={`${styles.input} ${styles.tens}`}
      />
      <textarea
        className={`${styles.input} ${styles.note}`}
        placeholder="Uwagi"
        value={noteLocal}
        onChange={(e) => setNote(e.target.value)}
      />
      <HeaderCTA text="Zapisz" callback={handleSaveData} />
    </>
  );
};

interface TrainingType {
  training_id: string | number;
  setTrainingEditing: (a: null) => void;
}
interface EditTrainingType {
  training_id: string;
  user_id: string;
  points: number;
  tens: number;
  note: string | undefined;
}
const EditTraining: FC<TrainingType> = ({
  training_id,
  setTrainingEditing,
}) => {
  const [loading, setLoading] = useState(true);

  const [trainingInfo, setTrainingInfo] = useState<
    EditTrainingType[] | undefined
  >(undefined);
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
    if (typeof index === 'number' && trainingInfo) {
      setCurrentUserIndex(index);
      console.log(trainingInfo[index]);
      setCurrentUserTrainingInfo(trainingInfo[index]);
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
      const data = await getUserTrainingInfo(training_id);
      if (data) {
        setTrainingInfo(data as any);
        setCurrentUserTrainingInfo(data[0] as any);
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
            <span className={styles.cancel}>
              <HeaderCTA
                text="Wyjdź"
                callback={() => {
                  if (
                    window.confirm('Czy chcesz anulować edytowanie treningu?')
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
            <EditFields
              training_id={String(training_id)}
              user_id={String(currentUser?.value)}
              points={currentUserTrainingInfo?.points}
              tens={currentUserTrainingInfo?.tens}
              note={currentUserTrainingInfo?.note}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditTraining;
