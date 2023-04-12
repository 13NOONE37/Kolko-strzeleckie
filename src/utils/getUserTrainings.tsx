import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

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
    return response.map((item, index) => {
      return {
        date: item.data_treningu,
        points: item.punkty,
        tens: item.dziesiatki,
        note: item.uwagi,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export default getUserTrainings;
