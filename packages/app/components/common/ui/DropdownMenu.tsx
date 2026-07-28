import { ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyledText } from '../styled/StyledText';
import { Bug, ChevronDown, ChevronRight, CircleQuestionMark, Cog, MessageCircle } from 'lucide-react-native';

const DropdownItem = ({ icon, title }: { icon: ReactNode; title: string }) => {
	return (
		<Pressable className="flex-row items-center gap-4">
			{icon}
			<View className="flex-1 items-center">
				<StyledText type="body">{title}</StyledText>
			</View>
		</Pressable>
	);
};

export const DropdownMenu = () => {
	const [open, setOpen] = useState(false);
	return (
		<View className="dark:bg-secondarySystemBackground_dark w-fit rounded-3xl p-4">
			<Pressable onPress={() => setOpen((prev) => !prev)} className="flex-row items-center gap-2">
				<StyledText type="body" className="font-semibold">
					Select message type
				</StyledText>
				{open ? <ChevronDown color="#007AFF" /> : <ChevronRight color="#007AFF" />}
			</Pressable>

			{open && (
				<View className="gap-4 pt-4">
					<DropdownItem icon={<Bug />} title="Bug" />
					<DropdownItem icon={<Cog />} title="Settings" />
					<DropdownItem icon={<MessageCircle />} title="Message" />
					<DropdownItem icon={<CircleQuestionMark />} title="Question" />
				</View>
			)}
		</View>
	);
};
