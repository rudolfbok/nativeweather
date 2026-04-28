import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, resizable } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type SmallAQIWidgetProps = {
	AQI: number;
	bgColor: string;
};

const SmallAQIWidget = (props: SmallAQIWidgetProps) => {
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
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>Air Quality</Text>
				</HStack>
				<HStack modifiers={[frame({ maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.AQI}</Text>
				</HStack>
			</VStack>
		</HStack>
	);
};

const SmallAQI = createWidget('SmallAQI', SmallAQIWidget);

export default SmallAQI;
