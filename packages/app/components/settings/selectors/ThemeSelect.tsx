import { useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { Moon, Paintbrush, Sun } from 'lucide-react-native';
import { colorScheme } from 'nativewind';
import { RoundView } from '../../common/RoundView';
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
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				icon={<Sun color="white" size={20} />}
				iconbg="bg-[#007AFF]"
				title={t('theme.light')}
				variant="check"
				selected={currentTheme === 'light'}
				onPress={() => handleColorChange('light')}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
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
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};
