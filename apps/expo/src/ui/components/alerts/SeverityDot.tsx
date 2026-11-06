import { getAlertSeverityLevel } from '@/core';
import { View } from 'react-native';
import { levelBgClass } from '../../utils/mappings/levelClasses';

// The 24px box matches the other card icons, so the dot lines up with them.
export const SeverityDot = ({ severity = 'Unknown' }: { severity?: string }) => (
	<View className="h-6 w-6 items-center justify-center">
		<View className={`h-2.5 w-2.5 rounded-full ${levelBgClass[getAlertSeverityLevel(severity)]}`} />
	</View>
);
