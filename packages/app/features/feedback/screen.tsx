'use client';

import emailjs from '@emailjs/react-native';
import { useTranslate } from '@tolgee/react';
import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { Bug, CircleQuestionMark, Cog, MessageCircle, SendHorizonal } from 'lucide-react-native';
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
		}
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

	const TypeButton = ({
		variant,
		text,
		icon,
	}: {
		variant: string;
		text: string;
		icon: (color: string) => ReactNode;
	}) => {
		const isSelected = type === variant;

		return (
			<StyledPressable
				onPress={() => setType(variant)}
				className={clsx(
					'min-h-12 flex-1 basis-[120px] flex-row items-center justify-between gap-2 rounded-3xl px-4 py-3',
					isSelected && '!bg-primaryblue'
				)}
			>
				<View>{icon(isSelected ? 'white' : '#007AFF')}</View>
				<View className="flex-grow items-center">
					<StyledText type="subtitle" className={clsx('text-center', isSelected && '!text-white dark:!text-white')}>
						{text}
					</StyledText>
				</View>
			</StyledPressable>
		);
	};

	return (
		<View className={clsx('items-center pb-4')}>
			<View className="gap-4 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
				<View className={clsx('ios:hidden flex w-full gap-2')}>
					<StyledText type="maintitle">{t('feedback.title')}</StyledText>
					<StyledText type="body">{t('feedback.text')}</StyledText>
				</View>
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('feedback.type')}</StyledText>
					<View className={clsx('flex-row flex-wrap gap-4')}>
						<View className="w-full flex-row gap-4">
							<TypeButton icon={(color) => <Bug color={color} />} variant="Bug" text={t('feedback.bug')} />
							<TypeButton icon={(color) => <Cog color={color} />} variant="Feature" text={t('feedback.feature')} />
						</View>
						<View className="w-full flex-row gap-4">
							<TypeButton
								icon={(color) => <MessageCircle color={color} />}
								variant="Feedback"
								text={t('feedback.feedback')}
							/>
							<TypeButton
								icon={(color) => <CircleQuestionMark color={color} />}
								variant="Question"
								text={t('feedback.question')}
							/>
						</View>
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
						text={loading ? t('feedback.button.sending') : t('feedback.button.send')}
						// icon={loading ? <ActivityIndicator size="small" color="#007AFF" /> : <SendHorizonal color="#007AFF" />}
					/>
				</View>
			</View>
		</View>
	);
};
