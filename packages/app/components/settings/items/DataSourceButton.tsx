import { useTranslate } from '@tolgee/react';
import { DatabaseZap } from 'lucide-react-native';
import { useRouter } from 'solito/navigation';
import { SettingsItem } from './SettingsItem';
import { clsx } from 'clsx';
import { useState } from 'react';
import { StyledModal } from 'app/components/common/StyledModal';
import { DataSourceInfo } from './DataSourceInfo';

export const DataSourceButton = () => {
	const { t } = useTranslate('common');
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<SettingsItem
				icon={<DatabaseZap size={20} color="#FFFFFF" />}
				iconbg="bg-orange-600"
				title={t('datasource.title')}
				variant="value"
				showModal={() => setShowModal(true)}
				onPress={() => router.push('/datasource')}
				className={clsx('rounded-tl-3xl rounded-tr-3xl')}
				border={true}
			/>
			{showModal && (
				<StyledModal visible={showModal} onClose={() => setShowModal(false)} header={t('datasource.title')}>
					<DataSourceInfo />
				</StyledModal>
			)}
		</>
	);
};
