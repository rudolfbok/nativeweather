// Forecast dates are plain "YYYY-MM-DD" strings, which `new Date()` parses as UTC midnight.
// Formatting in UTC keeps the weekday from shifting back a day for users west of Greenwich.
const toDate = (date: string) => new Date(`${date}T00:00:00Z`);

export const formatWeekday = (date: string, language: string, length: 'short' | 'long' = 'short') =>
	toDate(date).toLocaleDateString(language, { weekday: length, timeZone: 'UTC' });

// French, Italian and Chinese write the weekday and the date without a comma.
const spaceSeparated = ['fr', 'it', 'zh'];

/** "Wednesday, November 12": the weekday and the day, without the year. */
export const formatDayTitle = (date: string, language: string) => {
	const day = toDate(date).toLocaleDateString(language, { day: 'numeric', month: 'long', timeZone: 'UTC' });

	return `${formatWeekday(date, language, 'long')}${spaceSeparated.includes(language.slice(0, 2)) ? ' ' : ', '}${day}`;
};
