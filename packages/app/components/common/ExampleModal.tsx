import { clsx } from 'clsx';
import { GestureResponderEvent, Modal, Platform, ScrollView, View } from 'react-native';
import { StyledText } from './styled/StyledText';

interface StyledModalProps {
	visible: boolean;
	onClose: (event: GestureResponderEvent) => void | Promise<void>;
	children: React.ReactNode;
}

export const ExampleModal = ({ visible, onClose, children }: StyledModalProps) => {
	return (
		<Modal
			visible={visible}
			transparent={Platform.OS === 'web'}
			presentationStyle={Platform.OS === 'ios' ? 'formSheet' : 'overFullScreen'}
			animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
			onRequestClose={onClose}
			navigationBarTranslucent
			statusBarTranslucent
		>
			<View
				className={clsx(
					'native:rounded-tl-3xl native:rounded-tr-3xl',
					'web:px-4 pt-4 max-md:pt-2',
					'bg-secondarySystemBackground dark:bg-systemBackground_dark',
					'native:h-full web:h-[100dvh] w-full',
					'md:m-auto md:max-h-[85vh] md:max-w-2xl md:rounded-3xl lg:max-w-3xl',
					'dark:shadow-[0px_0px_2px] dark:shadow-white/40'
				)}
				style={{ flex: 1 }} // <-- important
			>
				<ScrollView
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={Platform.OS !== 'web'}
					className="ios:px-4 flex-1"
					contentContainerClassName="ios:pb-6"
				>
					{/* Sticky Header */}
					<View className="bg-secondarySystemBackground dark:bg-systemBackground_dark fixed border-b border-gray-300 px-4 py-3 dark:border-gray-700">
						<StyledText type="title">Header Example</StyledText>
					</View>

					{/* Modal Content */}
					<View className="px-4 pt-4">
						{children}
						{/* Add more content to make scrolling visible */}
						<View className="h-[1000px]" />
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};
