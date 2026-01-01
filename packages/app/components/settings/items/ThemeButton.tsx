import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/StyledModal';
import { useStorageString } from 'app/storage/useStorageString';
import { Paintbrush } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'solito/navigation';
import { ThemeSelect } from '../selectors/ThemeSelect';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const ThemeButton = () => {
	const { t } = useTranslate('settings');
	const [currentTheme] = useStorageString('currentTheme');
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

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
				onPress={() => router.push('/theme')}
				showModal={() => setShowModal(true)}
				currentValue={getLocaleMode(currentTheme ?? 'system')}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
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
