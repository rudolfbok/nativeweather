import { useTranslate } from '@tolgee/react';
import { router } from 'expo-router';
import { Maximize2 } from 'lucide-react-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { MapIcon } from '../icons/main/MapIcon';
import { MapLibreView } from './MapLibreView.web';

const MaximizeIcon = withUniwind(Maximize2);

export const MapsView = () => {
	const { t } = useTranslate('weather');

	return (
		<RoundView className="min-h-[280px] w-full flex-grow px-4 pt-3 pb-4 max-md:h-[450px]">
			<View className="mb-2 min-w-0 flex-row items-center justify-between">
				<CardHeader icon={<MapIcon />} header={t('maps.title')} className="flex-1" />
				<Pressable
					onPress={() => router.push('/modals/map')}
					accessibilityLabel={t('maps.title')}
					className="shrink-0 rounded-full p-1.5"
				>
					<MaximizeIcon colorClassName="accent-label" size={20} />
				</Pressable>
			</View>
			<MapLibreView />
		</RoundView>
	);
};
