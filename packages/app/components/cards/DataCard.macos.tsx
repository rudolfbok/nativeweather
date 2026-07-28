import { clsx } from 'clsx';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { StyledText } from '../common/styled/StyledText';
import { CardHeader } from '../common/ui/CardHeader';

interface DataCardProps {
	onPress: (event: GestureResponderEvent) => void | Promise<void>;
	icon: React.ReactNode;
	title: string;
	description?: string;
	data: string | number | null;
	extraContent?: React.ReactNode;
	className?: string;
	modal: React.ReactNode;
}

export const DataCard = ({
	onPress,
	icon,
	title,
	description,
	data,
	extraContent,
	className,
	modal,
}: DataCardProps) => {
	const wide = className?.includes('min-w-full');

	return (
		<>
			<Pressable
				onPress={onPress}
				className={clsx(
					'bg-systemBackground hover:bg-tertiarySystemBackground justify-between overflow-hidden rounded-3xl p-4',
					'dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark'
				)}
				style={{ width: wide ? '49%' : '23.5%', height: 180 }}
			>
				<CardHeader icon={icon} header={title} />
				<View>
					{description && <StyledText type="body">{description}</StyledText>}
					{extraContent && <View>{extraContent}</View>}
				</View>
				<View className="w-full items-end">
					<StyledText type="data" className="text-end">
						{data}
					</StyledText>
				</View>
			</Pressable>
			{modal}
		</>
	);
};
