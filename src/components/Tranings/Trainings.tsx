import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import React, { FC, useEffect, useState } from 'react';
import styles from './Trainings.module.css';
import getSeasons from 'utils/getSeasons';
import getTrainings from 'utils/getTrainings';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import createTraining from 'utils/createTraining';
import deleteTraining from 'utils/deleteTraining';
import EditTraining from 'components/EditTraining/EditTraining';
import Loader from 'components/Loader/Loader';
registerLocale('pl', pl);

interface TrainingType {
  id: String | Number;
  date: Date;
  setCreatingInfo: (a: string | null) => void;
  setTrainingEditing: (a: string) => void;
}
const Training: FC<TrainingType> = ({
  id,
  date,
  setCreatingInfo,
  setTrainingEditing,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setCreatingInfo(null);

    setIsDeleting(true);
    if (
      window.confirm(
        'Czy na pewno chcesz usunąć trening? To działanie jest nieodwracalne.',
      )
    ) {
      await deleteTraining(String(id));
      setCreatingInfo('Trening usunięty pomyślnie');
      setTimeout(() => {
        setCreatingInfo(null);
      }, 3000);
    }
    setIsDeleting(false);
  };
  return (
    <div className={styles.record}>
      <span className={styles.date}>{date.toLocaleDateString()}</span>

      <HeaderCTA
        text="Edytuj"
        callback={() => setTrainingEditing(String(id))}
      />
      <HeaderCTA text={isDeleting ? '...' : 'Usuń'} callback={handleDelete} />
    </div>
  );
};

const Trainings: FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
    undefined,
  );

  const [seasons, setSeasons] = useState<SelectOption[] | undefined>(undefined);
  const [trainings, setTrainings] = useState<SelectOption[] | undefined>(
    undefined,
  );
  const [date, setDate] = useState(new Date());

  const [isTrainingCreating, setisTrainingCreating] = useState(false);
  const [creatingInfo, setCreatingInfo] = useState<string | null>(null);
  const [creatingError, setCreatingError] = useState<string | null>(null);
  const handleCreateTraining = async () => {
    setisTrainingCreating(true);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateLocal = `${year}-${month}-${day}`;

    const data = await createTraining(dateLocal);
    if (data.code === '200') {
      //trening utworzony pomyślnie
      setCreatingInfo('Utworzono pomyślnie');
    } else {
      //coś poszło nie tak
      setCreatingError('Coś poszło nie tak');
    }
    setTimeout(() => {
      setCreatingInfo(null);
      setCreatingError(null);
    }, 3000);
    setisTrainingCreating(false);
  };
  const changeSeason = (season: SelectOption | null) => {
    if (!season) return;
    setCurrentSeason(season);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeasons();
      setSeasons(data);
      if (data) {
        if (data.length === 0) {
          setTrainings([]);

          return;
        }
        setCurrentSeason(data[0]);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const date1 = `${String(currentSeason?.value).split('/')[0]}-09-01`;
      const date2 = `${String(currentSeason?.value).split('/')[1]}-06-30`;

      const data = await getTrainings(date1, date2);

      setTrainings(data);
    };
    if (currentSeason) {
      fetchData();
    }
  }, [currentSeason, creatingInfo]);
  useEffect(() => {
    if (seasons && trainings) {
      setLoading(false);
    }
  }, [seasons, trainings]);

  const [trainingEditing, setTrainingEditing] = useState<string | null>(null);

  return (
    <>
      {loading ? (
        <Loader />
      ) : trainingEditing === null ? (
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.element}>
              <h2>Sezon: </h2>
              <Select
                placeholder="Sezon"
                defaultValue={currentSeason}
                options={seasons}
                changeCallback={changeSeason}
                isSearchable={true}
                width="100%"
              />
            </span>
            <span className={styles.element} style={{ marginTop: '1em' }}>
              <h2>Data treningu: </h2>
              <DatePicker
                selected={date}
                onChange={(date: Date) => {
                  setDate(date);
                }}
                locale="pl"
                className={styles.datepicker}
              />
            </span>
            <span className={`${styles.element} ${styles.cta}`}>
              <h2>Trening: </h2>
              <HeaderCTA
                text={isTrainingCreating ? '...' : 'Klinij by stworzyć'}
                disabled={isTrainingCreating}
                callback={handleCreateTraining}
              />
            </span>
            {creatingInfo !== null && (
              <span className={styles.info}>{creatingInfo}</span>
            )}
            {creatingError !== null && (
              <span className={styles.error}>{creatingError}</span>
            )}
          </div>

          <div className={styles.ranking}>
            {trainings?.map((training) => (
              <Training
                id={String(training.value).split(';')[1]}
                date={new Date(String(training.value).split(';')[0])}
                setCreatingInfo={setCreatingInfo}
                setTrainingEditing={setTrainingEditing}
              />
            ))}
          </div>
        </div>
      ) : (
        <EditTraining
          training_id={String(trainingEditing)}
          setTrainingEditing={setTrainingEditing}
        />
      )}
    </>
  );
};

export default Trainings;
