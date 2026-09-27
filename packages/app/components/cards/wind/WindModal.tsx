import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/layout/ContentRow';
import { Separator } from 'app/components/common/styled/Separator';
import { ValuesList } from 'app/components/common/modal/ValuesList';
import { WindDirectionIcon } from 'app/components/icons/ui/WindDirectionIcon';
import { useStorageString } from 'app/database/useStorage';
import { getDirection } from 'app/utils/mappings/windDirection';
import { clsx } from 'clsx';
import { Gauge, Wind } from 'lucide-react-native';
import { View } from 'react-native';

interface WindModalProps {
	currentWind?: boolean;
	degree?: number;
	speed?: number | string;
	gust?: number | string;
}

export const WindModal = ({ currentWind, degree, speed, gust }: WindModalProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');

	const switchUnits = (kilometeres: string, miles: string) =>
		currentUnits === 'metric' ? kilometeres + 'km/h' : miles + 'mph';

	const beaufortScaleValues = [
		{
			name: t('description.windspeed.0'),
			textColor: '',
			value: switchUnits('< 1', '< 1'),
		},
		{
			name: t('description.windspeed.1'),
			textColor: '!text-[#0891B2]',
			value: switchUnits('1 - 5', '0 - 2'),
		},
		{
			name: t('description.windspeed.2'),
			textColor: '!text-[#059669]',
			value: switchUnits('6 - 11', '4 - 7'),
		},
		{
			name: t('description.windspeed.3'),
			textColor: '!text-[#16A34A]',
			value: switchUnits('12 - 19', '8 - 12'),
		},
		{
			name: t('description.windspeed.4'),
			textColor: '!text-[#22C55E]',
			value: switchUnits('20 - 28', '13 - 18'),
		},
		{
			name: t('description.windspeed.5'),
			textColor: '!text-[#65A30D]',
			value: switchUnits('29 - 38', '19 - 24'),
		},
		{
			name: t('description.windspeed.6'),
			textColor: '!text-[#84CC16]',
			value: switchUnits('39 - 49', '25 - 31'),
		},
		{
			name: t('description.windspeed.7'),
			textColor: '!text-[#A3A300]',
			value: switchUnits('50 - 61', '32 - 38'),
		},
		{
			name: t('description.windspeed.8'),
			textColor: '!text-[#CA8A04]',
			value: switchUnits('62 - 74', '39 - 46'),
		},
		{
			name: t('description.windspeed.9'),
			textColor: '!text-[#EA580C]',
			value: switchUnits('75 - 88', '47 - 54'),
		},
		{
			name: t('description.windspeed.10'),
			textColor: '!text-[#DC2626]',
			value: switchUnits('89 - 102', '55 - 63'),
		},
		{
			name: t('description.windspeed.11'),
			textColor: '!text-[#B91C1C]',
			value: switchUnits('103 - 117', '64 - 72'),
		},
		{
			name: t('description.windspeed.12'),
			textColor: '!text-[#991B1B]',
			value: switchUnits('> 118', '> 73'),
		},
	];

	const RenderCurrentWind = () => {
		if (!currentWind) return null;

		const windData = [
			{
				icon: <Gauge color="white" />,
				label: t('wind.current.speed'),
				value: speed,
			},
			{
				icon: <Wind color="white" />,
				label: t('wind.current.gust'),
				value: gust,
			},
			{
				icon: <WindDirectionIcon />,
				label: t('wind.current.direction'),
				value: `${getDirection(degree, 'long', t)} / ${degree}°`,
			},
		];

		return (
			<ContentRow title={t('wind.current.title')}>
				<View className={clsx('w-full justify-between gap-4')}>
					{windData.map((item, index) => (
						<View key={index} className={clsx('gap-4')}>
							<View className={clsx('flex-row items-center')}>
								<View className={clsx('mr-4 items-center justify-center rounded-lg bg-gray-500 p-1')}>{item.icon}</View>
								<View className={clsx('flex-1 flex-row justify-between')}>
									<StyledText type="sectiontitle">{item.label}</StyledText>
									<StyledText type="body">{item.value}</StyledText>
								</View>
							</View>
							{index < windData.length - 1 && <Separator />}
						</View>
					))}
				</View>
			</ContentRow>
		);
	};

	return (
		<View className={clsx('gap-2')}>
			<RenderCurrentWind />
			<ContentRow title={t('wind.beaufortscale')}>
				<StyledText type="body">{t('wind.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('wind.values')}>
				<ValuesList values={beaufortScaleValues} showIndex={true} />
			</ContentRow>
		</View>
	);
};
