import Select, { SelectOption } from 'components/Select/Select';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './Ranking.module.css';
import getSeasons from 'utils/getSeasons';
import getTrainings from 'utils/getTrainings';
import getRanking from 'utils/getRanking';
import AppContext from 'store/AppContext';
import { ROLE } from 'Pages/roles';
import { useNavigate } from 'react-router';
import Loader from 'components/Loader/Loader';
export interface UserType {
  id: string | number;
  firstName: string;
  secondName: string;
  points: number;
  tens: number;
}
interface RankingPlaceType extends UserType {
  season: SelectOption | undefined;
  index: number;
  multiplyValues: number;
}
const RankingPlace: FC<RankingPlaceType> = ({
  id,
  season,
  firstName,
  secondName,
  points,
  tens,
  index,
  multiplyValues,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const handleRedirect = () => {
    if (user?.role === ROLE.Admin) {
      navigate(
        `/admin/results/${id}/${String(season?.label.replaceAll('/', '-'))}`,
      );
    }
  };

  return (
    <div className={styles.record} tabIndex={0} onClick={handleRedirect}>
      <span className={styles.place}>{index + 1}</span>
      <span className={styles.name}>
        <span className={styles.secondName}>{secondName}</span>{' '}
        <span className={styles.firstName}>{firstName}</span>
      </span>
      <span className={styles.points}>
        {parseFloat(points.toFixed(2))}
        <span className={styles.maxscore}>/100</span>
      </span>
      <span className={styles.tens}>
        {parseFloat(tens.toFixed(2))}
        <span className={styles.maxscore}>/10 </span>
      </span>
    </div>
  );
};

const Ranking: FC = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
    undefined,
  );
  const [currentTraining, setCurrentTraining] = useState<
    SelectOption | undefined
  >(undefined);
  const [currentDate, setCurrentDate] = useState<SelectOption | null>(null);
  const [seasons, setSeasons] = useState<SelectOption[] | undefined>(undefined);
  const [trainings, setTrainings] = useState<SelectOption[] | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<UserType[] | undefined>(undefined);

  const changeSeason = (season: SelectOption | null) => {
    if (!season) return;
    setCurrentSeason(season);
  };
  const changeTrainings = (training: SelectOption | null) => {
    if (!training) return;

    setCurrentDate(null);

    setCurrentTraining(training);
  };
  const changeDate = (date: SelectOption | null) => {
    if (!date) return;
    if (trainings) {
      setCurrentTraining(trainings[0]);
    }
    setCurrentDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeasons();

      setSeasons(data);
      if (data) {
        if (data.length === 0) {
          setTrainings([]);
          setUsers([]);

          return;
        }
        setCurrentSeason(data[0]);
        setCurrentTraining(undefined);
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
      if (data) {
        setCurrentTraining(data[0]);
        setCurrentDate(null);
      }
    };
    if (currentSeason) {
      fetchData();
    }
  }, [currentSeason]);

  useEffect(() => {
    const fetchData = async () => {
      const date1 = String(String(currentTraining?.value).split(';')[0]);
      const date2 = `${String(currentSeason?.value).split('/')[1]}-09-01`;

      if (currentDate === null) {
        const data = await getRanking(date1, date2);
        if (data) {
          setUsers(data);
        }
      } else {
        const date3 = String(String(currentDate?.value).split(';')[0]);
        const data = await getRanking(date3, date3);
        if (data) {
          setUsers(data);
        }
      }
    };
    if (currentTraining || currentDate) {
      fetchData();
    }
  }, [currentTraining, currentSeason, currentDate]);

  useEffect(() => {
    if (seasons && trainings && users) {
      setLoading(false);
    }
  }, [seasons, trainings, users]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`${styles.container} ${
            user?.role === ROLE.Admin ? styles.adminRender : ''
          }`}
        >
          <div className={styles.heading}>
            <span className={styles.element}>
              <h2>Najlepsi w sezonie: </h2>

              <Select
                placeholder="Sezon"
                defaultValue={currentSeason}
                options={seasons}
                changeCallback={changeSeason}
                isSearchable={true}
              />
            </span>
            <span className={styles.element}>
              <h2>Liczba treningów:</h2>

              <Select
                placeholder="Liczba treningów"
                defaultValue={currentTraining}
                options={trainings}
                changeCallback={changeTrainings}
                isSearchable={true}
              />
            </span>
            <span className={styles.element}>
              <h2>Konkretny trening:</h2>

              <Select
                placeholder="Konkretny trening"
                defaultValue={currentDate}
                options={trainings?.map((item) => {
                  const trainingDate = String(item.value).split(';')[0];
                  return { label: trainingDate, value: item.value };
                })}
                changeCallback={changeDate}
                isSearchable={true}
              />
            </span>
          </div>

          <div className={styles.names}>
            <span>Uczeń</span>
            <span>Śr. punktów</span>
            <span>Śr. dziesiątek</span>
          </div>

          <div className={styles.ranking}>
            {users?.map((user: UserType, index: number) => (
              <RankingPlace
                {...user}
                multiplyValues={Number(currentTraining?.label)}
                index={index}
                season={currentSeason}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Ranking;
