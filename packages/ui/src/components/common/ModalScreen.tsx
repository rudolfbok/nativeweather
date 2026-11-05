import type { ReactNode } from 'react';
import { Platform, Pressable as NativePressable, ScrollView, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { ModalHeader } from './ModalHeader';
import type { ModalHeaderProps } from './ModalHeader';

interface ModalScreenProps extends ModalHeaderProps {
	children: ReactNode;
	/** Opened on top of another modal: web skips the second scrim so the backdrop doesn't darken twice. */
	stacked?: boolean;
}

// Native presents this inside a sheet; on web it draws its own overlay, full screen below md and centred above.
export const ModalScreen = ({ children, stacked = false, ...headerProps }: ModalScreenProps) => {
	// The native header is transparent: the scroll view starts at the top of the screen so content passes under it,
	// and the subheader and toolbar scroll with the content instead of sitting above it. The side padding moves onto the
	// content so the scroll view, and the system blur at its edge, spans the full width.
	const header = <ModalHeader {...headerProps} />;

	return (
		<View className="flex-1 web:fixed web:inset-0 web:z-50 web:items-center web:justify-center">
			{/* Web only: iOS looks for the scroll view to blur through each first child, so no other view may come first. */}
			{Platform.OS === 'web' && (
				<NativePressable
					onPress={headerProps.onClose}
					accessibilityLabel="Close"
					className={twMerge(
						'hidden web:absolute web:inset-0 web:cursor-default web:md:flex',
						!stacked && 'web:bg-scrim web:backdrop-blur-md'
					)}
				/>
			)}
			<View
				className={twMerge(
					'flex-1 bg-modal-background web:w-full web:md:max-h-[85vh] web:md:max-w-2xl web:md:flex-initial web:md:rounded-3xl web:md:border web:md:border-hairline web:lg:max-w-3xl',
					!headerProps.native && 'px-4 pt-4'
				)}
			>
				{!headerProps.native && header}
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					showsVerticalScrollIndicator={false}
					contentContainerClassName={twMerge('pb-4', headerProps.native && 'px-4 pt-[14px]')}
				>
					{headerProps.native && header}
					{children}
				</ScrollView>
			</View>
		</View>
	);
};
