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
		<>
			<Pressable onPress={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-md" />
			<Modal
				visible={visible}
				transparent={Platform.OS === 'web' ? true : false}
				presentationStyle={Platform.OS === 'web' ? 'overFullScreen' : 'formSheet'}
				animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
				onRequestClose={onClose}
			>
				<View
					className={clsx(
						'no-modal-scroll',
						'flex flex-col overflow-hidden',
						'bg-secondarySystemBackground dark:bg-systemBackground_dark',
						'mt-auto w-full',
						'ios:h-full web:h-[95dvh] web:md:h-fit',
						'web:rounded-tl-3xl web:rounded-tr-3xl',
						'md:m-auto md:max-h-[85vh] md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
						'shadow-[0px_0px_2px] shadow-black/10 dark:shadow-white/40',
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
						contentContainerClassName={clsx('px-4 pb-4')}
						showsVerticalScrollIndicator={Platform.OS === 'web' ? false : true}
						className="flex-grow"
					>
						{children}
					</ScrollView>
				</View>
			</Modal>
		</>
	);
};
