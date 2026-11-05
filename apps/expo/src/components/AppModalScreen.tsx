import { HeaderTitle, ModalScreen } from '@nativeweather/ui';
import { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

type AppModalScreenProps = Omit<ComponentProps<typeof ModalScreen>, 'native'>;

// iOS gets the system navigation bar: its title, a native back button when pushed on another modal, and a native
// close button. Other platforms draw the same controls themselves in ModalHeader.
export const AppModalScreen = ({ header, icon, onBack, onClose, ...props }: AppModalScreenProps) => {
	const native = Platform.OS === 'ios';

	return (
		<>
			{native && (
				<>
					<Stack.Screen
						options={{
							headerShown: true,
							title: header,
							// The system title can't show an icon.
							headerTitle: icon ? () => <HeaderTitle icon={icon}>{header}</HeaderTitle> : undefined,
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
			<ModalScreen header={header} icon={icon} onBack={onBack} onClose={onClose} native={native} {...props} />
		</>
	);
};
