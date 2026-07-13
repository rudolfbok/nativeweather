import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CloseIcon } from 'app/components/icons/ui/CloseIcon';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { clsx } from 'clsx';
import { Stack, useRouter } from 'expo-router';
import { BadgeAlert } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { modalBg, text } = useThemeColors();
	const router = useRouter();

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
			nativeContainerStyle={{ backgroundColor: modalBg }}
			screenOptions={{
				headerTransparent: true,
				contentStyle: {
					backgroundColor: modalBg,
				},
				headerTitleStyle: {
					color: text,
				},
				headerRight: () => (
					<Pressable onPress={() => router.back()} className={clsx('h-10 w-10 items-center justify-center')}>
						<CloseIcon />
					</Pressable>
				),
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: () => <ModalHeader icon={<BadgeAlert color="#007AFF" />} title={t('alerts.modaltitle')} />,
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
