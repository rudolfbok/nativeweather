import { ScreenHeaderContext } from '../common/ScreenWrapper';
import { NativeWeatherLogo } from '../icons/logos/NativeWeatherLogo';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

interface WebShellProps {
	/** The search field; its suggestions drop down over the page. */
	search: ReactNode;
	/** Content of the drawer opened by the hamburger. */
	drawer: ReactNode;
	onOpenHome: () => void;
	children: ReactNode;
}

// The browser layout: logo, search and hamburger in a header, settings in a drawer sliding in from the right.
export const WebShell = ({ search, drawer, onOpenHome, children }: WebShellProps) => {
	const [open, setOpen] = useState(false);
	const label = useCSSVariable('--color-label') as string;

	// Rendered by each screen's ScreenWrapper, so it scrolls away with the page instead of staying on top.
	const header = (
		<>
			{/* Phones: logo and hamburger on one line, search wraps below at full width (a zero flex basis would keep it on the line). From md: one line, 1 : 2 : 1. */}
			<View className="z-10 w-full flex-row flex-wrap items-center justify-between pb-3 md:flex-nowrap">
				<View className="order-1 items-start md:flex-1">
					<Pressable onPress={onOpenHome} accessibilityRole="link" className="web:cursor-pointer">
						<NativeWeatherLogo colorClassName="accent-label" />
					</Pressable>
				</View>
				<View className="z-10 order-3 w-full md:order-2 md:w-auto md:flex-2 md:px-1 xl:flex-1">
					<View className="relative mx-auto w-full md:max-w-xl">{search}</View>
				</View>
				<View className="order-2 items-end md:flex-1">
					<View className="-mr-2">
						<Hamburger toggled={open} toggle={setOpen} size={22} color={label} label="Menu" />
					</View>
				</View>
			</View>
		</>
	);

	return (
		<View className="flex-1 bg-screen-background">
			<View className="flex-1">
				<ScreenHeaderContext value={header}>{children}</ScreenHeaderContext>
			</View>
			<Pressable
				onPress={() => setOpen(false)}
				accessibilityLabel="Close"
				className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-out max-md:hidden dark:bg-black/60 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
			/>
			<View
				aria-hidden={!open}
				className={`fixed top-0 right-0 bottom-0 z-50 w-full bg-screen-background transition-transform duration-300 ease-out md:w-85 ${open ? 'translate-x-0' : 'translate-x-full'}`}
			>
				<View className="absolute top-2 right-2 z-10">
					<Hamburger toggled={open} toggle={setOpen} size={22} color={label} label="Close" />
				</View>
				<ScrollView className="flex-1" contentContainerClassName="px-4 pt-14 pb-4">
					{drawer}
				</ScrollView>
			</View>
		</View>
	);
};
