import { useTranslate } from '@tolgee/react';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { Paintbrush } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { ThemeSelect } from '../selectors/ThemeSelect';
import { SettingsItem } from './SettingsItem';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';

export const ThemeButton = () => {
	const { t } = useTranslate('settings');
	const [currentTheme] = useStorageString('currentTheme');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();
	const { setModalScreen } = useNavigationScreen();
	const navigateToTheme = useModalNavigation({
		mobile: () => router.push('/theme'),
		macos: () => setModalScreen('theme'),
		web: () => setShowModal(true),
	});

	const getLocaleMode = (mode: string) => {
		switch (mode) {
			case 'dark':
				return t('theme.dark');
			case 'light':
				return t('theme.light');
			case 'system':
				return t('theme.system');
			default:
				return t('theme.system');
		}
	};

	return (
		<>
			<SettingsItem
				icon={<Paintbrush color="white" size={20} />}
				iconbg="bg-primaryblue"
				title={t('theme.title')}
				variant="value"
				onPress={navigateToTheme}
				showModal={() => setShowModal(true)}
				currentValue={getLocaleMode(currentTheme ?? 'system')}
				border={true}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('theme.title')}
					settingsModal={true}
				>
					<ThemeSelect />
				</StyledModal>
			)}
		</>
	);
};
