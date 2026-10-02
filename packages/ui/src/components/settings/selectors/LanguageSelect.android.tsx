import { useTolgee } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { CzechFlag } from '@nativeweather/ui/components/icons/settings/CzechFlag';
import { EnglishFlag } from '@nativeweather/ui/components/icons/settings/EnglishFlag';
import { GermanFlag } from '@nativeweather/ui/components/icons/settings/GermanFlag';
import { ChineseFlag } from '@nativeweather/ui/components/icons/settings/ChineseFlag';
import { FrenchFlag } from '@nativeweather/ui/components/icons/settings/FrenchFlag';
import { ItalianFlag } from '@nativeweather/ui/components/icons/settings/ItalianFlag';
import { PolishFlag } from '@nativeweather/ui/components/icons/settings/PolishFlag';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from '../items/SettingsItem';
import { languageNames } from '../languageNames';

export const LanguageSelect = () => {
	const tolgee = useTolgee();
	const [currentLanguage, setCurrentLanguage] = useStorageString('currentLang');

	const handleLanguageChange = async (lang: string) => {
		tolgee.changeLanguage(lang);
		setCurrentLanguage(lang);
	};

	return (
		<RoundView>
			<SettingsItem
				onPress={() => handleLanguageChange('en-US')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<EnglishFlag />}
				title={languageNames['en-US']}
				variant="check"
				selected={currentLanguage === 'en-US'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('cs-CZ')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<CzechFlag />}
				title={languageNames['cs-CZ']}
				variant="check"
				selected={currentLanguage === 'cs-CZ'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('de-DE')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<GermanFlag />}
				title={languageNames['de-DE']}
				variant="check"
				selected={currentLanguage === 'de-DE'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('zh-CN')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ChineseFlag />}
				title={languageNames['zh-CN']}
				variant="check"
				selected={currentLanguage === 'zh-CN'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('fr-FR')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<FrenchFlag />}
				title={languageNames['fr-FR']}
				variant="check"
				selected={currentLanguage === 'fr-FR'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('it-IT')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ItalianFlag />}
				title={languageNames['it-IT']}
				variant="check"
				selected={currentLanguage === 'it-IT'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('pl-PL')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<PolishFlag />}
				title={languageNames['pl-PL']}
				variant="check"
				selected={currentLanguage === 'pl-PL'}
			/>
		</RoundView>
	);
};
