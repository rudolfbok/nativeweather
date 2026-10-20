'use client';

import { StyledButton } from '../../components/common/styled/StyledButton';
import { StyledPressable } from '../../components/common/styled/StyledPressable';
import { StyledText } from '../../components/common/styled/StyledText';
import { border } from '../../constants/border';
import { useThemeColors } from '../../hooks/theme/useThemeColors';
import { showToast } from '../../utils/notifications/showToast';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Bug, Check, ChevronDown, CircleQuestionMark, Cog, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

export const FeedbackFeature = () => {
	const { t } = useTranslate('settings');
	const { text } = useThemeColors();
	const [open, setOpen] = useState(false);
	const [type, setType] = useState<'' | 'bug' | 'feature' | 'message' | 'question'>('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const selectedIcon = {
		bug: <Bug color="#007AFF" />,
		feature: <Cog color="#007AFF" />,
		message: <MessageCircle color="#007AFF" />,
		question: <CircleQuestionMark color="#007AFF" />,
	};

	const handleSubmit = async () => {
		if (loading) return;
		if (message.trim().length === 0 || type.length === 0) {
			showToast({ message: t('feedback.toast.error'), preset: 'error' });
			return;
		}
		setLoading(true);

		try {
			const response = await fetch('https://nativeweather-email.bitwebs.workers.dev', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type, message }),
			});

			if (!response.ok) throw new Error(`Feedback API returned ${response.status}`);
			setType('');
			setMessage('');
			showToast({ message: t('feedback.toast.sent'), preset: 'done' });
		} catch (err) {
			console.error('Email failed', err);
			showToast({ message: t('feedback.toast.error'), preset: 'error' });
		}

		setLoading(false);
	};

	return (
		<View className={clsx('items-center pb-4')}>
			<View className={clsx('w-full flex-1 gap-4')}>
				<View>
					<View className={clsx('gap-3')}>
						{/* <StyledText type="sectiontitle">{t('feedback.type')}</StyledText> */}
						<View
							className={clsx(
								'w-full overflow-hidden rounded-3xl bg-systemBackground dark:bg-secondarySystemBackground_dark',
								border
							)}
						>
							<StyledPressable
								onPress={() => setOpen((prev) => !prev)}
								className={clsx(
									'flex-row items-center justify-between gap-2 p-4',
									!open && 'border-transparent',
									open && 'rounded-b-none'
								)}
							>
								<View className="flex-row items-center gap-3">
									{type ? selectedIcon[type] : null}
									<StyledText type="body" className="font-semibold">
										{type ? t(`feedback.${type}`) : t('feedback.select')}
									</StyledText>
								</View>
								<ChevronDown color={text} />
							</StyledPressable>
							{open && (
								<View>
									{(['bug', 'feature', 'message', 'question'] as const).map((variant) => (
										<StyledPressable
											key={variant}
											onPress={() => {
												setType(variant);
												setOpen(false);
											}}
											className={clsx('flex-row items-center gap-4 p-4')}
										>
											<View className="h-6 w-6 items-center justify-center">
												{variant === 'bug' ? (
													<Bug color="#007AFF" />
												) : variant === 'feature' ? (
													<Cog color="#007AFF" />
												) : variant === 'message' ? (
													<MessageCircle color="#007AFF" />
												) : (
													<CircleQuestionMark color="#007AFF" />
												)}
											</View>
											<View className="flex-1">
												<StyledText type="body">{t(`feedback.${variant}`)}</StyledText>
											</View>
											<View className="h-6 w-6 items-center justify-center">
												{type === variant && <Check color={text} size={20} />}
											</View>
										</StyledPressable>
									))}
								</View>
							)}
						</View>
					</View>
					<View className={clsx('mt-4 gap-3')}>
						<StyledText type="sectiontitle">{t('feedback.message')}</StyledText>
						<TextInput
							//@ts-expect-error
							enableFocusRing={false}
							placeholder={t('feedback.placeholder')}
							value={message}
							onChangeText={setMessage}
							multiline={true}
							textAlignVertical="top"
							placeholderTextColor="#8E8E93"
							className={clsx(
								'label h-[200px] rounded-3xl bg-systemBackground p-4 text-base outline-none dark:bg-secondarySystemBackground_dark dark:text-label_dark',
								border
							)}
						/>
					</View>
					<View className="mt-4">
						<StyledButton
							onPress={handleSubmit}
							text={loading ? t('feedback.button.sending') : t('feedback.button.send')}

							// icon={loading ? <ActivityIndicator size="small" color={text} /> : <SendHorizonal color={text} />}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};
