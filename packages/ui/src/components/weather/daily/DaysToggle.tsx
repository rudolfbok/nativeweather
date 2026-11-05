import { formatWeekday, useWeather } from '@nativeweather/core';
import { useTolgee } from '@tolgee/react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Pressable } from '../../common/Pressable';
import { Text } from '../../common/Text';

interface DaysToggleProps {
	selectedIndex: number;
	onSelect: (dayIndex: number) => void;
}

export const DaysToggle = ({ selectedIndex, onSelect }: DaysToggleProps) => {
	const language = useTolgee(['language']).getLanguage() ?? 'en-US';
	const forecastDays = useWeather((state) => state.weatherData?.forecast.forecastday);
	const days = forecastDays?.slice(0, 7) ?? [];

	return (
		<View className="mb-4 flex-row justify-between gap-2">
			{days.map(({ date }, index) => {
				const selected = index === selectedIndex;

				return (
					<Pressable
						key={date}
						onPress={() => onSelect(index)}
						accessibilityRole="tab"
						accessibilityState={{ selected }}
						className={twMerge(
							'min-h-10 flex-1 items-center justify-center rounded-3xl border border-hairline py-2',
							selected && 'border-primary-blue bg-primary-blue active:bg-primary-blue web:hover:bg-primary-blue'
						)}
					>
						<Text type="body" className={twMerge('font-semibold', selected && 'text-ui-foreground')}>
							{formatWeekday(date, language)}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};
