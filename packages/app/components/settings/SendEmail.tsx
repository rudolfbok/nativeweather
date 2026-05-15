import emailjs from '@emailjs/react-native';
import { useTranslate } from '@tolgee/react';
import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { showToast } from '../../utils/services/showToast';

export const SendEmail = () => {
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

	const TypeButton = ({ variant, text }: { variant: string; text: string }) => {
		return (
			<StyledPressable
				onPress={() => setType(variant)}
				className={clsx(
					'items-center rounded-3xl border border-transparent px-4 py-2 max-md:flex-1',
					type === variant && '!border-primaryblue'
				)}
			>
				<StyledText type="subtitle">{text}</StyledText>
			</StyledPressable>
		);
	};

	return (
		<View className={clsx('w-full gap-4 pb-4 md:w-1/2 lg:w-[40%]')}>
			<View className={clsx('gap-2')}>
				<StyledText type="subtitle">{t('feedback.type')}</StyledText>
				<View className={clsx('flex-row items-center gap-4 max-md:justify-center')}>
					<TypeButton variant="Bug" text={t('feedback.bug')} />
					<TypeButton variant="Feature" text={t('feedback.feature')} />
					<TypeButton variant="Feedback" text={t('feedback.feedback')} />
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
				<StyledButton onPress={handleSubmit} loading={loading}>
					{loading ? t('feedback.sending') : t('feedback.button')}
				</StyledButton>
			</View>
		</View>
	);
};
