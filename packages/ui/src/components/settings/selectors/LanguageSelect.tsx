import { useTolgee } from '@tolgee/react';
import { RoundView } from '../../common/styled/RoundView';
import { ChineseFlag } from '../../icons/settings/ChineseFlag';
import { CzechFlag } from '../../icons/settings/CzechFlag';
import { EnglishFlag } from '../../icons/settings/EnglishFlag';
import { FrenchFlag } from '../../icons/settings/FrenchFlag';
import { GermanFlag } from '../../icons/settings/GermanFlag';
import { ItalianFlag } from '../../icons/settings/ItalianFlag';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from '../items/SettingsItem';
import { languageNames } from '../languageNames';
import { PolishFlag } from '../../icons/settings/PolishFlag';

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
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('de-DE')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<GermanFlag />}
				title={languageNames['de-DE']}
				variant="check"
				selected={currentLanguage === 'de-DE'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('pl-PL')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<PolishFlag />}
				title={languageNames['pl-PL']}
				variant="check"
				selected={currentLanguage === 'pl-PL'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('fr-FR')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<FrenchFlag />}
				title={languageNames['fr-FR']}
				variant="check"
				selected={currentLanguage === 'fr-FR'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('it-IT')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ItalianFlag />}
				title={languageNames['it-IT']}
				variant="check"
				selected={currentLanguage === 'it-IT'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('zh-CN')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ChineseFlag />}
				title={languageNames['zh-CN']}
				variant="check"
				selected={currentLanguage === 'zh-CN'}
				border={true}
			/>
		</RoundView>
	);
};
