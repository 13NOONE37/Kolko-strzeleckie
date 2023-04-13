import axios from 'axios';

const deleteTraining = async (training_id: string) => {
  try {
    const { data: response } = await axios.post(
      import.meta.env.VITE_API,
      {
        action: 'deletetraining',
        training_id: training_id,
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

export default deleteTraining;
