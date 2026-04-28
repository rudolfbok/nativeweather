import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, resizable } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type SmallLocalWidgetProps = {
	temp: string;
	imagePath: any;
	bgColor: string;
	minTemperature: string;
	maxTemperature: string;
	location: string;
};

const SmallLocalWidget = (props: SmallLocalWidgetProps) => {
	'widget';

	return (
		<HStack
			modifiers={[
				frame({ alignment: 'center', maxWidth: Infinity, maxHeight: Infinity }),
				background(`${props.bgColor}`),
			]}
		>
			<VStack modifiers={[frame({ maxWidth: Infinity })]}>
				<HStack modifiers={[frame({ maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.location}</Text>
				</HStack>
				<Image uiImage={props.imagePath} modifiers={[resizable(), frame({ width: 70, height: 70 })]} />
				<Text modifiers={[font({ size: 22, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.temp}</Text>
				<HStack spacing={4} modifiers={[frame({ maxWidth: Infinity })]}>
					<HStack>
						<Image systemName="arrow.down" size={14} color="white" />
						<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
							{props.minTemperature}
						</Text>
					</HStack>
					<HStack>
						<Image systemName="arrow.up" size={14} color="white" />
						<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
							{props.maxTemperature}
						</Text>
					</HStack>
				</HStack>
			</VStack>
		</HStack>
	);
};

const SmallLocal = createWidget('SmallLocal', SmallLocalWidget);

export default SmallLocal;
