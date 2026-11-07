import { useTranslate } from '@tolgee/react';
import { Search, Settings } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable as NativePressable, ScrollView, View, type ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { withUniwind } from 'uniwind';
import { Pressable } from '../common/Pressable';
import { ScreenHeaderContext } from '../common/ScreenWrapper';
import { NativeWeatherLogo } from '../icons/logos/NativeWeatherLogo';

const SearchIcon = withUniwind(Search);
const SettingsIcon = withUniwind(Settings);

interface DesktopShellProps {
	/** Local weather and favourites. */
	sidebar: ReactNode;
	onOpenHome: () => void;
	onOpenSearch: () => void;
	onOpenSettings: () => void;
	children: ReactNode;
}

const IconButton = ({
	children,
	label,
	onPress,
	className,
}: {
	children: ReactNode;
	label: string;
	onPress: () => void;
	className?: string;
}) => (
	<Pressable
		onPress={onPress}
		accessibilityRole="button"
		accessibilityLabel={label}
		className={clsx('size-10 items-center justify-center rounded-full border border-hairline', className)}
	>
		{children}
	</Pressable>
);

// On macOS the title bar is an overlay (see tauri.conf.json): the traffic lights float over the top of the window,
// and a transparent strip there lets it be dragged. Windows and Linux keep their native title bar.
const overlayTitleBar = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac');

// Tauri drags the window from these; buttons and links inside them still take clicks. `dataSet` is
// react-native-web's way to set data-* attributes, which React Native's types don't know.
const dragRegion = { dataSet: { tauriDragRegion: 'deep' } } as ViewProps;

// The Tauri window has no tab bar: the cities live in a sidebar beside the content.
export const DesktopShell = ({ sidebar, onOpenHome, onOpenSearch, onOpenSettings, children }: DesktopShellProps) => {
	const { t } = useTranslate('common');
	const logo = (
		<Pressable onPress={onOpenHome} accessibilityRole="link" className="bg-transparent">
			<NativeWeatherLogo colorClassName="accent-label" />
		</Pressable>
	);
	const settingsButton = (
		<IconButton label={t('tab.settings')} onPress={onOpenSettings}>
			<SettingsIcon colorClassName="accent-label" size={22} />
		</IconButton>
	);

	return (
		<View className="flex-1 flex-row bg-screen-background">
			<View className="w-85 border-r border-hairline bg-system-background dark:bg-modal-background">
				{/* Under the overlay title bar the traffic lights sit at the start of this row, centred on it. */}
				<View
					{...dragRegion}
					className={clsx('flex-row items-center justify-between px-4 py-4', overlayTitleBar && 'pt-10')}
				>
					{logo}
					{settingsButton}
				</View>
				<ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-20">
					{sidebar}
				</ScrollView>
				<View className="absolute right-4 bottom-4">
					{/* Like Button, it only fades on hover and press instead of turning grey. */}
					<NativePressable
						onPress={onOpenSearch}
						accessibilityRole="button"
						accessibilityLabel={t('tab.search')}
						className="size-12 items-center justify-center rounded-full bg-primary-blue active:opacity-80 web:cursor-pointer web:hover:opacity-90"
					>
						<SearchIcon colorClassName="accent-ui-foreground" size={24} />
					</NativePressable>
				</View>
			</View>
			{/* The pages' own top padding is 8; this tops it up to the 16 they have at the sides, as the browser header does. */}
			<View className="flex-1">
				<ScreenHeaderContext value={<View className="h-2" />}>{children}</ScreenHeaderContext>
			</View>
			{overlayTitleBar && <View {...dragRegion} className="absolute inset-x-0 top-0 h-7" />}
		</View>
	);
};
