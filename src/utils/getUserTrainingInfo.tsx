import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

type TrainingData = {
  data_treningu: string;
  punkty: number;
  dziesiatki: number;
  uwagi: string;
};

const getUserTrainingInfo = async (training_id: string | number) => {
  try {
    const { data: response } = await axios.post<TrainingData[]>(
      import.meta.env.VITE_API,
      {
        action: 'gettraininginfo',
        training_id: training_id,
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

export default getUserTrainingInfo;
