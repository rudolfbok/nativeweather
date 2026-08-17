import { useTranslate } from '@tolgee/react';
import UVScale from 'app/assets/uvscale.png';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useWeather } from 'app/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { SolitoImage } from 'solito/image';
import { useRouter } from 'solito/navigation';
import { StyledModal } from '../../common/styled/StyledModal';
import { UVIcon } from '../../icons/main/UVIcon';
import { DataCard } from '../DataCard';
import { UVModal } from './UVModal';

export const UVCard = ({ data }: { data: number }) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToUV = useModalNavigation({
		mobile: () => router.push('/modals/uv'),
		macos: () => setModalScreen('uv'),
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
							className={clsx('text-label dark:text-label_dark absolute -top-[13px] z-10 text-xl font-bold')}
							style={{
								left: `${scaleUV}%`,
							}}
						>
							|
						</Text>
					)}
					<View className={clsx('h-[3px] w-full')}>
						<SolitoImage alt="Air quality scale" src={UVScale} fill style={{ objectFit: 'fill' }} contentFit="fill" />
					</View>
				</View>
			}
			data={Math.round(data)}
			modal={
				Platform.OS !== 'macos' &&
				showModal && (
					<StyledModal visible={showModal} icon={<UVIcon />} header="UV Index" onClose={() => setShowModal(false)}>
						<UVModal />
					</StyledModal>
				)
			}
		/>
	);
};
