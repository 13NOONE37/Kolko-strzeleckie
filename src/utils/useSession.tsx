import { useEffect } from 'react';
import axios from 'axios';
import { ROLE } from 'Pages/roles';

const useSession = (
  setIsLogged: (a: any) => void,
  setUser: (a: any) => void,
) => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: response } = await axios.post(
          import.meta.env.VITE_API,
          { action: 'checksession' },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.code === '200') {
          //logged
          console.log('logged');

          setIsLogged(true);
          setUser({
            role: response.czyAdmin ? ROLE.Admin : ROLE.User,
            firstName: response.imie,
            secondName: response.nazwisko,
            email: response.email,
            id: response.id_uzytkownika,
          });
        } else {
          //not logged
          console.log('not logged');
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkSession();
  }, []);
};

export default useSession;
