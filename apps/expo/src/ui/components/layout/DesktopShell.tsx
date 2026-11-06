import { useTranslate } from '@tolgee/react';
import { Search, Settings } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
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
			<View className="w-85 border-r border-hairline">
				<View className="flex-row items-center justify-between px-4 py-4">
					{logo}
					{settingsButton}
				</View>
				<ScrollView className="flex-1" contentContainerClassName="gap-4 px-4 pb-24">
					{sidebar}
				</ScrollView>
				<View className="absolute right-6 bottom-6">
					<IconButton label={t('tab.search')} onPress={onOpenSearch} className="size-12 bg-primary-blue">
						<SearchIcon colorClassName="accent-ui-foreground" size={22} />
					</IconButton>
				</View>
			</View>
			{/* The pages' own top padding is 8; this tops it up to the 16 they have at the sides, as the browser header does. */}
			<View className="flex-1">
				<ScreenHeaderContext value={<View className="h-2" />}>{children}</ScreenHeaderContext>
			</View>
		</View>
	);
};
