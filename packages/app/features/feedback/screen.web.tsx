'use client';

import { useTranslate } from '@tolgee/react';
import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledText } from 'app/components/common/styled/StyledText';
import { MessageCircle } from 'lucide-react-native';
import { View } from 'react-native';

export const FeedbackFeature = () => {
	const { t } = useTranslate('settings');

	return (
		<View className="flex items-center gap-2">
			<View className="bg-primaryblue rounded-xl p-2">
				<MessageCircle size={40} color="white" />
			</View>
			<StyledText type="maintitle" className="text-center">
				{t('feedback.title')}
			</StyledText>
			<StyledText type="body" className="text-center">
				{t('feedback.text')}
			</StyledText>
			<StyledButton onPress={() => console.log('Sending feedback!')} className="mt-4">
				{t('feedback.button')}
			</StyledButton>
		</View>
	);
};
