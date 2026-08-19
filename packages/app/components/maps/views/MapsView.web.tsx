import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { RoundView } from 'app/components/common/styled/RoundView';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { MapIcon } from 'app/components/icons/main';
import { MaximizeIcon } from 'app/components/icons/ui/MaximizeIcon';
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
				<View className={clsx('mb-2 flex flex-row items-center justify-between')}>
					<CardHeader icon={<MapIcon />} header={t('maps.title')} />
					<StyledPressable onPress={() => setShowMapsModal((prev) => !prev)} className={clsx('rounded-full p-1.5')}>
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
