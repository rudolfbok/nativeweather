import { HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
	background,
	font,
	foregroundStyle,
	frame,
	glassEffect,
	gridColumnAlignment,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';
import { WeatherIcon } from '../WeatherIcon';

type WeatherWidgetProps = {
	city: string;
	region: string;
	temperature: string;
	condition: string;
	isDay: 0 | 1;
	code: number;
	currentSource: string;
	bgColor: string;
};

const WeatherWidget = (props: WeatherWidgetProps, environment: WidgetEnvironment) => {
	'widget';
	const textColor = environment.colorScheme === 'dark' ? '#FFFFFF' : '#000000';
	const regionTextColor = environment.colorScheme === 'dark' ? '#A9A9B0' : '#6D6D72';
	// const { localWeatherData } = useLocalWeather();

	return (
		<VStack modifiers={[frame({ width: 1000, height: 1000 }), background(props.bgColor)]}>
			<HStack>
				<VStack>
					<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle(textColor)]}>{props.city}</Text>

					<Text modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle(regionTextColor)]}>{props.region}</Text>

					<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle(textColor)]}>{props.temperature}</Text>

					<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle(textColor)]}>{props.condition}</Text>
				</VStack>
				{/* <WeatherIcon
					isDay={props.isDay}
					code={props.code}
					width={120}
					height={120}
					strokeWidth={0.5}
					source={props.currentSource}
				/> */}
			</HStack>
		</VStack>
	);
};

const NativeWeatherLocalWidget = createWidget('NativeWeatherLocalWidget', WeatherWidget);

export default NativeWeatherLocalWidget;

// NativeWeatherLocalWidget.updateSnapshot({
// 	city: 'New York',
// 	region: 'New York, New York City',
// 	temperature: 80,
// 	condition: 'Partly cloudy',
// });
