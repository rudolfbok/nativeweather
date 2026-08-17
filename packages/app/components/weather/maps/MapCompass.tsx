import { useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { View } from 'react-native';

const directions = [
	'N',
	'NNE',
	'NE',
	'ENE',
	'E',
	'ESE',
	'SE',
	'SSE',
	'S',
	'SSW',
	'SW',
	'WSW',
	'W',
	'WNW',
	'NW',
	'NNW',
] as const;

export const MapCompass = ({ bearing, onPress }: { bearing: number; onPress: () => void }) => {
	const { t } = useTranslate('weather');
	const direction = directions[Math.round((((bearing % 360) + 360) % 360) / 22.5) % directions.length];

	return (
		<View className="web:top-4 ios:right-6 absolute right-4 items-center gap-1">
			<StyledPressable
				onPress={onPress}
				className="bg-systemBackground dark:bg-secondarySystemBackground_dark h-11 w-11 items-center justify-center rounded-full"
			>
				<View className="h-7 w-1" style={{ transform: [{ rotate: `${-bearing}deg` }] }}>
					<View className="h-3.5 w-1 rounded-t-full bg-red-600" />
					<View className="h-3.5 w-1 rounded-b-full bg-gray-500" />
				</View>
				<View className="absolute h-2 w-2 rounded-full bg-black dark:bg-white" />
			</StyledPressable>
			<View className="bg-systemBackground dark:bg-secondarySystemBackground_dark items-center justify-center rounded-md p-0.5">
				<StyledText type="bodysecondary" className="font-bold">
					{t(`wind.label.short.${direction}`)}
				</StyledText>
			</View>
		</View>
	);
};
