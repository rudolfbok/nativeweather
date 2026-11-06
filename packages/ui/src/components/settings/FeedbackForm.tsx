import { sendFeedback } from '@nativeweather/api';
import type { FeedbackType } from '@nativeweather/api';
import { useTranslate } from '@tolgee/react';
import { Bug, Check, ChevronDown, CircleQuestionMark, Cog, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Button } from '../common/Button';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { showToast } from '../common/Toaster';

const CheckIcon = withUniwind(Check);
const ChevronDownIcon = withUniwind(ChevronDown);

const feedbackTypes = {
	bug: withUniwind(Bug),
	feature: withUniwind(Cog),
	message: withUniwind(MessageCircle),
	question: withUniwind(CircleQuestionMark),
};

const typeIcon = (type: FeedbackType) => {
	const Icon = feedbackTypes[type];

	return <Icon colorClassName="accent-primary-blue" />;
};

export const FeedbackForm = () => {
	const { t } = useTranslate('settings');
	const [open, setOpen] = useState(false);
	const [type, setType] = useState<FeedbackType | null>(null);
	const [message, setMessage] = useState('');
	const [sending, setSending] = useState(false);

	const submit = async () => {
		if (sending) return;
		Keyboard.dismiss();
		if (!type || message.trim().length === 0) {
			showToast({ message: t('feedback.toast.error'), type: 'error' });
			return;
		}
		setSending(true);
		const sent = await sendFeedback(type, message);
		setSending(false);
		if (sent) {
			setType(null);
			setMessage('');
		}
		showToast({ message: t(sent ? 'feedback.toast.sent' : 'feedback.toast.error'), type: sent ? 'done' : 'error' });
	};

	return (
		<View className="gap-4">
			<RoundView>
				<Pressable
					onPress={() => setOpen((isOpen) => !isOpen)}
					accessibilityRole="button"
					className="flex-row items-center justify-between gap-2 p-4"
				>
					<View className="flex-row items-center gap-3">
						{type && typeIcon(type)}
						<Text type="body" className="font-semibold">
							{type ? t(`feedback.${type}`) : t('feedback.select')}
						</Text>
					</View>
					<ChevronDownIcon colorClassName="accent-label" />
				</Pressable>
				{open &&
					(Object.keys(feedbackTypes) as FeedbackType[]).map((variant) => (
						<Pressable
							key={variant}
							accessibilityRole="button"
							onPress={() => {
								setType(variant);
								setOpen(false);
							}}
							className="flex-row items-center gap-4 p-4"
						>
							<View className="h-6 w-6 items-center justify-center">{typeIcon(variant)}</View>
							<View className="flex-1">
								<Text type="body">{t(`feedback.${variant}`)}</Text>
							</View>
							<View className="h-6 w-6 items-center justify-center">
								{type === variant && <CheckIcon colorClassName="accent-label" size={20} />}
							</View>
						</Pressable>
					))}
			</RoundView>
			<View className="gap-3">
				<Text type="sectiontitle">{t('feedback.message')}</Text>
				<TextInput
					value={message}
					onChangeText={setMessage}
					placeholder={t('feedback.placeholder')}
					placeholderTextColorClassName="accent-secondary-label"
					multiline
					textAlignVertical="top"
					className="h-[200px] rounded-3xl border border-hairline bg-card-background p-4 text-base text-label outline-none"
				/>
			</View>
			<Button onPress={() => void submit()} loading={sending}>
				{t('feedback.button.send')}
			</Button>
		</View>
	);
};
