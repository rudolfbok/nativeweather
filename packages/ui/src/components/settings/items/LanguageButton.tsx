import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from '../../common/modal/StyledModal';
import { Languages as LanguagesIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { LanguageSelect } from '../selectors/LanguageSelect';
import { languageNames } from '../languageNames';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';

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

	const getLocale = languageNames;

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
