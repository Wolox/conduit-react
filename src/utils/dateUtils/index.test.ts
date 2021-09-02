import { formatDate } from '.';

describe('formatDate', () => {
  it('Works properly when timestamp is valid date', () => {
    expect(formatDate('25 December 1987')).toBe('Dates:fri Dates:dec 25 1987');
    expect(formatDate('09 September 1999')).toBe('Dates:thu Dates:sep 09 1999');
    expect(formatDate('February 06, 2016')).toBe('Dates:sat Dates:feb 06 2016');
    expect(formatDate('May 06, 2019')).toBe('Dates:mon Dates:may 06 2019');
    expect(formatDate('04/05/2020')).toBe('Dates:sun Dates:apr 05 2020');
    expect(formatDate('3/7/2003, 4:21:38 AM')).toBe('Dates:fri Dates:mar 07 2003');
    expect(formatDate('2021-08-31T19:23:41.178Z')).toBe('Dates:tue Dates:aug 31 2021');
    expect(formatDate('2021-09-01T13:21:08.916Z')).toBe('Dates:wed Dates:sep 01 2021');
  });
  it('Does not work when timestamp is NOT valid date', () => {
    expect(formatDate('16/03/2006')).toBe('');
    expect(formatDate('31/12/2020')).toBe('');
    expect(formatDate('January 1st, 2017')).toBe('');
    expect(formatDate('February 14th, 2020')).toBe('');
    expect(formatDate('Not a valid timestamp')).toBe('');
    expect(formatDate('More gibberish')).toBe('');
  });
});
