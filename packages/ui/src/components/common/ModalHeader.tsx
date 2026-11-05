import { ChevronLeft, X } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { Pressable } from './Pressable';
import { Text } from './Text';

const ChevronLeftIcon = withUniwind(ChevronLeft);
const CloseIcon = withUniwind(X);

export interface ModalHeaderProps {
	header: string;
	icon?: ReactNode;
	subHeader?: ReactNode;
	onBack?: () => void;
	onClose?: () => void;
	/** Rendered below the header row, e.g. a days toggle. */
	toolbar?: ReactNode;
}

const iconButton = 'rounded-full border border-hairline p-1.5';

// iOS sheets close with a swipe, so only the close button is hidden there.
export const ModalHeader = ({ header, icon, subHeader, onBack, onClose, toolbar }: ModalHeaderProps) => (
	<View>
		<View className="flex-row items-start justify-between gap-2 pb-4">
			<View className="flex-1 gap-1">
				<View className="min-w-0 flex-row items-center gap-2">
					{onBack ? (
						<Pressable onPress={onBack} accessibilityLabel="Back" className={iconButton}>
							<ChevronLeftIcon colorClassName="accent-label" size={24} />
						</Pressable>
					) : (
						icon
					)}
					<Text
						type="title"
						className="min-w-0 flex-1 ios:font-bold"
						numberOfLines={1}
						onPress={onBack}
						suppressHighlighting
					>
						{header}
					</Text>
				</View>
				{subHeader && <Text type="body">{subHeader}</Text>}
			</View>
			{onClose && (
				<Pressable onPress={onClose} accessibilityLabel="Close" className={`${iconButton} ios:hidden`}>
					<CloseIcon colorClassName="accent-label" size={24} />
				</Pressable>
			)}
		</View>
		{toolbar}
	</View>
);
