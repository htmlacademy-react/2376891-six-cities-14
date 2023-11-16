import dayjs from 'dayjs';

function humanizeDate(date: string) {
  return date ? dayjs(date).format('MMMM YYYY') : '';
}

export {humanizeDate};
