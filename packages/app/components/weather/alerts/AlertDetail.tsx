import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/ui/ContentRow';
import { useWeather } from 'app/hooks/useWeather';
import { clsx } from 'clsx';
import { View } from 'react-native';

interface AlertDetailProps {
	expires: string;
	area: string;
	severity: string;
	description: string;
	instructions: string;
}

export const AlertDetail = ({ expires, area, severity, description, instructions }: AlertDetailProps) => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();

	const tolgee = useTolgee();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		return date.toLocaleDateString(tolgee.getLanguage(), {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		});
	};

	const getTime = (dateString: string) => {
		const date = new Date(dateString);

		return date.toLocaleTimeString(tolgee.getLanguage(), {
			hour: '2-digit',
			minute: '2-digit',
			hour12: tolgee.getLanguage() === 'en-US',
		});
	};
	const removeDoubleSpaces = (text: string) => text.replace(/(?<!\n)\n(?!\n)/g, ' ');

	const extractWhatAndImpacts = (text: string): string => {
		const ALLOWED_SECTIONS = ['WHAT', 'IMPACTS'];

		const extract = (label: string) => {
			const match = text.match(new RegExp(`\\* ${label}\\.\\.\\.([\\s\\S]*?)(?=\\s*\\* [A-Z /]+\\.\\.\\.|$)`));
			return match ? match[1].trim() : null;
		};

		const extracted = ALLOWED_SECTIONS.map(extract).filter(Boolean).join('\n\n');

		return extracted ? removeDoubleSpaces(extracted) : text;
	};

	const getLocaleSeverity = (severity: string) => {
		switch (severity) {
			case 'Unknown':
				return t('alerts.severity.unknown');
			case 'Minor':
				return t('alerts.severity.minor');
			case 'Moderate':
				return t('alerts.severity.moderate');
			case 'Severe':
				return t('alerts.severity.severe');
			case 'Extreme':
				return t('alerts.severity.extreme');
			default:
				return null;
		}
	};

	return (
		<View className={clsx('gap-2')}>
			{severity && (
				<ContentRow title={t('alerts.severity')}>
					<StyledText type="body">{getLocaleSeverity(severity)}</StyledText>
				</ContentRow>
			)}
			<ContentRow title={t('alerts.expires')}>
				<StyledText type="body">
					{getTime(expires)} - {formatDate(expires)}
				</StyledText>
			</ContentRow>
			{area.length > 0 && (
				<ContentRow title={t('alerts.area')}>
					<StyledText type="body">{area}</StyledText>
				</ContentRow>
			)}
			{description.length > 0 && (
				<ContentRow title={t('alerts.description')}>
					<StyledText type="body">
						{weatherData.location.country === 'United States of America'
							? extractWhatAndImpacts(description.trim().replace(/\n/g, ' '))
							: description.trim()}
					</StyledText>
				</ContentRow>
			)}
			{instructions.length > 0 && (
				<ContentRow title={t('alerts.instructions')}>
					<StyledText type="body">{removeDoubleSpaces(instructions.trim())}</StyledText>
				</ContentRow>
			)}
		</View>
	);
};
