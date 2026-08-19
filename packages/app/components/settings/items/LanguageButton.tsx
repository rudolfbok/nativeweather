import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { Languages as LanguagesIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { LanguageSelect } from '../selectors/LanguageSelect';
import { SettingsItem } from './SettingsItem';

export const LanguageButton = () => {
	const { t } = useTranslate('settings');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const tolgee = useTolgee();
	const lang = tolgee.getLanguage()!;

	const getLocale: Record<string, string> = {
		'cs-CZ': t('language.czech'),
		'en-US': t('language.english'),
	};

	return (
		<>
			<SettingsItem
				icon={<LanguagesIcon size={20} color="white" />}
				iconbg="bg-purple-500"
				title={t('language.title')}
				variant="value"
				onPress={() => router.push('/language')}
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
