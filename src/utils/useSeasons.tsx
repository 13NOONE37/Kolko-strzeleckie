import { useEffect, useState } from 'react';
import axios from 'axios';

const useSeasons = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSeasons = async () => {
      const dateObject = new Date();
      const date = `${dateObject.getFullYear()}-${
        dateObject.getMonth() + 1
      }-${dateObject.getDate()}`;
      setLoading(true);
      try {
        const { data: response } = await axios.post(
          import.meta.env.VITE_API,
          {
            action: 'gettrainings',
            start_date: '1970-01-01',
            end_date: '2024-11-11',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        const years: any[] = [];
        response = response
          .sort(
            (a: object, b: object) =>
              new Date(a.data_treningu) - new Date(b.data_treningu),
          )
          .forEach((item) => {
            const date = new Date(item.data_treningu);
            console.log(date);
          });

        setData(years);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getSeasons();
  }, []);

  return {
    data,
    loading,
  };
};

export default useSeasons;
