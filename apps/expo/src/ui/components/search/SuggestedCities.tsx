import type { City } from '@nativeweather/types';
import { useTranslate } from '@tolgee/react';
import { Pressable, View } from 'react-native';
import { Text } from '../common/Text';

// Labels are the familiar names; the cities are what the weather API calls them.
const suggestedCities: { label: string; city: City }[] = [
	{ label: 'Prague', city: { name: 'Praha', region: 'Hlavni mesto Praha', country: 'Czech Republic' } },
	{ label: 'New York', city: { name: 'New York', region: 'New York', country: 'United States of America' } },
	{ label: 'Osaka', city: { name: 'Osaka-Shi', region: 'Osaka', country: 'Japan' } },
	{ label: 'London', city: { name: 'London', region: 'City of London, Greater London', country: 'United Kingdom' } },
	{ label: 'Istanbul', city: { name: 'Istanbul', region: 'Istanbul', country: 'Turkey' } },
];

/** A row of well-known cities to try when the requested one couldn't be found. */
export const SuggestedCities = ({ onOpen }: { onOpen: (city: City) => void }) => {
	const { t } = useTranslate('common');

	return (
		<View className="items-center gap-3">
			<Text type="body" className="font-medium">
				{t('status.suggested')}
			</Text>
			<View className="flex-row flex-wrap justify-center gap-2">
				{suggestedCities.map(({ label, city }) => (
					<Pressable
						key={label}
						onPress={() => onOpen(city)}
						accessibilityRole="link"
						className="rounded-3xl bg-primary-blue px-4 py-3 active:opacity-80 web:cursor-pointer web:hover:opacity-90"
					>
						<Text type="body" className="text-ui-foreground">
							{label}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
};
