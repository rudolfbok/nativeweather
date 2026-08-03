import { clsx } from 'clsx';
import { Ref } from 'react';
import { GestureResponderEvent, Modal, Pressable, ScrollView, View } from 'react-native';
import { ModalHeader } from '../ui/ModalHeader';
// import { hairlineWidth } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheetExports';
import { StyleSheet } from 'react-native';
import { useThemeColors } from 'app/hooks/useThemeColors';

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
	mapsModal = false,
	children,
}: StyledModalProps) => {
	const { modalBorder } = useThemeColors();

	return (
		<Pressable className="z-100 absolute h-screen w-screen bg-black/40 dark:bg-black/70" onPress={onClose}>
			{/* <Pressable className="ahsolute z-10 h-screen w-screen" onPress={onClose} /> */}
			{/* <Pressable onPress={onClose} className={clsx('absolute inset-0 bg-black/40 backdrop-blur-md max-md:hidden')} /> */}
			<View
				className={clsx(
					'no-modal-scroll overflow-hidden',
					'pt-4',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'h-[100dvh] w-full md:h-fit',
					'md:m-auto md:max-h-[85vh] md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
					// 'border border-white',
					settingsModal && 'md:max-w-md lg:max-w-lg',
					mapsModal && 'min-h-[80vh] lg:max-w-5xl'
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
		</Pressable>
	);
};
