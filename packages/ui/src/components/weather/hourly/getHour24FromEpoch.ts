export const getHour24FromEpoch = (epochTime: number, timezone: string) => {
	const date = new Date(epochTime * 1000);
	return parseInt(
		new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			hour12: false,
			timeZone: timezone,
		}).format(date),
		10
	);
};
