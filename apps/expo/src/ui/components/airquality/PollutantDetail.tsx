import { getAirQualityScale } from '@/core';
import type { Pollutant } from '@/core';
import { useTranslate } from '@tolgee/react';
import { Linking, View } from 'react-native';
import { levelTextClass } from '../../utils/mappings/levelClasses';
import { ContentRow } from '../common/ContentRow';
import { Text } from '../common/Text';
import { ValuesList } from '../common/ValuesList';
import { pollutants } from './pollutants';

interface PollutantDetailProps {
	pollutant: Pollutant;
	/** Defaults to the system handler; the desktop shell passes its own because a webview cannot open links. */
	openUrl?: (url: string) => void;
}

export const PollutantDetail = ({ pollutant, openUrl = (url) => void Linking.openURL(url) }: PollutantDetailProps) => {
	const { t } = useTranslate('weather');
	const { levelKey, listKey, link } = pollutants[pollutant];
	const { levels, bounds } = getAirQualityScale(pollutant);

	return (
		<View className="gap-4">
			<ContentRow title={t('modal.description')}>
				<Text type="body">{t(`airquality.${pollutant}.main`)}</Text>
				{link && (
					<Text type="link" className="mt-4" onPress={() => openUrl(link)}>
						{link}
					</Text>
				)}
			</ContentRow>
			<ContentRow title={t(listKey)}>
				<ValuesList
					values={levels.map((level, index) => ({
						name: t(`${levelKey}.${index}`),
						// The US index is whole numbers to 500 with inclusive tops; every other scale is open-ended.
						value:
							pollutant === 'usaqi'
								? `${bounds[index - 1] ?? 0} - ${(bounds[index] ?? 501) - 1}`
								: index === bounds.length
									? `${bounds[index - 1]}+`
									: `${bounds[index - 1] ?? 0} - ${bounds[index]}`,
						description: t(`airquality.${pollutant}.text.${index}`),
						className: levelTextClass[level],
					}))}
				/>
			</ContentRow>
		</View>
	);
};
