import { HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, padding, resizable } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

type WeatherWidgetProps = {
	city: string;
	region: string;
	temperature: string;
	condition: string;
	isDay: 0 | 1;
	code: number;
	currentSource: string;
	bgColor: string;
	imagePath: any;
};

const WeatherWidget = (props: WeatherWidgetProps, environment: WidgetEnvironment) => {
	'widget';

	return (
		<VStack
			modifiers={[
				frame({ width: 340, height: 1000 }),
				background(props.bgColor),
				padding({ leading: 16, trailing: 16 }),
			]}
		>
			<HStack modifiers={[frame({ maxWidth: Infinity })]}>
				<VStack modifiers={[frame({ alignment: 'leading', width: 150 })]}>
					<HStack modifiers={[frame({ alignment: 'leading', width: 150 })]}>
						<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.city}</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', width: 150 })]}>
						<Text modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle('#C3C3CB')]}>{props.region}</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', width: 150 }), padding({ top: 2, bottom: 2 })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
							{props.temperature}
						</Text>
					</HStack>
					<HStack modifiers={[frame({ alignment: 'leading', width: 150 })]}>
						<Text modifiers={[font({ size: 16, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.condition}</Text>
					</HStack>
				</VStack>
				<Spacer />
				<Image uiImage={props.imagePath} modifiers={[resizable(), frame({ width: 90, height: 90 })]} />
			</HStack>
		</VStack>
	);
};

const NativeWeatherLocalWidget = createWidget('NativeWeatherLocalWidget', WeatherWidget);

export default NativeWeatherLocalWidget;
