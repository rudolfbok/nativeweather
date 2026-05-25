'use client';

import emailjs from '@emailjs/react-native';
import { useTranslate } from '@tolgee/react';
import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { ArrowRight, Bug, Cog, MessageCircle } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { showToast } from '../../utils/services/showToast';

export const FeedbackFeature = () => {
	const { t } = useTranslate('settings');
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleSubmit = async () => {
		if (loading) return;
		if (message.trim().length === 0 || type === null) {
			return showToast({ message: t('feedback.toast.error'), preset: 'error' });
		} /// CHECK THIS OUT
		setLoading(true);

		try {
			await emailjs.send(
				'service_vokedf9',
				'template_tix3tiv',
				{
					type: type || '',
					message: message || '',
					subject: `${type}: NativeWeather Contact Form`,
					email: 'nativeweather@post.cz',
				},
				{
					publicKey: 'user_FbIPjF3fksfbG7UWYkWfg',
				}
			);
			setType('');
			setMessage('');
			showToast({ message: t('feedback.toast.sent'), preset: 'done' });
		} catch (err) {
			console.error('Email failed', err);
			showToast({ message: t('feedback.toast.error'), preset: 'error' });
		}

		setLoading(false);
	};

	const TypeButton = ({ variant, text, icon }: { variant: string; text: string; icon: ReactNode }) => {
		return (
			<StyledPressable
				onPress={() => setType(variant)}
				className={clsx(
					'flex-row items-center justify-center gap-2 rounded-3xl border border-transparent p-3 max-md:flex-1',
					type === variant && '!border-primaryblue'
				)}
			>
				{icon}
				<StyledText type="subtitle">{text}</StyledText>
			</StyledPressable>
		);
	};

	return (
		<View className={clsx('gap-4 md:items-center')}>
			<View className={clsx('flex items-center gap-2 p-4 md:w-1/2 lg:w-[40%]')}>
				<View className={clsx('bg-primaryblue rounded-xl p-2')}>
					<MessageCircle size={40} color="white" />
				</View>
				<StyledText type="maintitle" className={clsx('text-center')}>
					{t('feedback.title')}
				</StyledText>
				<StyledText type="body" className={clsx('text-center')}>
					{t('feedback.text')}
				</StyledText>
			</View>
			<View className={clsx('w-full gap-4 pb-4 md:w-1/2 lg:w-[40%]')}>
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('feedback.type')}</StyledText>
					<View className={clsx('flex-row items-center gap-4 max-md:justify-center')}>
						<TypeButton icon={<Bug color="#007AFF" />} variant="Bug" text={t('feedback.bug')} />
						<TypeButton icon={<Cog color="#007AFF" />} variant="Feature" text={t('feedback.feature')} />
						<TypeButton icon={<MessageCircle color="#007AFF" />} variant="Feedback" text={t('feedback.feedback')} />
					</View>
				</View>
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('feedback.message')}</StyledText>
					<TextInput
						placeholder={t('feedback.placeholder')}
						value={message}
						onChangeText={setMessage}
						multiline={true}
						textAlignVertical="top"
						placeholderTextColor="#8E8E93"
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						className={clsx(
							'bg-systemBackground dark:bg-secondarySystemBackground_dark label dark:text-label_dark h-[200px] rounded-3xl border border-transparent p-4 text-base outline-none'
						)}
					/>
				</View>
				<View className={clsx('w-full items-center justify-center')}>
					<StyledButton
						onPress={handleSubmit}
						text={loading ? t('feedback.sending') : t('feedback.button')}
						icon={loading ? <ActivityIndicator size="small" color="#007AFF" /> : <ArrowRight color="#007AFF" />}
					/>
				</View>
			</View>
		</View>
	);
};
