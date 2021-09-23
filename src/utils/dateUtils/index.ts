import i18next from 'i18next';

export const formatDate = (timestamp: string): string => {
  const parsedDate = new Date(Date.parse(timestamp));

  const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][parsedDate.getDay()];
  const returnWeekday = i18next.t(`Dates:${weekday}`);
  const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][
    parsedDate.getMonth()
  ];
  const returnMonth = i18next.t(`Dates:${month}`);
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const year = parsedDate.getUTCFullYear().toString();

  const isValidString = parsedDate.toString() !== 'Invalid Date';

  return isValidString ? `${returnWeekday} ${returnMonth} ${day} ${year}` : '';
};
