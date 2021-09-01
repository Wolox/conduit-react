import i18next from 'i18next';

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()];
  const returnWeekday = i18next.t(`Dates:${weekday}`);
  const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][
    date.getMonth()
  ];
  const returnMonth = i18next.t(`Dates:${month}`);
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();

  return `${returnWeekday} ${returnMonth} ${day} ${year}`;
};
