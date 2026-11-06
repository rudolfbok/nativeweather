import { getAlertKey } from '@/core';
import type { WeatherAlert } from '@nativeweather/types';
import { Fragment } from 'react';
import { View } from 'react-native';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Separator } from '../common/Separator';
import { Text } from '../common/Text';
import { ChevronIcon } from '../icons/ui/ChevronIcon';
import { SeverityDot } from './SeverityDot';

export const AlertList = ({ alerts, onOpen }: { alerts: WeatherAlert[]; onOpen: (alert: WeatherAlert) => void }) => (
	<RoundView>
		{alerts.map((alert, index) => (
			<Fragment key={getAlertKey(alert)}>
				{index > 0 && <Separator className="mx-4" />}
				<Pressable onPress={() => onOpen(alert)} className="w-full flex-row items-center gap-2 p-4">
					<SeverityDot severity={alert.severity} />
					<View className="flex-1">
						<Text type="sectiontitle">{alert.event}</Text>
						{alert.areas.length > 0 && (
							<Text type="body" numberOfLines={1} className="opacity-70">
								{alert.areas}
							</Text>
						)}
					</View>
					<ChevronIcon colorClassName="accent-label" size={26} />
				</Pressable>
			</Fragment>
		))}
	</RoundView>
);
