import { Check, Star, StarOff, X } from 'lucide-react-native';
import { View } from 'react-native';
import { useCSSVariable, withUniwind } from 'uniwind';
import { Text } from './Text';

export type ToastType = 'error' | 'done' | 'add' | 'remove';

export interface ToastData {
	message: string;
	type: ToastType;
}

const toastIcons = {
	error: { Icon: withUniwind(X), colorClassName: 'accent-system-red' },
	done: { Icon: withUniwind(Check), colorClassName: 'accent-primary-blue' },
	add: { Icon: withUniwind(Star), colorClassName: 'accent-favorite' },
	remove: { Icon: withUniwind(StarOff), colorClassName: 'accent-favorite' },
};

export const NotificationToast = ({ message, type }: ToastData) => {
	const favorite = useCSSVariable('--color-favorite') as string;
	const { Icon, colorClassName } = toastIcons[type];

	return (
		<View className="flex-row items-center gap-3 rounded-xl border border-hairline bg-system-background p-4 web:w-full web:md:w-[350px]">
			<Icon colorClassName={colorClassName} fill={type === 'add' ? favorite : 'none'} size={20} />
			<Text type="caption" className="flex-1 font-semibold" numberOfLines={3}>
				{message}
			</Text>
		</View>
	);
};
