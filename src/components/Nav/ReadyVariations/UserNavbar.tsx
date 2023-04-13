import React, { FC } from 'react';
import { Navbar } from '../Navbar';

import { ReactComponent as Ranking } from 'assets/leaderboard.svg';
import { ReactComponent as Target } from 'assets/target.svg';
import { useLocation, useNavigate } from 'react-router';

const UserNavbar: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Navbar
      elements={[
        {
          name: 'Ranking',
          Icon: Ranking,
          callback: () => navigate('/user/ranking'),
          active: pathname.toLowerCase() === '/user/ranking',
        },
        {
          name: 'Twoje wyniki',
          Icon: Target,
          callback: () => navigate('/user/results'),
          active: pathname.toLowerCase() === '/user/results',
        },
      ]}
    />
  );
};

export default UserNavbar;
