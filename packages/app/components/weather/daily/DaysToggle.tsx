import { clsx } from 'clsx';
import { View } from 'react-native';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { NormalizedData } from 'app/types/normalizedData';
import { useTolgee } from '@tolgee/react';
import { border } from 'app/constants/border';

interface DaysToggleProps {
	days: NormalizedData['forecast']['forecastday'];
	onSelectDay: (day: NormalizedData['forecast']['forecastday'][0]) => void;
}

export const DaysToggle = ({ days, onSelectDay }: DaysToggleProps) => {
	const tolgee = useTolgee();
	const getDayName = (date: string, short: boolean) =>
		new Date(date).toLocaleString(tolgee.getLanguage(), {
			weekday: short ? 'short' : 'long',
		});

	return (
		<View className={clsx('mb-4 mt-2 flex-row justify-between gap-2')}>
			{days.slice(0, 7).map((day) => {
				return (
					<StyledPressable
						key={day.date}
						onPress={() => onSelectDay(day)}
						className={clsx('min-h-11 w-[45px] flex-1 items-center justify-center rounded-3xl py-2', border)}
					>
						<StyledText type="body" className={clsx('font-semibold')}>
							{getDayName(day.date, true)}
						</StyledText>
					</StyledPressable>
				);
			})}
		</View>
	);
};
