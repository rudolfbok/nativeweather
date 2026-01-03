import { useTolgee, useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { StyledText } from 'app/components/common/StyledText';
import { useWeather } from 'app/hooks/useWeather';
import clsx from 'clsx';
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
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	const getTime = (dateString: string) => {
		const date = new Date(dateString);

		return date.toLocaleTimeString(tolgee.getLanguage(), {
			hour: '2-digit',
			minute: '2-digit',
			hour12: tolgee.getLanguage() === 'en',
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

	return (
		<View className={clsx('w-full gap-2')}>
			{severity !== 'Unknown' && (
				<View>
					<StyledText type="subtitle">{t('alerts.severity')}</StyledText>
					<StyledText type="body">{severity}</StyledText>
				</View>
			)}
			<View>
				<StyledText type="body" className={clsx('font-semibold')}>
					{t('alerts.expires')}
				</StyledText>
				<StyledText type="body">
					{getTime(expires)} - {formatDate(expires)}
				</StyledText>
			</View>
			{area.length > 0 && (
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('alerts.area')}</StyledText>
					<RoundView className={clsx('p-4')}>
						<StyledText type="body" className={clsx('line-clamp-3')}>
							{area}
						</StyledText>
					</RoundView>
				</View>
			)}
			{description.length > 0 && (
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('alerts.description')}</StyledText>
					<RoundView className={clsx('p-4')}>
						<StyledText type="body">
							{weatherData.location.country === 'United States of America'
								? extractWhatAndImpacts(description.trim())
								: description.trim()}
						</StyledText>
					</RoundView>
				</View>
			)}
			{instructions.length > 0 && (
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('alerts.instructions')}</StyledText>
					<RoundView className={clsx('p-4')}>
						<StyledText type="body">{removeDoubleSpaces(instructions.trim())}</StyledText>
					</RoundView>
				</View>
			)}
		</View>
	);
};
