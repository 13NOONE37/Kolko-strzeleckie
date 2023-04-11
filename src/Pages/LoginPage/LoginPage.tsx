import React, { FC, useContext, useState } from 'react';
import styles from './LoginPage.module.css';
import Logo from 'assets/Logo.png';
import { Formik } from 'formik';
import axios from 'axios';
import AppContext from 'store/AppContext';
import { ROLE } from 'Pages/roles';

const LoginPage: FC = () => {
  const [globalError, setGlobalError] = useState<boolean | string>(false);
  const { setIsLogged, setUser } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles['logo--container']}>
          <img src={Logo} alt="Logo Szkolnej ligi strzeleckiej" />
          <h2>
            Witaj na stronie szkolnego
            <br /> koła strzeleckiego
          </h2>
        </section>
        <section className={styles['login--container']}>
          <h1>Zaloguj się</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors: { email?: string; password?: string } = {};
              if (!values.email) {
                errors.email = 'Pole jest wymagane';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Adres email nie jest poprawny';
              }
              if (!values.password) {
                errors.password = 'Pole jest wymagane';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(
                  import.meta.env.VITE_API,
                  {
                    action: 'auth',
                    email: values.email,
                    password: values.password,
                  },
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  },
                )
                .then((response: any) => {
                  if (response.data.code === '200') {
                    //logged
                    setIsLogged(true);
                    setUser({
                      role: response.data.czyAdmin ? ROLE.Admin : ROLE.User,
                      firstName: response.data.imie,
                      secondName: response.data.nazwisko,
                      email: response.data.email,
                      id: response.data.id_uzytkownika,
                    });
                  } else {
                    //not logged
                    setGlobalError('Błędny email lub hasło');
                  }
                  setSubmitting(false);
                })
                .catch((error: any) => {
                  console.log(error);
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className={styles.error}>
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className={styles.error}>
                  {errors.password && touched.password && errors.password}
                </span>
                <input
                  type="submit"
                  disabled={isSubmitting}
                  value={isSubmitting ? '...' : 'Zaloguj się'}
                />
                <span className={styles.error}>
                  {globalError && globalError}
                </span>
              </form>
            )}
          </Formik>
        </section>
      </main>
    </div>
  );
};
export default LoginPage;
