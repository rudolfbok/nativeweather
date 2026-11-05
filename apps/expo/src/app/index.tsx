// Temporary Phase 4 preview of every ui primitive; replaced by the router shell in Phase 5.
import { getAirQualityLevel, getAlertSeverityLevel, getLandscapeKey } from '@nativeweather/core';
import type { Pollutant } from '@nativeweather/core';
import {
	Button,
	CardHeader,
	CardSkeleton,
	ContentRow,
	getLandscapeColor,
	levelBgClass,
	levelTextClass,
	ModalScreen,
	Pressable,
	RoundView,
	ScreenWrapper,
	Separator,
	showToast,
	Skeleton,
	Switch,
	Text,
	Toaster,
	ValuesList,
} from '@nativeweather/ui';
import type { TextType, ToastType } from '@nativeweather/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

const textTypes: TextType[] = [
	'screentitle',
	'herotitle',
	'display',
	'locationmeta',
	'sectiontitle',
	'title',
	'data',
	'body',
	'caption',
	'link',
];
const themes = ['system', 'light', 'dark'] as const;
const toastTypes: ToastType[] = ['done', 'error', 'add', 'remove'];
const samples: [Pollutant, number[]][] = [
	['euaqi', [10, 30, 50, 70, 90, 120]],
	['usaqi', [25, 75, 125, 175, 250, 350]],
];
// Clear, partly cloudy, cloudy, overcast, fog, rain, snow, thunder.
const landscapeCodes = [1000, 1003, 1006, 1009, 1135, 1189, 1219, 1276];

export default function PreviewScreen() {
	const { theme, hasAdaptiveThemes } = useUniwind();
	const [enabled, setEnabled] = useState(true);
	const [loading, setLoading] = useState(false);

	return (
		<View className="flex-1 bg-secondary-system-background">
			<ScreenWrapper>
				<View className="gap-6 pb-12 web:mx-auto web:w-full web:max-w-2xl">
					<Text type="screentitle">UI preview</Text>

					<ContentRow title={`Theme: ${hasAdaptiveThemes ? 'system' : theme}`}>
						<View className="flex-row gap-2">
							{themes.map((name) => (
								<Pressable
									key={name}
									onPress={() => Uniwind.setTheme(name)}
									className="flex-1 items-center rounded-xl border border-hairline p-2"
								>
									<Text type="caption">{name}</Text>
								</Pressable>
							))}
						</View>
					</ContentRow>

					<ContentRow title="Text">
						<View className="gap-2">
							{textTypes.map((type) => (
								<Text key={type} type={type}>
									{type}
								</Text>
							))}
						</View>
					</ContentRow>

					<View className="gap-3">
						<Button onPress={() => setLoading((value) => !value)}>Toggle loading below</Button>
						<Button loading={loading} onPress={() => undefined}>
							Loading button
						</Button>
						<Button disabled onPress={() => undefined}>
							Disabled button
						</Button>
					</View>

					<RoundView className="gap-4 p-4">
						<CardHeader header="Card header with a very long title that should truncate on narrow screens" underline />
						<Separator />
						<View className="flex-row items-center justify-between">
							<Text type="body">Switch: {enabled ? 'on' : 'off'}</Text>
							<Switch value={enabled} onValueChange={setEnabled} />
						</View>
						<Separator />
						<Pressable className="rounded-xl p-3" onPress={() => showToast({ message: 'Pressed', type: 'done' })}>
							<Text type="body">Pressable (hover / press me)</Text>
						</Pressable>
					</RoundView>

					<ContentRow title="Toasts">
						<View className="flex-row flex-wrap gap-2">
							{toastTypes.map((type) => (
								<Pressable
									key={type}
									onPress={() => showToast({ message: `This is a ${type} toast`, type })}
									className="rounded-xl border border-hairline px-4 py-2"
								>
									<Text type="caption">{type}</Text>
								</Pressable>
							))}
						</View>
					</ContentRow>

					<ContentRow title="Air quality + alert levels">
						<View className="gap-3">
							{samples.map(([pollutant, values]) => (
								<View key={pollutant} className="flex-row items-center gap-2">
									<Text type="caption" className="w-14">
										{pollutant}
									</Text>
									{values.map((value) => (
										<View
											key={value}
											className={`h-8 flex-1 items-center justify-center rounded-lg ${levelBgClass[getAirQualityLevel(pollutant, value)]}`}
										>
											<Text type="caption" className="font-semibold text-ui-foreground">
												{value}
											</Text>
										</View>
									))}
								</View>
							))}
							<View className="flex-row gap-4">
								{['Minor', 'Moderate', 'Severe', 'Extreme'].map((severity) => (
									<Text key={severity} type="body" className={levelTextClass[getAlertSeverityLevel(severity)]}>
										{severity}
									</Text>
								))}
							</View>
						</View>
					</ContentRow>

					<ContentRow title="Landscape colours (day / night)">
						<View className="flex-row gap-1">
							{landscapeCodes.map((code) => (
								<View key={code} className="flex-1 overflow-hidden rounded-lg">
									{([1, 0] as const).map((isDay) => (
										<View
											key={isDay}
											className="h-8"
											style={{ backgroundColor: getLandscapeColor(getLandscapeKey(code), isDay) }}
										/>
									))}
								</View>
							))}
						</View>
					</ContentRow>

					<View className="gap-2">
						<Text type="sectiontitle">Skeletons</Text>
						<Skeleton className="h-14" />
						<CardSkeleton />
					</View>

					<View className="gap-2">
						<Text type="sectiontitle">Modal screen (route content)</Text>
						<View className="h-96 overflow-hidden rounded-3xl border border-hairline">
							<ModalScreen
								header="Humidity"
								subHeader="Subheader text"
								onBack={() => showToast({ message: 'Back', type: 'done' })}
								onClose={() => showToast({ message: 'Close', type: 'done' })}
							>
								<RoundView className="p-4">
									<ValuesList
										showIndex
										valueClassName="text-chart-blue"
										values={[
											{ name: 'Dry', value: '0–30 %', description: 'Air feels dry.' },
											{ name: 'Comfortable', value: '30–60 %' },
											{ name: 'Humid', value: '60–100 %', className: 'text-unhealthy' },
										]}
									/>
								</RoundView>
							</ModalScreen>
						</View>
					</View>
				</View>
			</ScreenWrapper>
			<Toaster />
		</View>
	);
}
