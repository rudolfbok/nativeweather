import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { WeatherAlert } from 'app/types/weatherAlert';
import { clsx } from 'clsx';
import { ChevronRight, BadgeAlert } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'solito/navigation';

interface AlertWeatherProps {
	filteredAlerts: WeatherAlert[];
	alertsLength: number;
	desktop?: string;
	mobile?: string;
}

export const AlertWeather = ({ alertsLength, mobile }: AlertWeatherProps) => {
	const { t } = useTranslate('weather');
	const tolgee = useTolgee();
	const router = useRouter();

	if (alertsLength === 0) return null;

	return (
		<StyledPressable
			onPress={() => router.push('/modals/alerts')}
			className={clsx('native:mt-4 w-full flex-row items-center justify-between rounded-3xl p-4', mobile)}
			liquidGlass={true}
			style={{
				padding: 16,
				flexDirection: 'row',
				width: 'auto',
				borderRadius: 20,
				marginTop: 4,
				justifyContent: 'space-between',
			}}
		>
			<CardHeader
				icon={<BadgeAlert color="#007AFF" />}
				header={`${alertsLength} ${t('alerts.title')}${tolgee.getLanguage() === 'en-US' && alertsLength > 1 ? 's' : ''}`}
			/>
			<ChevronRight color="#007AFF" size={26} />
		</StyledPressable>
	);
};
