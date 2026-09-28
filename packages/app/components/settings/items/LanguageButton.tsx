import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { Languages as LanguagesIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { LanguageSelect } from '../selectors/LanguageSelect';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';

export const LanguageButton = () => {
	const { t } = useTranslate('settings');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();
	const { setModalScreen } = useNavigationScreen();
	const navigateToLanguage = useModalNavigation({
		mobile: () => router.push('/language'),
		macos: () => setModalScreen('language'),
		web: () => setShowModal(true),
	});

	const tolgee = useTolgee();
	const lang = tolgee.getLanguage()!;

	const getLocale: Record<string, string> = {
		'cs-CZ': t('language.czech'),
		'de-DE': t('language.deutsch'),
		'zh-CN': t('language.chinese'),
		'ja-JP': t('language.japanese'),
		'fr-FR': t('language.french'),
		'it-IT': t('language.italian'),
		'pl-PL': t('language.polish'),
		'en-US': t('language.english'),
	};

	return (
		<>
			<SettingsItem
				icon={<LanguagesIcon size={20} color="white" />}
				iconbg="bg-purple-500"
				title={t('language.title')}
				variant="value"
				onPress={navigateToLanguage}
				showModal={() => setShowModal(true)}
				currentValue={getLocale[lang]}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('language.title')}
					settingsModal={true}
				>
					<LanguageSelect />
				</StyledModal>
			)}
		</>
	);
};
