import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

type TrainingData = {
  id: number | string;
  punkty: number;
  dziesiatki: number;
  uwagi: string;
};

const getUserTrainingInfo = async (training_id: string, user_id: string) => {
  try {
    const { data: response } = await axios.post<TrainingData[]>(
      import.meta.env.VITE_API,
      {
        action: 'gettraininginfo',
        training_id: training_id,
        user_id: user_id,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const tempResponse: any = response; //!bad solution
    if (tempResponse.code === '204') {
      return {
        id: `${user_id}-${training_id}`,
        points: undefined,
        tens: undefined,
        note: undefined,
      };
    } else {
      return {
        id: `${user_id}-${training_id}`,
        points: response[0].punkty,
        tens: response[0].dziesiatki,
        note: response[0].uwagi,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export default getUserTrainingInfo;
