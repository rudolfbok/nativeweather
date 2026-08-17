'use client';

import { MapLibreView } from 'app/components/weather/maps/MapLibreView';
import { clsx } from 'clsx';
import { View } from 'react-native';

export default function MapsScreen() {
	return (
		<View className={clsx('flex-1 p-4')}>
			<MapLibreView />
		</View>
	);
}
