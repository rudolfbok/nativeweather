import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, resizable } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type SmallLocalWidgetProps = {
	location: string;
	temperature: string;
	minTemperature: string;
	maxTemperature: string;
	imagePath: string;
	bgColor: string;
};

const SmallLocalWidget = (props: SmallLocalWidgetProps) => {
	'widget';

	return (
		<HStack
			spacing={0}
			modifiers={[frame({ alignment: 'center', maxWidth: Infinity, maxHeight: Infinity }), background(props.bgColor)]}
		>
			<VStack spacing={0} modifiers={[frame({ maxWidth: Infinity })]}>
				<HStack spacing={0} modifiers={[frame({ maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.location}</Text>
				</HStack>
				<Image uiImage={props.imagePath} modifiers={[resizable(), frame({ width: 70, height: 70 })]} />
				<Text modifiers={[font({ size: 22, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
					{props.temperature}
				</Text>
				<HStack spacing={4} modifiers={[frame({ maxWidth: Infinity })]}>
					<HStack spacing={0}>
						<Image systemName="arrow.down" size={14} color="white" />
						<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
							{props.minTemperature}
						</Text>
					</HStack>
					<HStack spacing={0}>
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

export default createWidget('SmallLocal', SmallLocalWidget);
