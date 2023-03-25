import React, { FC } from 'react';
import { Navbar } from '../Navbar';

import { ReactComponent as Ranking } from 'assets/leaderboard.svg';
import { ReactComponent as Target } from 'assets/target.svg';
import { useNavigate } from 'react-router';

const UserNavbar: FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar
      elements={[
        {
          name: 'Ranking',
          Icon: Ranking,
          callback: () => navigate('/user/ranking'),
        },
        {
          name: 'Twoje wyniki',
          Icon: Target,
          callback: () => navigate('/user/results'),
        },
      ]}
    />
  );
};

export default UserNavbar;
