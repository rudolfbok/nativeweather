import type { ReactNode } from 'react';
import { Pressable as NativePressable, ScrollView, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { ModalHeader } from './ModalHeader';
import type { ModalHeaderProps } from './ModalHeader';

interface ModalScreenProps extends ModalHeaderProps {
	children: ReactNode;
	/** Opened on top of another modal: web skips the second scrim so the backdrop doesn't darken twice. */
	stacked?: boolean;
}

// Native presents this inside a sheet; on web it draws its own overlay, full screen below md and centred above.
export const ModalScreen = ({ children, stacked = false, ...headerProps }: ModalScreenProps) => (
	<View className="flex-1 web:fixed web:inset-0 web:z-50 web:items-center web:justify-center">
		<NativePressable
			onPress={headerProps.onClose}
			accessibilityLabel="Close"
			className={twMerge(
				'hidden web:absolute web:inset-0 web:cursor-default web:md:flex',
				!stacked && 'web:bg-scrim web:backdrop-blur-md'
			)}
		/>
		<View className="flex-1 bg-modal-background px-4 pt-4 web:w-full web:md:max-h-[85vh] web:md:max-w-2xl web:md:flex-initial web:md:rounded-3xl web:md:border web:md:border-hairline web:lg:max-w-3xl">
			<ModalHeader {...headerProps} />
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
				contentContainerClassName="pb-4"
			>
				{children}
			</ScrollView>
		</View>
	</View>
);
