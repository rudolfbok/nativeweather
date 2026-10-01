import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { View } from 'react-native';

interface ModalValueItemProps {
	index?: number;
	textColor?: string;
	name: string;
	value?: string;
	description?: string;
	moonPhase?: React.ReactNode;
	showItemIndex?: boolean;
}

export const ModalValueItem = ({
	index,
	textColor,
	name,
	value,
	description,
	moonPhase,
	showItemIndex = true,
}: ModalValueItemProps) => {
	const RenderIndex = () => {
		if (!showItemIndex) return moonPhase;

		return (
			<View className={clsx('w-8')}>
				<View
					className={clsx(
						'bg-tertiarySystemBackground dark:bg-tertiarySystemBackground_dark aspect-square items-center justify-center rounded-full'
					)}
				>
					<StyledText type="body" className={clsx('font-medium')}>
						{index}
					</StyledText>
				</View>
			</View>
		);
	};

	return (
		<View className={clsx('w-full flex-row items-center gap-4')}>
			<RenderIndex />
			<View className={clsx('flex-1')}>
				<StyledText type="body" className={clsx('font-semibold', textColor)}>
					{name}
				</StyledText>
				{value && (
					<StyledText type="body" className={clsx('font-medium')}>
						{value}
					</StyledText>
				)}
				{description && <StyledText type="body">{description}</StyledText>}
			</View>
		</View>
	);
};
