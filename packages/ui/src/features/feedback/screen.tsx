'use client';

import { useTranslate } from '@tolgee/react';
import { StyledButton } from '@nativeweather/ui/components/common/styled/StyledButton';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { Bug, Check, ChevronDown, ChevronRight, CircleQuestionMark, Cog, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { showToast } from '@nativeweather/ui/utils/notifications/showToast';
import { border } from '@nativeweather/core/constants/border';

export const FeedbackFeature = ({ modal = false }: { modal?: boolean }) => {
	const { t } = useTranslate('settings');
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
				<View className={clsx('ios:hidden web:flex-1 flex gap-2')}>
					{!modal && (
						<StyledText type="screentitle" className="macos:hidden">
							{t('feedback.title')}
						</StyledText>
					)}
					<StyledText type="body">{t('feedback.text')}</StyledText>
				</View>
				<View>
					<View className={clsx('gap-3')}>
						<StyledText type="sectiontitle">{t('feedback.type')}</StyledText>
						<View
							className={clsx(
								'bg-secondarySystemBackground dark:bg-secondarySystemBackground_dark w-full overflow-hidden rounded-3xl',
								open && border
							)}
						>
							<Pressable
								onPress={() => setOpen((prev) => !prev)}
								className={clsx(
									'hover:dark:bg-tertiarySystemBackground_dark hover:bg-tertiarySystemBackground flex-row items-center justify-between gap-2 overflow-hidden rounded-3xl p-4',
									!open && border,
									open && '!rounded-bl-none !rounded-br-none'
								)}
								style={{ cursor: 'pointer' }}
							>
								<View className="flex-row items-center gap-3">
									{type ? selectedIcon[type] : null}
									<StyledText type="body" className="font-semibold">
										{type ? t(`feedback.${type}`) : t('feedback.select')}
									</StyledText>
								</View>
								{open ? <ChevronDown color="#007AFF" /> : <ChevronRight color="#007AFF" />}
							</Pressable>
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
											{type === variant && <Check color="#007AFF" size={20} />}
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
								'bg-secondarySystemBackground dark:bg-secondarySystemBackground_dark label dark:text-label_dark h-[200px] rounded-3xl p-4 text-base outline-none',
								border
							)}
						/>
					</View>
					<View className="mt-4">
						<StyledButton
							onPress={handleSubmit}
							text={loading ? t('feedback.button.sending') : t('feedback.button.send')}

							// icon={loading ? <ActivityIndicator size="small" color="#007AFF" /> : <SendHorizonal color="#007AFF" />}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};
