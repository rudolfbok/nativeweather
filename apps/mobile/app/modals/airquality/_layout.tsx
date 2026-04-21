import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { AirQualityIcon } from 'app/components/icons/AirQualityIcon';
import { useThemeColors } from 'app/hooks/useThemeColors';
import clsx from 'clsx';
import { router, Stack } from 'expo-router';
import { X } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export default function ModalsLayout() {
	const { t } = useTranslate('weather');
	const { bodyBackground, textColor } = useThemeColors();

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
			nativeContainerStyle={{ backgroundColor: bodyBackground }}
			screenOptions={{
				headerTransparent: true,
				contentStyle: {
					backgroundColor: bodyBackground,
				},
				headerTitleStyle: {
					color: textColor,
				},
				headerBackButtonMenuEnabled: true,
				headerBackButtonDisplayMode: 'minimal',
				headerRight: () => (
					<Pressable
						onPress={() => router.replace('/(tabs)/(weather)/[city]')}
						className={clsx('h-10 w-10 items-center justify-center')}
						// style={{ pointerEvents: 'none' }}
					>
						<X color={textColor} />
					</Pressable>
				),
				// headerRight: () => (
				// 	<Pressable
				// 		onPress={() => console.log('X Pressed!')}
				// 		className={clsx('bg-red-400')}
				// 		style={{
				// 			width: 35,
				// 			height: 20,
				// 			alignItems: 'center',
				// 			justifyContent: 'center',
				// 		}}
				// 		// hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // <--- VERY IMPORTANT
				// 	>
				// 		<X color={textColor} />
				// 	</Pressable>
				// ),
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: () => <ModalHeader icon={<AirQualityIcon />} title={t('airquality.title')} />,
				}}
			/>
			<Stack.Screen
				name="no2"
				options={{
					headerTitle: t('airquality.item.no2'),
				}}
			/>
			<Stack.Screen
				name="o3"
				options={{
					headerTitle: t('airquality.item.ozone'),
				}}
			/>
			<Stack.Screen
				name="pm10"
				options={{
					headerTitle: t('airquality.item.pm10'),
				}}
			/>
			<Stack.Screen
				name="pm25"
				options={{
					headerTitle: t('airquality.item.pm25'),
				}}
			/>
			<Stack.Screen
				name="usaqi"
				options={{
					headerTitle: t('airquality.item.usaqi'),
				}}
			/>
			<Stack.Screen
				name="euaqi"
				options={{
					headerTitle: t('airquality.item.euaqi'),
				}}
			/>
		</Stack>
	);
}
