// use-fetch-data.js
import { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from 'store/AppContext';

const useLogout = () => {
  const { setIsLogged, setUser } = useContext(AppContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.post(
        import.meta.env.VITE_API,
        { action: 'logout' },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setIsLogged(false);
      setUser(false);
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    logout,
  };
};

export default useLogout;
