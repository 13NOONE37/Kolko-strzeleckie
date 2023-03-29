import React, { FC, useContext, useState } from 'react';
import Header, {
  HeaderCTAProps,
  useProgressBarValues,
} from 'components/Header/Header';
import AdminNavbar from 'components/Nav/ReadyVariations/AdminNavbar';
import AppContext from 'store/AppContext';
import styles from './AdminContainer.module.css';

import { ReactComponent as Logout } from 'assets/logout.svg';
import { Outlet } from 'react-router';
import HeaderContext from 'store/HeaderContext';

const AdminContainer: FC = () => {
  const { user } = useContext(AppContext);
  const [isProgressBar, setIsProgressBar] = useState(false);
  const { steps, currentStep, nextStep, prevStep } = useProgressBarValues(4, 0);
  const [CTA, setCTA] = useState<HeaderCTAProps>({
    Icon: Logout,
    text: 'Wyloguj się',
  });
  const [text, setText] = useState(`${user?.firstName} ${user?.secondName}`);

  return (
    <HeaderContext.Provider
      value={{
        isProgressBar: isProgressBar,
        setIsProgressBar: setIsProgressBar,
        steps: steps,
        currentStep: currentStep,
        nextStep: nextStep,
        prevStep: prevStep,
        text: text,
        setText: setText,
        CTA: CTA,
        setCTA: setCTA,
      }}
    >
      <div className={styles.container}>
        <Header text={text} CTA={CTA} />
        <div className={styles.content}>
          <Outlet />
        </div>
        <AdminNavbar />
      </div>
    </HeaderContext.Provider>
  );
};
export default AdminContainer;
