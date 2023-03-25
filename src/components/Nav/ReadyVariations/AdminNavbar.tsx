import React, { FC } from 'react';
import { Navbar } from '../Navbar';

import { ReactComponent as Ranking } from 'assets/leaderboard.svg';
import { ReactComponent as Target } from 'assets/target.svg';
import { ReactComponent as Sport } from 'assets/sport.svg';
import { ReactComponent as Add } from 'assets/add.svg';
import { useNavigate } from 'react-router';

const AdminNavbar: FC = () => {
  const navigate = useNavigate();
  return (
    <Navbar
      elements={[
        {
          name: 'Ranking',
          Icon: Ranking,
          callback: () => navigate('/admin/ranking'),
        },
        {
          name: 'Wyniki',
          Icon: Target,
          callback: () => navigate('/admin/results'),
        },
        {
          name: 'Treningi',
          Icon: Sport,
          callback: () => navigate('/admin/training'),
        },
      ]}
    />
  );
};

export default AdminNavbar;
