import axios from 'axios';

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
