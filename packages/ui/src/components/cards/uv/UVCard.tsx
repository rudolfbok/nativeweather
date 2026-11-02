import { useTranslate } from '@tolgee/react';
import { GradientScale } from '../../weather/GradientScale';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigationScreen';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { StyledModal } from '../../common/modal/StyledModal';
import { UVIcon } from '../../icons/main/UVIcon';
import { DataCard } from '../DataCard';
import { UVModal } from './UVModal';

interface UVCardProps {
	forecastDate?: string;
	data: number;
	showBackdrop?: boolean;
	onCloseParent?: () => void;
}

export const UVCard = ({ forecastDate, data, showBackdrop, onCloseParent }: UVCardProps) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToUV = useModalNavigation({
		mobile: () => router.push(`/modals/uv${forecastDate ? `?date=${encodeURIComponent(forecastDate)}` : ''}`),
		macos: () => setModalScreen('uv', forecastDate),
		web: () => setShowModal(true),
	});

	const MAX_UV = 15;
	const roundUV = weatherData ? Math.round(data) : 0;
	const scaleUV = Math.min((roundUV / MAX_UV) * 100, 100);

	const uvRanges = [
		{ max: 2, description: t('description.uv.0') },
		{ max: 5, description: t('description.uv.1') },
		{ max: 7, description: t('description.uv.2') },
		{ max: 10, description: t('description.uv.3') },
		{ max: Infinity, description: t('description.uv.4') },
	];

	const description = uvRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={navigateToUV}
			icon={<UVIcon />}
			title="UV"
			description={description}
			extraContent={
				<View className={clsx('relative mt-3 flex w-[100%] items-center justify-center')}>
					{roundUV !== 0 && (
						<Text
							className={clsx('absolute -top-[13px] z-10 text-xl font-bold text-label dark:text-label_dark')}
							style={{
								left: `${scaleUV}%`,
							}}
						>
							|
						</Text>
					)}
					<View className={clsx('h-2 w-full')}>
						<GradientScale type="uv" label="UV index scale" />
					</View>
				</View>
			}
			data={Math.round(data)}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<UVIcon />}
						header="UV Index"
						onClose={() => {
							setShowModal(false);
							onCloseParent?.();
						}}
						goBackHeader={Boolean(onCloseParent)}
						goBackOnPress={() => setShowModal(false)}
						showBackdrop={showBackdrop}
					>
						<UVModal initialDate={forecastDate} />
					</StyledModal>
				)
			}
		/>
	);
};
