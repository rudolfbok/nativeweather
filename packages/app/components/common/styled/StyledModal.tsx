import { clsx } from 'clsx';
import { Ref } from 'react';
import { GestureResponderEvent, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { ModalHeader } from '../ui/ModalHeader';

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
	return (
		<Modal
			visible={visible}
			transparent={true}
			presentationStyle={Platform.OS === 'ios' ? 'formSheet' : 'overFullScreen'}
			animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
			onRequestClose={onClose}
			navigationBarTranslucent={true}
			statusBarTranslucent={true}
		>
			<Pressable
				onPress={onClose}
				className="web:backdrop-blur-md android:hidden absolute inset-0 bg-black/40 max-md:hidden"
			/>
			<View
				className={clsx(
					'android:rounded-tl-3xl native:mt-16 android:rounded-tr-3xl',
					'no-modal-scroll overflow-hidden',
					'px-4 pt-4 max-md:pt-2',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'native:h-full web:h-[100dvh] web:md:h-fit w-full',
					'rounded-tl-3xl rounded-tr-3xl',
					'md:m-auto md:max-h-[85vh] md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
					'dark:shadow-[0px_0px_2px] dark:shadow-white/40',
					settingsModal && 'md:max-w-md lg:max-w-lg',
					mapsModal && 'md:h-[90vh] lg:!min-w-[60vw]'
				)}
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
				<ScrollView
					ref={ref}
					showsVerticalScrollIndicator={Platform.OS === 'web' ? false : true}
					className="flex-grow pb-4"
				>
					{children}
				</ScrollView>
			</View>
		</Modal>
	);
};
