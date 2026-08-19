import { clsx } from 'clsx';
import { Ref } from 'react';
import { GestureResponderEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ModalHeader } from './ModalHeader';
import { useThemeColors } from 'app/hooks/theme/useThemeColors';

interface StyledModalProps {
	visible: boolean;
	icon?: React.ReactNode;
	header: string;
	subHeader?: React.ReactNode;
	daysToggle?: React.ReactNode;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
	ref?: Ref<ScrollView>;
	goBackHeader?: boolean;
	goBackOnPress?: (event: GestureResponderEvent) => void | Promise<void>;
	settingsModal?: boolean;
	airQualityModal?: boolean;
	mapsModal?: boolean;
	children: React.ReactNode;
}

export const StyledModal = ({
	visible,
	icon,
	header,
	subHeader,
	daysToggle,
	onClose,
	ref,
	goBackHeader = false,
	goBackOnPress,
	settingsModal = false,
	airQualityModal = false,
	mapsModal = false,
	children,
}: StyledModalProps) => {
	const { modalBorder } = useThemeColors();

	if (!visible) return null;

	return (
		<View
			// pointerEvents="auto"
			// onStartShouldSetResponder={() => true}
			className="absolute inset-0 h-screen w-screen items-center justify-center bg-black/40 dark:bg-black/60"
		>
			<Pressable className="absolute inset-0 h-screen w-screen" onPress={onClose} />
			<View
				className={clsx(
					'no-modal-scroll overflow-hidden',
					'-mt-6 pt-4',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'max-h-[80vh] w-full',
					'md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
					settingsModal && 'md:max-w-md lg:max-w-lg',
					mapsModal && 'min-h-[80vh] lg:max-w-5xl',
					airQualityModal && 'w-full md:w-[600px]'
				)}
				style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: modalBorder }}
			>
				<ModalHeader
					icon={icon}
					header={header}
					subHeader={subHeader}
					showBack={goBackHeader}
					onClose={onClose}
					onBackPress={goBackOnPress}
					daysToggle={daysToggle}
				/>
				{mapsModal ? (
					<View className={clsx('flex-1 pb-4')}>{children}</View>
				) : (
					<ScrollView ref={ref} className={clsx('flex-grow')} contentContainerClassName="px-4 pb-4">
						{children}
					</ScrollView>
				)}
			</View>
		</View>
	);
};
