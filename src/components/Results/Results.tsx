import { HeaderCTA } from 'components/Header/Header';
import Select, { SelectOption } from 'components/Select/Select';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './Results.module.css';
import AppContext from 'store/AppContext';
import { ROLE } from 'Pages/roles';
import getUserTrainings from 'utils/getUserTrainings';
import getSeasons from 'utils/getSeasons';
import getUsers from 'utils/getUsers';
import Loader from 'components/Loader/Loader';

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
          text={
            note === null || note.trim().length === 0
              ? 'Brak'
              : showNote
              ? 'Ukryj'
              : 'Pokaż'
          }
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
  const navigate = useNavigate();
  const { id, season } = useParams();

  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const [seasons, setSeasons] = useState<SelectOption[] | undefined>(undefined);
  const [users, setUsers] = useState<SelectOption[] | undefined>(undefined);

  const [currentUser, setCurrentUser] = useState<SelectOption | undefined>(
    undefined,
  );
  const [currentSeason, setCurrentSeason] = useState<SelectOption | undefined>(
    undefined,
  );

  const changeUser = (user: SelectOption | null) => {
    if (!user) return;
    setCurrentUser(user);
  };
  const changeSeason = (season: SelectOption | null) => {
    if (!season) return;
    setCurrentSeason(season);
  };

  useEffect(() => {
    //fetch users
    const fetchData1 = async () => {
      const data = await getUsers();
      setUsers(data);
      if (data) {
        if (id) {
          setCurrentUser(data.find((user) => user.value === Number(id)));
        } else {
          setCurrentUser(data[0]);
        }
      }
    };
    if (user?.role === ROLE.Admin) {
      fetchData1();
    } else {
      setUsers([]);
    }

    //fetch seasons
    const fetchData2 = async () => {
      const data = await getSeasons();
      setSeasons(data);
      if (data) {
        if (season) {
          const temp = season.replaceAll('-', '/');
          setCurrentSeason({ label: temp, value: temp });
        } else {
          setCurrentSeason(data[0]);
        }
      }
    };
    fetchData2();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const date1 = `${String(currentSeason?.value).split('/')[0]}-09-01`;
      const date2 = `${String(currentSeason?.value).split('/')[1]}-06-30`;

      const id = user?.role === ROLE.Admin ? currentUser?.value : user?.id;

      const data = await getUserTrainings(id as string, date1, date2);
      if (data) {
        setTrainings(data);
      }
    };
    if (currentSeason && (currentUser || user)) {
      fetchData();
    }
  }, [currentUser, currentSeason]);

  useEffect(() => {
    if (seasons && trainings && users) {
      setLoading(false);
    }
  }, [seasons, trainings, users]);

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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.heading}>
            <span className={styles.element}>
              <h2>Użytkownik: </h2>
              {user?.role === ROLE.Admin ? (
                <Select
                  placeholder="Użytkownik"
                  defaultValue={currentUser}
                  options={users}
                  // changeCallback={(data) => {
                  //   data && navigate(`/admin/results/${data.value}`);
                  // }}
                  changeCallback={changeUser}
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
                defaultValue={currentSeason}
                options={seasons}
                changeCallback={changeSeason}
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
            {trainings.map((training, index) => (
              <Training {...training} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
