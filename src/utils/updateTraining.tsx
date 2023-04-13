import axios from 'axios';

const updateTraining = async (
  training_id: string,
  user_id: string,
  points: number,
  tens: number,
  note: string | undefined,
) => {
  try {
    const { data: response } = await axios.post(
      import.meta.env.VITE_API,
      {
        action: 'updateresult',
        training_id: training_id,
        user_id: user_id,
        points: points,
        tens: tens,
        note: note,
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

export default updateTraining;
