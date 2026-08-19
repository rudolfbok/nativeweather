'use client';

import { useTranslate } from '@tolgee/react';
import { StyledButton } from 'app/components/common/styled/StyledButton';
import { StyledText } from 'app/components/common/styled/StyledText';
import { clsx } from 'clsx';
import { Bug, Check, ChevronDown, ChevronRight, CircleQuestionMark, Cog, MessageCircle } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { showToast } from 'app/utils/notifications/showToast';
import { variants } from 'app/constants/pressableVariants';

export const FeedbackFeature = () => {
	const { t } = useTranslate('settings');
	const [open, setOpen] = useState(false);
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const selectedIcon = {
		bug: <Bug color="#007AFF" />,
		feature: <Cog color="#007AFF" />,
		message: <MessageCircle color="#007AFF" />,
		question: <CircleQuestionMark color="#007AFF" />,
	};

	const handleSubmit = async () => {
		if (loading) return;
		if (message.trim().length === 0 || type.length === 0) {
			return showToast({ message: t('feedback.toast.error'), preset: 'error' });
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

	const DropdownItem = ({ icon, title, variant }: { icon: ReactNode; title: string; variant: string }) => {
		const isSelected = type === variant;
		return (
			<Pressable
				onPress={() => {
					setType(variant);
					setOpen(false);
				}}
				className={clsx('flex-row items-center gap-4 p-4', variants)}
			>
				<View className="h-6 w-6 items-center justify-center">{icon}</View>
				<View className="flex-1">
					<StyledText type="body">{title}</StyledText>
				</View>
				<View className="h-6 w-6 items-center justify-center">{isSelected && <Check color="#007AFF" size={20} />}</View>
			</Pressable>
		);
	};

	return (
		<View className={clsx('items-center pb-4')}>
			<View className="w-full gap-4 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
				<View className={clsx('ios:hidden flex w-full gap-2')}>
					<StyledText type="maintitle">{t('feedback.title')}</StyledText>
					<StyledText type="body">{t('feedback.text')}</StyledText>
				</View>
				<View className={clsx('gap-2')}>
					<StyledText type="subtitle">{t('feedback.type')}</StyledText>
					<View className="bg-systemBackground dark:bg-secondarySystemBackground_dark web:md:w-[320px] w-full overflow-hidden rounded-3xl">
						<Pressable
							onPress={() => setOpen((prev) => !prev)}
							className="hover:dark:bg-tertiarySystemBackground_dark hover:bg-tertiarySystemBackground flex-row items-center justify-between gap-2 overflow-hidden p-4"
						>
							<View className="flex-row items-center gap-3">
								{selectedIcon[type]}
								<StyledText type="body" className="font-semibold">
									{type ? t(`feedback.${type}`) : t('feedback.select')}
								</StyledText>
							</View>
							{open ? <ChevronDown color="#007AFF" /> : <ChevronRight color="#007AFF" />}
						</Pressable>
						{open && (
							<View>
								<DropdownItem icon={<Bug color="#007AFF" />} title={t('feedback.bug')} variant="bug" />
								<DropdownItem icon={<Cog color="#007AFF" />} title={t('feedback.feature')} variant="feature" />
								<DropdownItem
									icon={<MessageCircle color="#007AFF" />}
									title={t('feedback.message')}
									variant="message"
								/>
								<DropdownItem
									icon={<CircleQuestionMark color="#007AFF" />}
									title={t('feedback.question')}
									variant="question"
								/>
							</View>
						)}
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
				<View className="w-full items-start">
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
