import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { Linking, Pressable, View } from 'react-native';

export const LegalLinks = () => {
	const { t } = useTranslate('settings');

	return (
		<View className="flex-row items-center justify-center">
			<Pressable
				onPress={() => Linking.openURL('https://nativeweather.pages.dev/policy')}
				className="px-1 py-1 active:bg-transparent"
			>
				<StyledText
					type="caption"
					className="active:text-secondaryLabel dark:active:text-secondaryLabel_dark web:hover:underline"
				>
					{t('privacyPolicy')}
				</StyledText>
			</Pressable>
			<StyledText type="caption"> · </StyledText>
			<Pressable
				onPress={() => Linking.openURL('https://nativeweather.pages.dev/tos')}
				className="px-1 py-1 active:bg-transparent"
			>
				<StyledText
					type="caption"
					className="active:text-secondaryLabel dark:active:text-secondaryLabel_dark web:hover:underline"
				>
					{t('termsOfService')}
				</StyledText>
			</Pressable>
		</View>
	);
};
