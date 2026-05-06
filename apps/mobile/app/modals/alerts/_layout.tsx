import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CircleAlert } from 'lucide-react-native';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { clsx } from 'clsx';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBackground, textColor } = useThemeColors();

	const ModalHeader = ({ icon, title }: { icon: ReactNode; title: string }) => {
		return (
			<View className={clsx('flex-row items-center gap-2')}>
				{icon}
				<StyledText type="title">{title}</StyledText>
			</View>
		);
	};

	return (
		<Stack
			nativeContainerStyle={{ backgroundColor: modalBackground }}
			screenOptions={{
				headerTransparent: true,
				contentStyle: {
					backgroundColor: modalBackground,
				},
				headerTitleStyle: {
					color: textColor,
				},
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: () => <ModalHeader icon={<CircleAlert color="#007AFF" />} title={t('alerts.modaltitle')} />,
				}}
			/>
			<Stack.Screen
				name="detail"
				options={{
					headerTitle: 'detail',
				}}
			/>
		</Stack>
	);
}
