import { StyledModal } from 'app/components/common/styled/StyledModal';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { DatabaseZap } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'solito/navigation';
import { SourceSelect } from '../selectors/SourceSelect';
import { SettingsItem } from './SettingsItem';
import { useTranslate } from '@tolgee/react';

export const SourceButton = () => {
	const { t } = useTranslate('settings');
	const [showModal, setShowModal] = useState(false);
	const [currentSource] = useStorageString('currentSource');

	const router = useRouter();

	const getName: Record<string, string> = {
		weatherapi: 'Weather API',
		openweather: 'OpenWeather',
		openmeteo: 'OpenMeteo',
	};

	return (
		<>
			<SettingsItem
				icon={<DatabaseZap size={20} color="white" />}
				iconbg="bg-orange-600"
				title={t('source.title')}
				variant="value"
				onPress={() => router.push('/source')}
				showModal={() => setShowModal(true)}
				currentValue={getName[currentSource]}
				className={clsx('rounded-3xl')}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('source.title')}
					settingsModal={true}
				>
					<SourceSelect />
				</StyledModal>
			)}
		</>
	);
};
