import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

const createTraining = async (date: string) => {
  try {
    const { data: response } = await axios.post(
      import.meta.env.VITE_API,
      {
        action: 'createtraining',
        date: date,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default createTraining;
