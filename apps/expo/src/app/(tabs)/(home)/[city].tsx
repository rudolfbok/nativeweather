// STUB(phase-6): weather screen arrives with slice 6.7.
import { ContentRow, ScreenWrapper, Text } from '@nativeweather/ui';
import { Stack, Unmatched, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

// Future static routes that `[city]` would otherwise swallow.
const reservedSlugs = ['compass', 'modals', 'api'];

export default function CityScreen() {
	const { city, r, cr } = useLocalSearchParams<{ city: string; r?: string; cr?: string }>();

	if (reservedSlugs.includes(city)) return <Unmatched />;

	return (
		<View className="flex-1 bg-screen-background">
			<Stack.Screen options={{ title: city }} />
			<ScreenWrapper>
				<ContentRow title="City route params">
					<Text type="body">slug: {city}</Text>
					<Text type="body">r: {r ?? '–'}</Text>
					<Text type="body">cr: {cr ?? '–'}</Text>
				</ContentRow>
			</ScreenWrapper>
		</View>
	);
}
