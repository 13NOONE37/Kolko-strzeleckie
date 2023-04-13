import axios from 'axios';

type TrainingData = {
  data_treningu: string;
  id_treningu: number;
};

const getTrainings = async (start_date: string, end_date: string) => {
  try {
    const { data: response } = await axios.post<TrainingData[]>(
      import.meta.env.VITE_API,
      {
        action: 'gettrainings',
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
        label: String(index + 1),
        value: `${item.data_treningu};${item.id_treningu}`,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export default getTrainings;
