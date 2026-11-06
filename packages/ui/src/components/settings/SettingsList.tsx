import { useStorageBoolean, useStorageString } from '@nativeweather/core';
import { useTranslate } from '@tolgee/react';
import { Info, MapPinHouse, MessageCircle } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from '../common/Text';
import { ClockFadingIcon } from '../icons/settings/ClockFadingIcon';
import { CompassIcon } from '../icons/settings/CompassIcon';
import { getSettingOption, optionLabel } from './options';
import type { SettingOptionKey } from './options';
import { RoundView } from '../common/RoundView';
import { SettingsRow, TileIcon } from './SettingsRow';

const OptionRow = ({
	option,
	onPress,
	border,
}: {
	option: SettingOptionKey;
	onPress: () => void;
	border?: boolean;
}) => {
	const { t } = useTranslate('settings');
	const { storageKey, titleKey, tile, values } = getSettingOption(option);
	const [current] = useStorageString(storageKey);
	const selected = values.find((item) => item.value === current);

	return (
		<SettingsRow
			icon={tile.icon}
			tileClassName={tile.className}
			title={t(titleKey)}
			value={selected && optionLabel(t, selected)}
			onPress={onPress}
			border={border}
		/>
	);
};

interface SettingsListProps {
	onOpenOption: (option: SettingOptionKey) => void;
	onOpenAbout: () => void;
	onOpenFeedback: () => void;
	/** Only passed where the compass route exists (web). */
	onOpenCompass?: () => void;
	version?: string;
}

export const SettingsList = ({
	onOpenOption,
	onOpenAbout,
	onOpenFeedback,
	onOpenCompass,
	version,
}: SettingsListProps) => {
	const { t } = useTranslate('settings');
	const [showLocalWeather, setShowLocalWeather] = useStorageBoolean('showLocalWeather');
	const [showWorldTime, setShowWorldTime] = useStorageBoolean('showWorldTime');

	return (
		<View className="gap-4">
			<RoundView>
				<OptionRow option="theme" onPress={() => onOpenOption('theme')} border />
				<OptionRow option="language" onPress={() => onOpenOption('language')} />
			</RoundView>
			<RoundView>
				<OptionRow option="temperature" onPress={() => onOpenOption('temperature')} border />
				<OptionRow option="units" onPress={() => onOpenOption('units')} border />
				<OptionRow option="aqi" onPress={() => onOpenOption('aqi')} />
			</RoundView>
			<RoundView>
				<SettingsRow
					icon={<TileIcon icon={MapPinHouse} />}
					tileClassName="bg-system-green"
					title={t('localweather')}
					toggle={{ value: showLocalWeather, onChange: setShowLocalWeather }}
					border
				/>
				<SettingsRow
					icon={<ClockFadingIcon />}
					title={t('localtime')}
					toggle={{ value: showWorldTime, onChange: setShowWorldTime }}
				/>
			</RoundView>
			{onOpenCompass && (
				<RoundView>
					<SettingsRow
						icon={<CompassIcon />}
						tileClassName="bg-system-red"
						title={t('compass.title')}
						onPress={onOpenCompass}
					/>
				</RoundView>
			)}
			<RoundView>
				<SettingsRow
					icon={<TileIcon icon={Info} />}
					tileClassName="bg-system-gray"
					title={t('about.title')}
					onPress={onOpenAbout}
					border
				/>
				<SettingsRow
					icon={<TileIcon icon={MessageCircle} />}
					tileClassName="bg-system-red"
					title={t('feedback.title')}
					onPress={onOpenFeedback}
				/>
			</RoundView>
			<View className="items-center">
				<Text type="caption">NativeWeather</Text>
				{version && (
					<Text type="caption">
						{t('version')}: {version}
					</Text>
				)}
			</View>
		</View>
	);
};
