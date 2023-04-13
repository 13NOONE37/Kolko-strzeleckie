import axios from 'axios';

type TrainingData = {
  data_treningu: string;
  punkty: number;
  dziesiatki: number;
  uwagi: string;
};

const getUserTrainings = async (
  user_id: string | number,
  start_date: string,
  end_date: string,
) => {
  try {
    const { data: response } = await axios.post<TrainingData[]>(
      import.meta.env.VITE_API,
      {
        action: 'getusertrainings',
        user_id: user_id,
        start_date: start_date,
        end_date: end_date,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const tempResponse: any = response; //!bad solution

    if (tempResponse.code === '204') {
      return [];
    } else {
      return response.map((item, index) => {
        return {
          date: new Date(item.data_treningu),
          points: item.punkty,
          tens: item.dziesiatki,
          note: item.uwagi,
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default getUserTrainings;
