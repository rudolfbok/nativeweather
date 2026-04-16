import { Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

const MediumWidget = () => {
	'widget';
	return (
		<VStack>
			<Text modifiers={[font({ weight: 'bold', size: 16 }), foregroundStyle('#000000')]}>Example Widget Text</Text>
		</VStack>
	);
};

export default createWidget('NativeWeatherLocalWidget', MediumWidget);
