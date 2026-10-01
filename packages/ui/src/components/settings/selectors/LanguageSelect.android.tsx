import { useTolgee, useTranslate } from '@tolgee/react';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { CzechFlag } from '@nativeweather/ui/components/icons/settings/CzechFlag';
import { EnglishFlag } from '@nativeweather/ui/components/icons/settings/EnglishFlag';
import { GermanFlag } from '@nativeweather/ui/components/icons/settings/GermanFlag';
import { ChineseFlag } from '@nativeweather/ui/components/icons/settings/ChineseFlag';
import { JapaneseFlag } from '@nativeweather/ui/components/icons/settings/JapaneseFlag';
import { FrenchFlag } from '@nativeweather/ui/components/icons/settings/FrenchFlag';
import { ItalianFlag } from '@nativeweather/ui/components/icons/settings/ItalianFlag';
import { PolishFlag } from '@nativeweather/ui/components/icons/settings/PolishFlag';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { SettingsItem } from '../items/SettingsItem';

export const LanguageSelect = () => {
	const tolgee = useTolgee();
	const { t } = useTranslate('settings');
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
				title={t('language.english')}
				variant="check"
				selected={currentLanguage === 'en-US'}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('cs-CZ')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<CzechFlag />}
				title={t('language.czech')}
				variant="check"
				selected={currentLanguage === 'cs-CZ'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('de-DE')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<GermanFlag />}
				title={t('language.deutsch')}
				variant="check"
				selected={currentLanguage === 'de-DE'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('zh-CN')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ChineseFlag />}
				title={t('language.chinese')}
				variant="check"
				selected={currentLanguage === 'zh-CN'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('ja-JP')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<JapaneseFlag />}
				title={t('language.japanese')}
				variant="check"
				selected={currentLanguage === 'ja-JP'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('fr-FR')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<FrenchFlag />}
				title={t('language.french')}
				variant="check"
				selected={currentLanguage === 'fr-FR'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('it-IT')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<ItalianFlag />}
				title={t('language.italian')}
				variant="check"
				selected={currentLanguage === 'it-IT'}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('pl-PL')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<PolishFlag />}
				title={t('language.polish')}
				variant="check"
				selected={currentLanguage === 'pl-PL'}
			/>
		</RoundView>
	);
};
