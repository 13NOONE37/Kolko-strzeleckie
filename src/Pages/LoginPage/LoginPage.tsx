import React, { FC } from 'react';
import styles from './LoginPage.module.css';
import { ReactComponent as Logo } from 'assets/Logo.svg';

const LoginPage: FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles['logo--container']}>
        <Logo />
      </section>
      <section className={styles['login--container']}>
        <h1>Zaloguj się</h1>
        <form>
          <input type="text" />
          <input type="password" />
          <input type="submit" />
        </form>
      </section>
    </main>
  );
};
export default LoginPage;
