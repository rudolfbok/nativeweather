import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { useThemeColors } from 'app/hooks/useThemeColors';
import { clsx } from 'clsx';
import { router, Stack } from 'expo-router';
import { Cloud, CloudRain, Droplets, Eye, GaugeCircle, Moon, Sun, Sunrise, Sunset, Wind, X } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

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
				headerBackButtonDisplayMode: 'minimal',
				headerTransparent: true,
				headerTitleStyle: {
					color: textColor,
				},
				headerRight: () => (
					<Pressable onPress={() => router.back()} className={clsx('h-10 w-10 items-center justify-center')}>
						<X color={textColor} />
					</Pressable>
				),
			}}
		>
			<Stack.Screen
				name="humidity"
				options={{
					headerTitle: () => <ModalHeader icon={<Droplets color="#29C632" />} title={t('humidity.title')} />,
				}}
			/>
			<Stack.Screen
				name="moon"
				options={{
					headerTitle: () => <ModalHeader icon={<Moon color="#753A87" />} title={t('moon.title')} />,
				}}
			/>
			<Stack.Screen
				name="pressure"
				options={{
					headerTitle: () => <ModalHeader icon={<GaugeCircle color="#737373" />} title={t('pressure.title')} />,
				}}
			/>
			<Stack.Screen
				name="rain"
				options={{
					headerTitle: () => <ModalHeader icon={<CloudRain color="#2793FF" />} title={t('rain.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunrise"
				options={{
					headerTitle: () => <ModalHeader icon={<Sunrise color="#FFBF04" />} title={t('sunrise.title')} />,
				}}
			/>
			<Stack.Screen
				name="sunset"
				options={{
					headerTitle: () => <ModalHeader icon={<Sunset color="#F75B02" />} title={t('sunset.title')} />,
				}}
			/>
			<Stack.Screen
				name="uvindex"
				options={{
					headerTitle: () => <ModalHeader icon={<Sun color="purple" />} title="UV Index" />,
				}}
			/>
			<Stack.Screen
				name="visibility"
				options={{
					headerTitle: () => <ModalHeader icon={<Eye color="#39C1C7" />} title={t('visibility.title')} />,
				}}
			/>
			<Stack.Screen
				name="wind"
				options={{
					headerTitle: () => <ModalHeader icon={<Wind color="gray" />} title={t('wind.title')} />,
				}}
			/>
			<Stack.Screen
				name="clouds"
				options={{
					headerTitle: () => <ModalHeader icon={<Cloud color={textColor} />} title={t('cloudcover.title')} />,
				}}
			/>
			<Stack.Screen name="airquality" options={{ headerShown: false }} />
			<Stack.Screen name="alerts" options={{ headerShown: false }} />
		</Stack>
	);
}
