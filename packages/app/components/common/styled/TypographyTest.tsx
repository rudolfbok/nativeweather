import { clsx } from 'clsx';
import { StyledText } from './StyledText';
import { View } from 'react-native';

export const TypographyTest = () => {
	return (
		<View className={clsx('gap-2')}>
			<StyledText type="screentitle">Screen title</StyledText>
			<StyledText type="herotitle">Hero title</StyledText>
			<StyledText type="display">Display</StyledText>
			<StyledText type="locationmeta">Location meta</StyledText>
			<StyledText type="sectiontitle">Section title</StyledText>
			<StyledText type="title">Title</StyledText>
			<StyledText type="data">Data</StyledText>
			<StyledText type="body">Body</StyledText>
			<StyledText type="caption">Caption</StyledText>
			<StyledText type="link">Link</StyledText>
		</View>
	);
};
