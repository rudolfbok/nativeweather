import { NativeInstance } from '../../../utils/nativeInstance';
import { clsx } from 'clsx';
import { GestureResponderEvent, Modal, Pressable, ScrollView, View } from 'react-native';
import { ModalHeader } from './ModalHeader';

interface StyledModalProps {
	visible: boolean;
	icon?: React.ReactNode;
	header: string;
	subHeader?: React.ReactNode;
	daysToggle?: React.ReactNode;
	onClose: () => void | Promise<void>;
	ref?:
		| { readonly current: NativeInstance<typeof ScrollView> | null }
		| ((instance: NativeInstance<typeof ScrollView> | null) => void);
	goBackHeader?: boolean;
	goBackOnPress?: (event: GestureResponderEvent) => void | Promise<void>;
	settingsModal?: boolean;
	airQualityModal?: boolean;
	mapsModal?: boolean;
	showBackdrop?: boolean;
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
	showBackdrop = true,
	children,
}: StyledModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent={true}
			presentationStyle="overFullScreen"
			animationType="none"
			onRequestClose={onClose}
			navigationBarTranslucent={true}
			statusBarTranslucent={true}
		>
			<Pressable
				onPress={onClose}
				className={clsx('absolute inset-0 max-md:hidden', showBackdrop && 'bg-black/40 backdrop-blur-md')}
			/>
			<View
				className={clsx(
					'no-overlay-scroll overflow-hidden',
					'px-4 pt-4',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'h-[100dvh] w-full md:h-fit',
					'md:m-auto md:max-h-[85vh] md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
					'border-black/15 md:border dark:border-white/15',
					settingsModal && 'md:max-w-md lg:max-w-lg',
					airQualityModal && 'w-full md:w-[600px]',
					mapsModal && 'min-h-[80vh] lg:max-w-5xl'
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
				{mapsModal ? (
					<View className={clsx('flex-1 pb-4')}>{children}</View>
				) : (
					<ScrollView ref={ref} showsVerticalScrollIndicator={false} className={clsx('flex-grow pb-4')}>
						{children}
					</ScrollView>
				)}
			</View>
		</Modal>
	);
};
