import { formatAlertExpiry, getAlertSeverityLevel, getAlertText, useWeather } from '@nativeweather/core';
import type { WeatherAlert } from '@nativeweather/types';
import { useTolgee, useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { levelTextClass } from '../../utils/mappings/levelClasses';
import { ContentRow } from '../common/ContentRow';
import { RoundView } from '../common/RoundView';
import { Separator } from '../common/Separator';
import { Text } from '../common/Text';

const severityKeys = ['minor', 'moderate', 'severe', 'extreme'];

export const AlertDetail = ({ alert }: { alert: WeatherAlert }) => {
	const { t } = useTranslate('weather');
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const location = useWeather((state) => state.weatherData?.location);
	const { description, instructions } = getAlertText(alert, location?.country);
	const expires = formatAlertExpiry(alert.expires, language, location?.tzId);
	const severity = alert.severity.toLowerCase();

	return (
		<View className="gap-4">
			<RoundView className="gap-2 p-4">
				<View className="items-center gap-1">
					<Text type="sectiontitle">{t('alerts.severity')}</Text>
					<Text type="body" className={twMerge('font-semibold', levelTextClass[getAlertSeverityLevel(alert.severity)])}>
						{t(`alerts.severity.${severityKeys.includes(severity) ? severity : 'unknown'}`)}
					</Text>
				</View>
				{expires && (
					<>
						<Separator />
						<View className="items-center">
							<Text type="sectiontitle">{t('alerts.expires')}</Text>
							<Text type="body">{expires}</Text>
						</View>
					</>
				)}
			</RoundView>
			{alert.areas.length > 0 && (
				<ContentRow title={t('alerts.area')}>
					<Text type="body">{alert.areas}</Text>
				</ContentRow>
			)}
			{description.length > 0 && (
				<ContentRow title={t('alerts.description')}>
					<Text type="body">{description}</Text>
				</ContentRow>
			)}
			{instructions.length > 0 && (
				<ContentRow title={t('alerts.instructions')}>
					<Text type="body">{instructions}</Text>
				</ContentRow>
			)}
		</View>
	);
};
