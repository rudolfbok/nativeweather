import { clsx } from 'clsx';
import { Ref } from 'react';
import { GestureResponderEvent, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { ModalHeader } from './ModalHeader';

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
			presentationStyle={Platform.OS === 'web' ? 'overFullScreen' : 'formSheet'}
			transparent={Platform.OS === 'web' ? true : false}
			animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
			onRequestClose={onClose}
		>
			<Pressable onPress={onClose} className={clsx('absolute inset-0 bg-black/30 backdrop-blur-sm')} />
			<View
				className={clsx(
					'web:max-md:mt-10',
					'no-modal-scroll',
					'absolute inset-0 m-auto',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'web:rounded-tl-3xl web:rounded-tr-3xl web:md:rounded-3xl',
					'h-[100vh] w-full md:!h-fit md:max-h-[90vh] md:max-w-2xl lg:max-w-3xl',
					'shadow-[0px_0px_2px] shadow-black/10 dark:shadow-white/40',
					settingsModal && 'md:max-w-md lg:max-w-lg xl:max-w-xl',
					mapsModal && 'md:min-h-[90vh]'
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
					contentContainerClassName={clsx('ios:pb-6 flex-grow px-4 pb-4')}
					showsVerticalScrollIndicator={false}
					className="flex-1 rounded-bl-3xl rounded-br-3xl"
				>
					{children}
				</ScrollView>
			</View>
		</Modal>
	);
};
