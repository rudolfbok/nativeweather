import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/RoundView';
import { Separator } from 'app/components/common/Separator';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledText } from 'app/components/common/StyledText';
import { WindDirectionIcon } from 'app/components/icons/WindDirectionIcon';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { Gauge, Wind } from 'lucide-react-native';
import { GestureResponderEvent, View } from 'react-native';
import { ModalValueItem } from './ModalValueItem';

interface WindModalProps {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
	currentWind: boolean;
	degree: number;
	speed: number | string;
	gust: number | string;
	dir: string;
}

export const WindModal = ({ visible, onClose, currentWind, degree, speed, gust, dir }: WindModalProps) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');

	const switchUnits = (kilometeres: string, miles: string) =>
		currentUnits === 'metric' ? kilometeres + 'km/h' : miles + 'mph';

	const beaufortScaleValues = [
		{
			name: t('description.windspeed.0'),
			textcolor: '',
			value: switchUnits('< 1', '< 1'),
		},
		{
			name: t('description.windspeed.1'),
			textcolor: '!text-[#0891B2]',
			value: switchUnits('1 - 5', '0 - 2'),
		},
		{
			name: t('description.windspeed.2'),
			textcolor: '!text-[#059669]',
			value: switchUnits('6 - 11', '4 - 7'),
		},
		{
			name: t('description.windspeed.3'),
			textcolor: '!text-[#16A34A]',
			value: switchUnits('12 - 19', '8 - 12'),
		},
		{
			name: t('description.windspeed.4'),
			textcolor: '!text-[#22C55E]',
			value: switchUnits('20 - 28', '13 - 18'),
		},
		{
			name: t('description.windspeed.5'),
			textcolor: '!text-[#65A30D]',
			value: switchUnits('29 - 38', '19 - 24'),
		},
		{
			name: t('description.windspeed.6'),
			textcolor: '!text-[#84CC16]',
			value: switchUnits('39 - 49', '25 - 31'),
		},
		{
			name: t('description.windspeed.7'),
			textcolor: '!text-[#A3A300]',
			value: switchUnits('50 - 61', '32 - 38'),
		},
		{
			name: t('description.windspeed.8'),
			textcolor: '!text-[#CA8A04]',
			value: switchUnits('62 - 74', '39 - 46'),
		},
		{
			name: t('description.windspeed.9'),
			textcolor: '!text-[#EA580C]',
			value: switchUnits('75 - 88', '47 - 54'),
		},
		{
			name: t('description.windspeed.10'),
			textcolor: '!text-[#DC2626]',
			value: switchUnits('89 - 102', '55 - 63'),
		},
		{
			name: t('description.windspeed.11'),
			textcolor: '!text-[#B91C1C]',
			value: switchUnits('103 - 117', '64 - 72'),
		},
		{
			name: t('description.windspeed.12'),
			textcolor: '!text-[#991B1B]',
			value: switchUnits('> 118', '> 73'),
		},
	];

	const getWindLabel: Record<string, string> = {
		N: t('wind.label.north'),
		NNE: t('wind.label.northnortheast'),
		NE: t('wind.label.northeast'),
		ENE: t('wind.label.eastnortheast'),
		E: t('wind.label.east'),
		ESE: t('wind.label.eastsoutheast'),
		SE: t('wind.label.southeast'),
		SSE: t('wind.label.southsoutheast'),
		S: t('wind.label.south'),
		SSW: t('wind.label.southsouthwest'),
		SW: t('wind.label.southwest'),
		WSW: t('wind.label.westsouthwest'),
		W: t('wind.label.west'),
		WNW: t('wind.label.westnorthwest'),
		NW: t('wind.label.northwest'),
		NNW: t('wind.label.northnorthwest'),
	};

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
				value: `${getWindLabel[dir]} / ${degree}°`,
			},
		];

		return (
			<View>
				<StyledText type="subtitle">{t('wind.current.title')}</StyledText>
				<RoundView className={clsx('mt-2 w-full justify-between gap-4 p-4')}>
					{windData.map((item, index) => (
						<View key={index} className={clsx('gap-4')}>
							<View className={clsx('flex-row items-center')}>
								<View className={clsx('mr-4 items-center justify-center rounded-lg bg-gray-500 p-1')}>{item.icon}</View>
								<View className={clsx('flex-1 flex-row justify-between')}>
									<StyledText type="subtitle">{item.label} </StyledText>
									<StyledText type="body">{item.value}</StyledText>
								</View>
							</View>
							{index < windData.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		);
	};

	return (
		<StyledModal visible={visible} icon={<Wind color="gray" />} header={t('wind.title')} onClose={onClose}>
			<View className={clsx('gap-2')}>
				<RenderCurrentWind />
				<View>
					<StyledText type="subtitle">{t('wind.beaufortscale')}</StyledText>
					<StyledText type="body">{t('wind.description')}</StyledText>
				</View>
				<RoundView className={clsx('gap-4 p-4')}>
					{beaufortScaleValues.map(({ name, textcolor, value }, index) => (
						<View key={index} className={clsx('gap-4')}>
							<ModalValueItem index={index} name={name} textcolor={textcolor} value={value} />
							{index < beaufortScaleValues.length - 1 && <Separator />}
						</View>
					))}
				</RoundView>
			</View>
		</StyledModal>
	);
};
