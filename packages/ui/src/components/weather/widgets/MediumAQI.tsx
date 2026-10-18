import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, font, foregroundStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

type MediumAQIWidgetProps = {
	NO2: number;
	PM25: number;
	PM10: number;
	O3: number;
	NO2Indicator: string;
	O3Indicator: string;
	PM10Indicator: string;
	PM25Indicator: string;
	city: string;
	region: string;
	bgColor: string;
};

const MediumAQIWidget = (props: MediumAQIWidgetProps) => {
	'widget';

	return (
		<VStack
			spacing={0}
			modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity }), background(`${props.bgColor}`)]}
		>
			<VStack spacing={2} modifiers={[frame({ alignment: 'leading' }), padding({ all: 16 })]}>
				<HStack spacing={0} modifiers={[frame({ alignment: 'leading', maxWidth: Infinity })]}>
					<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{props.city}</Text>
				</HStack>
				<HStack spacing={0} modifiers={[frame({ alignment: 'leading', maxWidth: Infinity }), padding({ bottom: 6 })]}>
					<Text modifiers={[font({ size: 14, weight: 'bold' }), foregroundStyle('##FFFFFFCC')]}>{props.region}</Text>
				</HStack>
				<HStack spacing={6} modifiers={[frame({ alignment: 'center', maxWidth: Infinity })]}>
					<VStack spacing={10} modifiers={[frame({ alignment: 'center', maxWidth: 60 })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>PM2.5</Text>
						<Image systemName="circle.fill" size={8} color={props.PM25Indicator} />
						<Text modifiers={[font({ size: 18, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.PM25}</Text>
					</VStack>
					<VStack spacing={10} modifiers={[frame({ alignment: 'center', maxWidth: 60 })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>PM10</Text>
						<Image systemName="circle.fill" size={8} color={props.PM10Indicator} />
						<Text modifiers={[font({ size: 18, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.PM10}</Text>
					</VStack>
					<VStack spacing={10} modifiers={[frame({ alignment: 'center', maxWidth: 60 })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>O3</Text>
						<Image systemName="circle.fill" size={8} color={props.O3Indicator} />
						<Text modifiers={[font({ size: 18, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.O3}</Text>
					</VStack>
					<VStack spacing={10} modifiers={[frame({ alignment: 'center', maxWidth: 60 })]}>
						<Text modifiers={[font({ size: 18, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>NO2</Text>
						<Image systemName="circle.fill" size={8} color={props.NO2Indicator} />
						<Text modifiers={[font({ size: 18, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>{props.NO2}</Text>
					</VStack>
				</HStack>
			</VStack>
		</VStack>
	);
};

const MediumAQI = createWidget('MediumAQI', MediumAQIWidget);

export default MediumAQI;
