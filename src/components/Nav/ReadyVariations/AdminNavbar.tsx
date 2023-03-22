import React, { FC } from 'react';
import { Navbar } from '../Navbar';

import { ReactComponent as Ranking } from 'assets/leaderboard.svg';
import { ReactComponent as Target } from 'assets/target.svg';
import { ReactComponent as Sport } from 'assets/sport.svg';
import { ReactComponent as Add } from 'assets/add.svg';

const AdminNavbar: FC = () => {
  return (
    <Navbar
      elements={[
        { name: 'Ranking', Icon: Ranking },
        { name: 'Wyniki', Icon: Target },
        { name: 'Treningi', Icon: Sport },
      ]}
    />
  );
};

export default AdminNavbar;
