import { useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { RoundView } from 'app/components/common/styled/RoundView';
import { MapIcon } from 'app/components/icons/main';
import { MaximizeIcon } from 'app/components/icons/ui/MaximizeIcon';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { MapLibreView } from './MapLibreView';

export const MapsView = () => {
	const { t } = useTranslate('weather');
	const { setModalScreen } = useNavigationScreen();

	return (
		<RoundView className={clsx('min-h-[320px] w-full flex-grow flex-col px-4 pb-4 pt-3')}>
			<View className={clsx('mb-2 min-w-0 flex-row items-center justify-between')}>
				<CardHeader icon={<MapIcon />} header={t('maps.title')} className={clsx('min-w-0 flex-1')} />
				<StyledPressable onPress={() => setModalScreen('maps')} className={clsx('flex-shrink-0 rounded-full p-1.5')}>
					<MaximizeIcon />
				</StyledPressable>
			</View>
			<MapLibreView />
		</RoundView>
	);
};
