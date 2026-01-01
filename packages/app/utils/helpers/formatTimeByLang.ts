export function formatTimeByLang(timeStr: string, lang = 'en') {
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

	// const isCzech = lang.startsWith('cs');

	return new Intl.DateTimeFormat(lang, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: lang === 'en' ? true : false,
	}).format(date);
}
