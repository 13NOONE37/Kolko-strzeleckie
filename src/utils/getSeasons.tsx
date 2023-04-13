import axios from 'axios';
import { SelectOption } from 'components/Select/Select';

type TrainingData = {
  data_treningu: string;
  id_treningu: number;
};

const getSeasons = async () => {
  const dateObject = new Date();
  const date = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`;

  try {
    const { data: response } = await axios.post<TrainingData[]>(
      import.meta.env.VITE_API,
      {
        action: 'gettrainings',
        start_date: '1970-01-01',
        end_date: date,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const years: number[] = [];
    const ranges: SelectOption[] = [];
    const data = response.sort(
      (a, b) => +new Date(a.data_treningu) - +new Date(b.data_treningu),
    );

    if (new Date(data[0].data_treningu).getMonth() + 1 <= 6) {
      years.push(new Date(data[0].data_treningu).getFullYear() - 1);
    } else {
      years.push(new Date(data[0].data_treningu).getFullYear());
    }
    if (new Date(data[data.length - 1].data_treningu).getMonth() + 1 >= 9) {
      years.push(
        new Date(data[data.length - 1].data_treningu).getFullYear() + 1,
      );
    } else {
      years.push(new Date(data[data.length - 1].data_treningu).getFullYear());
    }
    for (years[0]; years[0] < years[1]; years[0]++) {
      ranges.push({
        label: `${years[0]}/${years[0] + 1}`,
        value: `${years[0]}/${years[0] + 1}`,
      });
    }
    ranges.reverse();
    return ranges;
  } catch (error) {
    console.error(error);
  }
};

export default getSeasons;
