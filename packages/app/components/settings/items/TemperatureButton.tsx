import { useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/StyledModal';
import { useStorageString } from 'app/storage/useStorageString';
import { Thermometer } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'solito/navigation';
import { TemperatureSelect } from '../selectors/TemperatureSelect';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';

export const TemperatureButton = () => {
	const { t } = useTranslate('settings');
	const router = useRouter();
	const [currentTemperature] = useStorageString('currentTemp');
	const [showModal, setShowModal] = useState(false);

	const getUpperCaseTemp: Record<string, string> = {
		celsius: 'Celsius',
		fahrenheit: 'Fahrenheit',
	};

	return (
		<>
			<SettingsItem
				icon={<Thermometer size={20} color="white" />}
				iconbg="bg-primaryblue"
				title={t('temperature')}
				variant="value"
				onPress={() => router.push('/temperature')}
				showModal={() => setShowModal(true)}
				currentValue={getUpperCaseTemp[currentTemperature ?? 'celsius']}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			{showModal && (
				<StyledModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					header={t('temperature')}
					settingsModal={true}
				>
					<TemperatureSelect />
				</StyledModal>
			)}
		</>
	);
};
