import React from 'react';
import axios from 'axios';
import { UserType } from 'store/AppContext';

const getRanking = async (start_date: string, end_date: string) => {
  try {
    //todo zastąpić any
    const { data: response } = await axios.post<any[] | undefined>(
      import.meta.env.VITE_API,
      {
        action: 'getranking',
        start_date: start_date,
        end_date: end_date,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response);
    if (response?.code === '204') {
      return [];
    } else {
      return response?.map((item) => {
        return {
          id: item.id_uzytkownika,
          firstName: item.imie,
          secondName: item.nazwisko,
          points: item.SumOfpunkty,
          tens: item.SumOfdziesiatki,
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default getRanking;
