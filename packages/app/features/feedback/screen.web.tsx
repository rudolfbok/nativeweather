'use client';

import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SendEmail } from 'app/components/settings/SendEmail';
import { clsx } from 'clsx';
import { MessageCircle } from 'lucide-react-native';
import { View } from 'react-native';

export const FeedbackFeature = () => {
	const { t } = useTranslate('settings');
	return (
		<View className={clsx('md:items-center')}>
			<View className={clsx('flex items-center gap-2 md:w-3/4 lg:w-1/2')}>
				<View className={clsx('bg-primaryblue rounded-xl p-2')}>
					<MessageCircle size={40} color="white" />
				</View>
				<StyledText type="maintitle" className={clsx('text-center')}>
					{t('feedback.title')}
				</StyledText>
				<StyledText type="body" className={clsx('text-center')}>
					{t('feedback.text')}
				</StyledText>
				<SendEmail />
			</View>
		</View>
	);
};
