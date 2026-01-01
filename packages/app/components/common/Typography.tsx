import { clsx } from 'clsx';
import { StyledText } from './StyledText';
import { View } from 'react-native';

export const Typography = () => {
	return (
		<View className={clsx('gap-2')}>
			<StyledText type="screentitle">Screen title</StyledText>
			<StyledText type="maintemp">Main temp</StyledText>
			<StyledText type="country">Country</StyledText>
			<StyledText type="city">City</StyledText>
			<StyledText type="title">Title</StyledText>
			<StyledText type="data">Data</StyledText>
			<StyledText type="subtitle">Subtitle</StyledText>
			<StyledText type="subtitle">Modal subtitle</StyledText>
			<StyledText type="body">Body</StyledText>
			<StyledText type="bodysecondary">Body secondary</StyledText>
			<StyledText type="rainchance">Rain chance</StyledText>
			<StyledText type="localtime">Local time</StyledText>
		</View>
	);
};
