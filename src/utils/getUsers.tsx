import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

interface UserType {
  id_uzytkownika: number | string;
  imie: string;
  nazwisko: string;
}

const getUsers = async () => {
  try {
    const { data: response } = await axios.post<UserType[]>(
      import.meta.env.VITE_API,
      {
        action: 'getuserslist',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.map((item, index) => {
      return {
        value: item.id_uzytkownika,
        label: `${item.nazwisko} ${item.imie}`,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export default getUsers;
