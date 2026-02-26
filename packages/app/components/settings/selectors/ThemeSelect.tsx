import { useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/ui/RoundView';
import { useStorageString } from 'app/storage/useStorageString';
import { Moon, Paintbrush, Sun } from 'lucide-react-native';
import { colorScheme } from 'nativewind';
import { SettingsItem } from '../items/SettingsItem';

export const ThemeSelect = () => {
	const { t } = useTranslate('settings');
	const [currentTheme, setCurrentTheme] = useStorageString('currentTheme');

	const handleColorChange = (mode: 'light' | 'dark' | 'system') => {
		if (currentTheme === mode) return;
		colorScheme.set(mode);
		setCurrentTheme(mode);
	};

	return (
		<RoundView>
			<SettingsItem
				icon={<Sun color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.light')}
				variant="check"
				selected={currentTheme === 'light'}
				onPress={() => handleColorChange('light')}
				border={true}
			/>
			<SettingsItem
				icon={<Moon color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.dark')}
				variant="check"
				selected={currentTheme === 'dark'}
				onPress={() => handleColorChange('dark')}
				border={true}
			/>
			<SettingsItem
				icon={<Paintbrush color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.system')}
				variant="check"
				selected={currentTheme === 'system'}
				onPress={() => handleColorChange('system')}
			/>
		</RoundView>
	);
};
