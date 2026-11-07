import { HStack, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type SmallAQIWidgetProps = {
	aqi: number;
	label: string;
	bgColor: string;
};

const SmallAQIWidget = (props: SmallAQIWidgetProps) => {
	'widget';

	return (
		<HStack
			spacing={0}
			modifiers={[frame({ alignment: 'center', maxWidth: Infinity, maxHeight: Infinity }), background(props.bgColor)]}
		>
			<VStack spacing={0} modifiers={[frame({ maxWidth: Infinity })]}>
				<HStack spacing={0} modifiers={[frame({ maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.label}</Text>
				</HStack>
				<HStack spacing={0} modifiers={[frame({ maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 16, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.aqi}</Text>
				</HStack>
			</VStack>
		</HStack>
	);
};

export default createWidget('SmallAQI', SmallAQIWidget);
