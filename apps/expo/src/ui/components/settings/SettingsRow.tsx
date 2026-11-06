import { Check } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { clsx } from 'clsx';
import { useCSSVariable, withUniwind } from 'uniwind';
import { Pressable } from '../common/Pressable';
import { Switch } from '../common/Switch';
import { Text } from '../common/Text';
import { ChevronIcon } from '../icons/ui/ChevronIcon';

const CheckIcon = withUniwind(Check);

/** A white glyph for the coloured tile of a row. */
export const TileIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
	const color = useCSSVariable('--color-ui-foreground') as string;

	return <Icon size={20} color={color} />;
};

interface SettingsRowProps {
	icon: ReactNode;
	title: string;
	/** Background class of the icon tile; blue by default. */
	tileClassName?: string;
	/** The current value, shown before the chevron. */
	value?: string;
	onPress?: () => void;
	toggle?: { value: boolean; onChange: (value: boolean) => void };
	/** Makes this a choice row, with a check on the selected one. */
	selected?: boolean;
	/** A hairline under the row, set on every row of a card but the last. */
	border?: boolean;
}

export const SettingsRow = ({
	icon,
	title,
	tileClassName = 'bg-primary-blue',
	value,
	onPress,
	toggle,
	selected,
	border = false,
}: SettingsRowProps) => {
	const chevron = <ChevronIcon colorClassName="accent-label" size={26} />;
	const row = (
		<View
			className={clsx('w-full flex-row items-center justify-between pb-4', border && 'border-b border-separator')}
			style={border ? { borderBottomWidth: StyleSheet.hairlineWidth } : undefined}
		>
			<View className="flex-row items-center gap-3">
				<View className={clsx('rounded-xl p-2', tileClassName)}>{icon}</View>
				<Text type="body" className="font-semibold">
					{title}
				</Text>
			</View>
			{toggle ? (
				<Switch value={toggle.value} onValueChange={toggle.onChange} />
			) : selected !== undefined ? (
				selected && <CheckIcon colorClassName="accent-label" />
			) : value !== undefined ? (
				<View className="flex-row items-center gap-1">
					<Text type="body" className="opacity-70">
						{value}
					</Text>
					{chevron}
				</View>
			) : (
				chevron
			)}
		</View>
	);

	return toggle ? (
		<View className="px-4 pt-4 select-none">{row}</View>
	) : (
		<Pressable onPress={onPress} accessibilityRole="button" className="px-4 pt-4 select-none">
			{row}
		</Pressable>
	);
};
