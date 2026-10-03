import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { Check, Star, StarOff, X } from 'lucide-react-native';
import { View } from 'react-native';

export type NotificationToastType = 'error' | 'done' | 'add' | 'remove';

const toastStyles: Record<NotificationToastType, { Icon: typeof Check; color: string; fill?: string }> = {
	error: { Icon: X, color: '#FF3B30' },
	done: { Icon: Check, color: '#007AFF' },
	add: { Icon: Star, color: '#FE9804', fill: '#FE9804' },
	remove: { Icon: StarOff, color: '#FE9804' },
};

export const NotificationToast = ({ message, type }: { message: string; type: NotificationToastType }) => {
	const { Icon, color, fill } = toastStyles[type];

	return (
		<View
			className={clsx(
				'native:mx-4 bg-primarySystemBackground flex-row items-center gap-3 rounded-xl border border-black/15 p-4 web:w-full web:md:w-[350px] dark:border-white/15 dark:bg-black'
			)}
		>
			<Icon color={color} fill={fill ?? 'none'} size={20} />
			<StyledText type="caption" className={clsx('flex-1 font-semibold')} numberOfLines={3}>
				{message}
			</StyledText>
		</View>
	);
};
