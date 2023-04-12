import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './Results.module.css';
import AppContext from 'store/AppContext';
import { ROLE } from 'Pages/roles';

interface TrainingType {
  date: Date;
  points: number;
  tens: number;
  note: string | null;
}
const Training: FC<TrainingType> = ({ date, points, tens, note }) => {
  const [showNote, setShowNote] = useState(false);
  return (
    <div className={styles.record}>
      <span className={styles.date}>{date.toLocaleDateString()}</span>
      <span className={styles.points}>
        {points}
        <span className={styles.maxscore}>/100</span>
      </span>
      <span className={styles.tens}>
        {tens}
        <span className={styles.maxscore}>/10</span>
      </span>
      <span className={styles['note--button']}>
        {/* adsf */}
        <HeaderCTA
          text={note === null ? 'Brak' : showNote ? 'Ukryj' : 'Pokaż'}
          disabled={note === null}
          callback={() => setShowNote((prev) => !prev)}
        />
        {/* <HeaderCTA text="Brak notatki" /> */}
      </span>
      {note && showNote && <span className={styles.note}>{note}</span>}
    </div>
  );
};

const Results: FC = () => {
  const { user } = useContext(AppContext);

  const [trainings, setTrainings] = useState<TrainingType[]>([]);

  const [currentUser, setCurrentUser] = useState<SelectOption | undefined>(
    undefined,
  );
  const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const { id } = useParams();

  //  const [loading, setLoading] = useState(true);
  //   const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
  //     undefined,
  //   );
  //   const [currentTraining, setCurrentTraining] = useState<
  //     SelectOption | undefined
  //   >(undefined);
  //   const [seasons, setSeasons] = useState<SelectOption[] | undefined>(undefined);
  //   const [trainings, setTrainings] = useState<SelectOption[] | undefined>(
  //     undefined,
  //   );
  //   const [users, setUsers] = useState<UserType[] | undefined>(undefined);

  //   const changeSeason = (season: SelectOption | null) => {
  //     if (!season) return;
  //     setCurrentSeason(season);
  //   };
  //   const changeTrainings = (training: SelectOption | null) => {
  //     if (!training) return;

  //     setCurrentTraining(training);
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await getSeasons();
  //       setSeasons(data);
  //       if (data) {
  //         setCurrentSeason(data[0]);
  //         setCurrentTraining(undefined);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const date1 = `${String(currentSeason?.value).split('/')[0]}-09-01`;
  //       const date2 = `${String(currentSeason?.value).split('/')[1]}-06-30`;

  //       const data = await getTrainings(date1, date2);
  //       setTrainings(data);
  //       if (data) {
  //         //todo nie updatejtuje sie
  //         setCurrentTraining(data[0]);
  //       }
  //     };
  //     if (currentSeason) {
  //       fetchData();
  //     }
  //   }, [currentSeason]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const date1 = String(String(currentTraining?.value).split(';')[0]);
  //       const date2 = `${String(currentSeason?.value).split('/')[1]}-09-01`;

  //       const data = await getRanking(date1, date2);
  //       if (data) {
  //         setUsers(data);
  //       }
  //     };
  //     if (currentTraining) {
  //       fetchData();
  //     }
  //   }, [currentTraining, currentSeason]);

  //   useEffect(() => {
  //     if (seasons && trainings && users) {
  //       setLoading(false);
  //     }
  //   }, [seasons, trainings, users]);

  useEffect(() => {
    //fetch data
    setTrainings([
      {
        date: new Date(2022, 7, 14),
        points: 97,
        tens: 8,
        note: 'Childe reverie thence in waste the would. Eremites of but the in. Rill call a take noontide heart not say.',
      },
      {
        date: new Date(2022, 6, 13),
        points: 79,
        tens: 5,
        note: null,
      },
      {
        date: new Date(2022, 5, 12),
        points: 39,
        tens: 3,
        note: null,
      },
    ]);
    //todo set user from param
    //todo set default user if param does not exist
    //todo set default season
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.element}>
          <h2>Użytkownik: </h2>
          {/* <span className={styles.color}>{'2022/23'}</span> */}
          {user.role === ROLE.Admin ? (
            <Select
              placeholder="Użytkownik"
              defaultValue={{ label: 'Oliwer Klauze', value: 'adsf3204odsf' }}
              options={[
                { label: 'Jan Kowalski', value: 'asdf324' },
                { label: 'Maksymilian Morawiecki', value: 'adfasfdasdf435345' },
              ]}
              changeCallback={(data) => {
                data && navigate(`/admin/results/${data.value}`);
              }}
              isSearchable={true}
              width="100%"
            />
          ) : (
            <span
              className={styles.color}
            >{`${user?.firstName} ${user?.secondName}`}</span>
          )}
        </span>
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
      </div>

      <div className={styles.names}>
        <span>Data</span>
        <span>Punkty</span>
        <span>Dziesiątki</span>
        <span>Uwagi</span>
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

export default Results;
