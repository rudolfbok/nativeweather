import { useTranslate } from '@tolgee/react';
import UVScale from 'app/assets/uvscale.png';
import { useWeather } from 'app/hooks/useWeather';
import { clsx } from 'clsx';
import { Sun } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SolitoImage } from 'solito/image';
import { DataCard } from './DataCard';
import { UVIndexModal } from './modals/UVIndexModal';

export const UVIndexCard = ({ data }: { data: number }) => {
	const { weatherData } = useWeather();
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const MAX_UV = 15;
	const roundUV = weatherData ? Math.round(data) : 0;
	const scaleUV = Math.min((roundUV / MAX_UV) * 100, 100);

	const uvRanges = [
		{ max: 2, description: t('description.uvindex.0') },
		{ max: 5, description: t('description.uvindex.1') },
		{ max: 7, description: t('description.uvindex.2') },
		{ max: 10, description: t('description.uvindex.3') },
		{ max: Infinity, description: t('description.uvindex.4') },
	];

	const description = uvRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <UVIndexModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<Sun color="purple" />}
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
		/>
	);
};
