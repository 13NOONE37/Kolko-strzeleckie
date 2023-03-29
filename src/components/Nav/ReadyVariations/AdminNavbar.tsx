import React, { FC } from 'react';
import { Navbar } from '../Navbar';

import { ReactComponent as Ranking } from 'assets/leaderboard.svg';
import { ReactComponent as Target } from 'assets/target.svg';
import { ReactComponent as Sport } from 'assets/sport.svg';
import { ReactComponent as Add } from 'assets/add.svg';
import { useLocation, useNavigate } from 'react-router';

const AdminNavbar: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <Navbar
      elements={[
        {
          name: 'Ranking',
          Icon: Ranking,
          callback: () => navigate('/admin/ranking'),
          active: pathname === '/admin/ranking',
        },
        {
          name: 'Wyniki',
          Icon: Target,
          callback: () => navigate('/admin/results'),
          active: pathname === '/admin/results',
        },
        {
          name: 'Treningi',
          Icon: Sport,
          callback: () => navigate('/admin/training'),
          active: pathname === '/admin/training',
        },
      ]}
    />
  );
};

export default AdminNavbar;
