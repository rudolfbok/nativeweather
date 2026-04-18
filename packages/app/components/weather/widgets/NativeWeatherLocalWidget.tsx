import { HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, padding, resizable } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type WeatherWidgetProps = {
	city: string;
	region: string;
	temperature: string;
	minTemperature: string;
	maxTemperature: string;
	feelsLikeTemperature: string;
	condition: string;
	isDay: 0 | 1;
	code: number;
	currentSource: string;
	bgColor: string;
	imagePath: any;
};

const WeatherWidget = (props: WeatherWidgetProps) => {
	'widget';

	return (
		<VStack modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity }), background(`${props.bgColor}`)]}>
			<HStack modifiers={[frame({ maxWidth: Infinity }), padding({ all: 16 })]}>
				<VStack modifiers={[frame({ alignment: 'leading' }), padding({ top: 8, bottom: 8 })]}>
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.city}</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Text modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle('#C3C3CB')]}>{props.region}</Text>
					</HStack>
					<Spacer />
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
							{props.temperature}
						</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
							Feels like: {props.feelsLikeTemperature}
						</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Image systemName="arrow.down" size={14} />
						<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
							{props.minTemperature}
						</Text>
						<Image systemName="arrow.up" size={14} />
						<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
							{props.maxTemperature}
						</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
						<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.condition}</Text>
					</HStack>
				</VStack>
				<Spacer />
				<Image uiImage={props.imagePath} modifiers={[resizable(), frame({ width: 85, height: 85 })]} />
			</HStack>
		</VStack>
	);
};

const NativeWeatherLocalWidget = createWidget('NativeWeatherLocalWidget', WeatherWidget);

export default NativeWeatherLocalWidget;
