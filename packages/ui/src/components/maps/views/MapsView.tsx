import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../../common/layout/CardHeader';
import { RoundView } from '../../common/styled/RoundView';
import { MapIcon } from '../../icons/main';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { MapLibreView } from './MapLibreView';

export const MapsView = () => {
	const { t } = useTranslate('weather');

	return (
		<RoundView className={clsx('h-[450px] w-full flex-col px-4 pb-4 pt-3')}>
			<View className={clsx('mb-2 flex flex-row items-center justify-between')}>
				<CardHeader icon={<MapIcon />} header={t('maps.title')} />
			</View>
			<MapLibreView />
		</RoundView>
	);
};
