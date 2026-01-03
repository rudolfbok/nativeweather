import { useTolgee, useTranslate } from '@tolgee/react';
import { useStorageString } from 'app/storage/useStorageString';
import { RoundView } from 'app/components/common/RoundView';
import { CzechFlag } from 'app/components/icons/settings/CzechFlag';
import { EnglishFlag } from 'app/components/icons/settings/EnglishFlag';
import { SettingsItem } from '../items/SettingsItem';
import { clsx } from 'clsx';

export const LanguageSelect = () => {
	const tolgee = useTolgee();
	const { t } = useTranslate('settings');
	const [currentLanguage, setCurrentLanguage] = useStorageString('currentLang');

	const handleLanguageChange = async (lang: string) => {
		tolgee.changeLanguage(lang);
		setCurrentLanguage(lang);
	};

	return (
		<RoundView className={clsx('mt-2')}>
			<SettingsItem
				onPress={() => handleLanguageChange('en-US')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<EnglishFlag />}
				title={t('language.english')}
				variant="check"
				selected={currentLanguage === 'en-US'}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			<SettingsItem
				onPress={() => handleLanguageChange('cs-CZ')}
				iconbg="bg-black/20 dark:bg-black/60"
				icon={<CzechFlag />}
				title={t('language.czech')}
				variant="check"
				selected={currentLanguage === 'cs-CZ'}
				className={clsx('rounded-bl-3xl rounded-br-3xl')}
			/>
		</RoundView>
	);
};
