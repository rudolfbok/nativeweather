import type { WeatherAlert } from '@nativeweather/types';

// Single newlines are hard wraps inside a paragraph; blank lines separate paragraphs.
const unwrap = (text: string) => text.trim().replace(/(?<!\n)\n(?!\n)/g, ' ');

// US alerts are bulleted ("* WHAT...", "* IMPACTS..."); only those two sections are worth showing.
const extractWhatAndImpacts = (text: string) => {
	const extract = (label: string) =>
		text.match(new RegExp(`\\* ${label}\\.\\.\\.([\\s\\S]*?)(?=\\s*\\* [A-Z /]+\\.\\.\\.|$)`))?.[1].trim();
	const sections = ['WHAT', 'IMPACTS'].map(extract).filter(Boolean).join('\n\n');

	return sections ? unwrap(sections) : text;
};

export const getAlertText = (alert: WeatherAlert, country = '') => {
	const description = alert.desc.trim();

	return {
		description:
			country === 'United States of America' ? extractWhatAndImpacts(description.replace(/\n/g, ' ')) : description,
		instructions: unwrap(alert.instruction),
	};
};

/** "03:00 PM - Friday, 6 November" in the location's time zone, or null when the alert has no valid expiry. */
export const formatAlertExpiry = (expires: string, language: string, timeZone = 'UTC') => {
	const date = new Date(expires);

	if (Number.isNaN(date.getTime())) return null;

	const time = date.toLocaleTimeString(language, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: language === 'en-US',
		timeZone,
	});
	const day = date.toLocaleDateString(language, { weekday: 'long', day: 'numeric', month: 'long', timeZone });

	return `${time} - ${day}`;
};
