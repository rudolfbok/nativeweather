import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import { Platform, Pressable as NativePressable, ScrollView, View } from 'react-native';
import { clsx } from 'clsx';
import { HeaderTitle } from './HeaderTitle';
import { ModalHeader } from './ModalHeader';
import type { ModalHeaderProps } from './ModalHeader';

// Panel width from md up; a modal that needs more room (a map) adds its own size here.
const sizeClasses = {
	default: 'web:md:max-w-2xl web:lg:max-w-3xl',
	narrow: 'web:md:max-w-md web:lg:max-w-lg',
	medium: 'web:md:max-w-xl web:lg:max-w-2xl',
	wide: 'web:md:max-w-5xl',
};

interface ModalScreenProps extends Omit<ModalHeaderProps, 'native'> {
	children: ReactNode;
	/** Opened on top of another modal: web skips the second scrim so the backdrop doesn't darken twice. */
	stacked?: boolean;
	size?: keyof typeof sizeClasses;
}

// iOS gets the system navigation bar: its title, a native back button when pushed on another modal, and a native
// close button. Other platforms draw the same controls themselves in ModalHeader. Native presents this inside a
// sheet; on web it draws its own overlay, full screen below md and centred above.
export const ModalScreen = ({ children, stacked = false, size = 'default', ...headerProps }: ModalScreenProps) => {
	const native = Platform.OS === 'ios';
	const { header: title, icon, onClose } = headerProps;
	// The native header is transparent: the scroll view starts at the top of the screen so content passes under it,
	// and the subheader and toolbar scroll with the content instead of sitting above it. The side padding moves onto the
	// content so the scroll view, and the system blur at its edge, spans the full width.
	const header = <ModalHeader {...headerProps} native={native} />;

	return (
		<>
			{native && (
				<>
					<Stack.Screen
						options={{
							headerShown: true,
							title,
							// The system title can't show an icon.
							headerTitle: icon ? () => <HeaderTitle icon={icon}>{title}</HeaderTitle> : undefined,
							headerBackButtonDisplayMode: 'minimal',
							// Content scrolls under the bar, and the system blurs the edge where it passes beneath.
							headerTransparent: true,
							headerShadowVisible: false,
							scrollEdgeEffects: { top: 'soft' },
						}}
					/>
					<Stack.Toolbar placement="right">
						<Stack.Toolbar.Button icon="xmark" accessibilityLabel="Close" onPress={onClose} />
					</Stack.Toolbar>
				</>
			)}
			<View className="flex-1 web:fixed web:inset-0 web:z-60 web:items-center web:justify-center">
				{/* Web only: iOS looks for the scroll view to blur through each first child, so no other view may come first. */}
				{Platform.OS === 'web' && (
					<NativePressable
						onPress={onClose}
						accessibilityLabel="Close"
						className={clsx(
							'hidden web:absolute web:inset-0 web:cursor-default web:md:flex',
							!stacked && 'web:bg-scrim web:backdrop-blur-md'
						)}
					/>
				)}
				<View
					className={clsx(
						'flex-1 bg-modal-background web:w-full web:md:max-h-[85vh] web:md:flex-initial web:md:rounded-3xl web:md:border web:md:border-hairline',
						sizeClasses[size],
						!native && 'px-4 pt-4'
					)}
				>
					{!native && header}
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						showsVerticalScrollIndicator={false}
						className="web:overscroll-contain"
						contentContainerClassName={clsx('pb-4', native && 'px-4 pt-[14px]')}
					>
						{native && header}
						{children}
					</ScrollView>
				</View>
			</View>
		</>
	);
};
