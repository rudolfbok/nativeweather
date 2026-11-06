export const formatTime = (timeStr: string, lang = 'en-US'): string => {
	const timeFormat = /^\d{1,2}:\d{2}\s?(AM|PM)$/i;
	if (!timeFormat.test(timeStr)) {
		return 'No data';
	}

	const [time, modifier] = timeStr.split(' ');
	let [hours, minutes] = time.split(':').map(Number);

	if (modifier === 'PM' && hours !== 12) hours += 12;
	if (modifier === 'AM' && hours === 12) hours = 0;

	const date = new Date();
	date.setHours(hours, minutes, 0);

	return new Intl.DateTimeFormat(lang, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: lang === 'en-US',
	}).format(date);
};

/** The current time at a location, e.g. "03:05 PM" in en-US and "15:05" elsewhere. */
export const formatLocalTime = (timeZone: string, language: string) =>
	new Date().toLocaleTimeString(language, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: language === 'en-US',
		timeZone,
	});
