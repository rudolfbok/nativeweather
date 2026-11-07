import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type MediumAQIWidgetProps = {
	city: string;
	region: string;
	pollutants: { label: string; value: number; color: string }[];
	bgColor: string;
};

const MediumAQIWidget = (props: MediumAQIWidgetProps) => {
	'widget';

	return (
		<VStack spacing={0} modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity }), background(props.bgColor)]}>
			<VStack spacing={2} modifiers={[frame({ alignment: 'leading' }), padding({ all: 16 })]}>
				<HStack spacing={0} modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.city}</Text>
				</HStack>
				<HStack spacing={0} modifiers={[frame({ alignment: 'leading', maxWidth: Infinity }), padding({ bottom: 6 })]}>
					<Text modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle('#FFFFFFCC')]}>{props.region}</Text>
				</HStack>
				<HStack spacing={6} modifiers={[frame({ alignment: 'center', maxWidth: Infinity })]}>
					{props.pollutants.map((pollutant) => (
						<VStack key={pollutant.label} spacing={10} modifiers={[frame({ alignment: 'center', maxWidth: 60 })]}>
							<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>
								{pollutant.label}
							</Text>
							<Image systemName="circle.fill" size={8} color={pollutant.color} />
							<Text modifiers={[font({ size: 18, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
								{pollutant.value}
							</Text>
						</VStack>
					))}
				</HStack>
			</VStack>
		</VStack>
	);
};

export default createWidget('MediumAQI', MediumAQIWidget);
