import Select, { SelectOption } from 'components/Select/Select';
import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import styles from './Ranking.module.css';
import getSeasons from 'utils/getSeasons';
import getTrainings from 'utils/getTrainings';
import getRanking from 'utils/getRanking';
export interface UserType {
  id: string | number;
  firstName: string;
  secondName: string;
  points: number;
  tens: number;
}
interface RankingPlaceType extends UserType {
  index: number;
  multiplyValues: number;
}
const RankingPlace: FC<RankingPlaceType> = ({
  id,
  firstName,
  secondName,
  points,
  tens,
  index,
  multiplyValues,
}) => {
  return (
    //todo onclick redirect('/user/results/?user=adffadsf;season=asdf)
    <div className={styles.record} tabIndex={0}>
      <span className={styles.place}>{index + 1}</span>
      <span className={styles.name}>
        <span className={styles.secondName}>{secondName}</span>{' '}
        <span className={styles.firstName}>{firstName}</span>
      </span>
      <span className={styles.points}>
        {points}
        <span className={styles.maxscore}>/{100 * multiplyValues}</span>
      </span>
      <span className={styles.tens}>
        {tens}
        <span className={styles.maxscore}>/{10 * multiplyValues}</span>
      </span>
    </div>
  );
};

const Ranking: FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
    undefined,
  );
  const [currentTraining, setCurrentTraining] = useState<
    SelectOption | undefined
  >(undefined);
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

    setCurrentTraining(training);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeasons();
      setSeasons(data);
      if (data) {
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
        //todo nie updatejtuje sie
        setCurrentTraining(data[0]);
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

      const data = await getRanking(date1, date2);
      if (data) {
        setUsers(data);
      }
    };
    if (currentTraining) {
      fetchData();
    }
  }, [currentTraining, currentSeason]);

  useEffect(() => {
    if (seasons && trainings && users) {
      setLoading(false);
    }
  }, [seasons, trainings, users]);

  return (
    <>
      {loading ? (
        '...'
      ) : (
        <div className={styles.container}>
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
          </div>

          <div className={styles.names}>
            <span>Uczeń</span>
            <span>Punkty</span>
            <span>Dziesiątki</span>
          </div>

          <div className={styles.ranking}>
            {users?.map((user: UserType, index: number) => (
              <RankingPlace
                {...user}
                multiplyValues={Number(currentTraining?.label)}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Ranking;
