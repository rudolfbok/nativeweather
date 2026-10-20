import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

interface SunEventCountdownProps {
	data: string;
	tomorrowData?: string;
	timeZone: string;
}

export const useSunEventCountdown = ({ data, tomorrowData, timeZone }: SunEventCountdownProps) => {
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 60_000);
		return () => clearInterval(interval);
	}, []);

	const currentTime = DateTime.fromMillis(now, { zone: timeZone || 'UTC' });
	const eventTime = DateTime.fromFormat(data, 'h:mm a', { zone: timeZone || 'UTC' }).set({
		year: currentTime.year,
		month: currentTime.month,
		day: currentTime.day,
	});
	if (!currentTime.isValid || !eventTime.isValid) return null;

	let nextEventMillis = eventTime.toMillis();
	if (eventTime.toMillis() <= currentTime.toMillis()) {
		const nextDayTime = DateTime.fromFormat(tomorrowData ?? data, 'h:mm a', { zone: timeZone || 'UTC' });
		const nextDay = currentTime.plus({ days: 1 });
		const nextEvent = nextDayTime.set({
			year: nextDay.year,
			month: nextDay.month,
			day: nextDay.day,
		});
		if (!nextEvent.isValid) return null;
		nextEventMillis = nextEvent.toMillis();
	}

	const minutesRemaining = Math.ceil((nextEventMillis - currentTime.toMillis()) / 60_000);
	const hours = Math.floor(minutesRemaining / 60);
	const minutes = minutesRemaining % 60;

	return {
		time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
	};
};
