import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/styled/RoundView';
import { useStorageString } from 'app/database/useStorage';
import { Moon, Paintbrush, Sun } from 'lucide-react-native';
import { colorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SettingsItem } from '../items/SettingsItem';

type ThemeMode = 'light' | 'dark' | 'system';

export const ThemeSelect = () => {
	const { t } = useTranslate('settings');
	const [currentTheme, setCurrentTheme] = useStorageString('currentTheme');
	const themeMode = (currentTheme ?? 'system') as ThemeMode;

	useEffect(() => {
		if (Platform.OS === 'web') return;

		colorScheme.set(themeMode);
	}, [themeMode]);

	const handleColorChange = (mode: ThemeMode) => {
		if (themeMode === mode) return;
		setCurrentTheme(mode);
	};

	return (
		<RoundView>
			<SettingsItem
				icon={<Sun color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.light')}
				variant="check"
				selected={themeMode === 'light'}
				onPress={() => handleColorChange('light')}
				border={true}
			/>
			<SettingsItem
				icon={<Moon color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.dark')}
				variant="check"
				selected={themeMode === 'dark'}
				onPress={() => handleColorChange('dark')}
				border={true}
			/>
			<SettingsItem
				icon={<Paintbrush color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.system')}
				variant="check"
				selected={themeMode === 'system'}
				onPress={() => handleColorChange('system')}
			/>
		</RoundView>
	);
};
