import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Map } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { CardHeader } from 'app/components/common/CardHeader';
import { RoundView } from 'app/components/common/RoundView';
import { StyledModal } from 'app/components/common/StyledModal';
import { StyledPressable } from 'app/components/common/StyledPressable';
import { MaximizeIcon } from 'app/components/icons/MaximizeIcon';
import { GoogleMapsView } from './GoogleMapsView';
import { PlatformGoogleMaps } from './PlatformGoogleMaps.web';

export const MapsView = () => {
	const { t } = useTranslate('weather');
	const [showMapsModal, setShowMapsModal] = useState(false);

	return (
		<>
			<RoundView className={clsx('w-full flex-grow flex-col px-4 pb-4 pt-3 max-md:h-[450px]')}>
				<View className={clsx('mb-2 flex flex-row items-center justify-between')}>
					<CardHeader icon={<Map color="black" fill="#F2F2F7" />} header={t('maps.title')} />
					<StyledPressable onPress={() => setShowMapsModal((prev) => !prev)} className={clsx('rounded-full p-1')}>
						<MaximizeIcon />
					</StyledPressable>
				</View>
				<GoogleMapsView className="flex-1" />
			</RoundView>
			{showMapsModal && (
				<StyledModal
					visible={showMapsModal}
					onClose={() => setShowMapsModal(false)}
					icon={<Map color="black" fill="#F2F2F7" />}
					header={t('maps.title')}
					mapsModal={true}
				>
					<View className="h-[80vh] !flex-grow">
						<GoogleMapsView className="flex-grow" />
					</View>
				</StyledModal>
			)}
		</>
	);
};
