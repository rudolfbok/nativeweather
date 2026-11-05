// Forecast dates are plain "YYYY-MM-DD" strings, which `new Date()` parses as UTC midnight.
// Formatting in UTC keeps the weekday from shifting back a day for users west of Greenwich.
const toDate = (date: string) => new Date(`${date}T00:00:00Z`);

export const formatWeekday = (date: string, language: string, length: 'short' | 'long' = 'short') =>
	toDate(date).toLocaleDateString(language, { weekday: length, timeZone: 'UTC' });

export const formatLongDate = (date: string, language: string) =>
	toDate(date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
