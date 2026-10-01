import { useTranslate } from '@tolgee/react';
import { CardHeader } from '@nativeweather/ui/components/common/layout/CardHeader';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { MapIcon } from '@nativeweather/ui/components/icons/main';
import { MaximizeIcon } from '@nativeweather/ui/components/icons/ui/MaximizeIcon';
import { clsx } from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';
import { MapLibreView } from './MapLibreView';

export const MapsView = () => {
	const { t } = useTranslate('weather');
	const [showMapsModal, setShowMapsModal] = useState(false);

	return (
		<>
			<RoundView className={clsx('min-h-[280px] w-full flex-grow flex-col px-4 pb-4 pt-3 max-md:h-[450px]')}>
				<View className={clsx('mb-2 min-w-0 flex-row items-center justify-between')}>
					<CardHeader icon={<MapIcon />} header={t('maps.title')} className={clsx('min-w-0 flex-1')} />
					<StyledPressable onPress={() => setShowMapsModal((prev) => !prev)} className={clsx('flex-shrink-0 rounded-full p-1.5')}>
						<MaximizeIcon />
					</StyledPressable>
				</View>
				{!showMapsModal && <MapLibreView />}
			</RoundView>
			{showMapsModal && (
				<StyledModal
					visible={showMapsModal}
					onClose={() => setShowMapsModal(false)}
					icon={<MapIcon />}
					header={t('maps.title')}
					mapsModal={true}
				>
					<MapLibreView showCompass={true} />
				</StyledModal>
			)}
		</>
	);
};
