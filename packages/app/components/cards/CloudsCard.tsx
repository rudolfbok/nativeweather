import { useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { CloudsIcon } from '../icons/CloudsIcon';
import { DataCard } from './DataCard';
import { CloudsModal } from './modals/CloudsModal';
import { clsx } from 'clsx';
import { StyledModal } from '../common/styled/StyledModal';
import { useRouter } from 'solito/navigation';
import { Platform } from 'react-native';

export const CloudsCard = ({ data }: { data: number }) => {
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const cloudCoverRanges = [
		{ max: 13, description: t('description.cloudcover.0') },
		{ max: 50, description: t('description.cloudcover.1') },
		{ max: 75, description: t('description.cloudcover.2') },
		{ max: Infinity, description: t('description.cloudcover.3') },
	];

	const description = cloudCoverRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={Platform.OS === 'ios' ? () => router.push('/modals/clouds') : () => setShowModal(true)}
			icon={<CloudsIcon />}
			title={t('cloudcover.title')}
			description={description}
			data={data + '%'}
			className={clsx(
				'native:!basis-[100%] web:!col-span-1 web:max-xl:!col-span-2 web:max-xl:!aspect-auto web:xl:hidden native:!aspect-auto min-w-full gap-6 md:h-full'
			)}
			style={{ width: '100%', height: '100%', aspectRatio: 2 }}
			modal={
				showModal && (
					<StyledModal
						visible={showModal}
						icon={<CloudsIcon />}
						header={t('cloudcover.title')}
						onClose={() => setShowModal(false)}
					>
						<CloudsModal />
					</StyledModal>
				)
			}
		/>
	);
};
