import { useTolgee, useTranslate } from '@tolgee/react';
import { RoundView } from 'app/components/common/styled/RoundView';
import { CzechFlag } from 'app/components/icons/settings/CzechFlag';
import { EnglishFlag } from 'app/components/icons/settings/EnglishFlag';
import { useStorageString } from 'app/database/useStorage';
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
		</RoundView>
	);
};
