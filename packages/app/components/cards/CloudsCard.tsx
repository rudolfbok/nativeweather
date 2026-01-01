import { useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { CloudsIcon } from '../icons/CloudsIcon';
import { DataCard } from './DataCard';
import { CloudsModal } from './modals/CloudsModal';
import { clsx } from 'clsx';

export const CloudsCard = ({ data }: { data: number }) => {
	const { t } = useTranslate('weather');
	const [showModal, setShowModal] = useState(false);

	const cloudCoverRanges = [
		{ max: 13, description: t('description.cloudcover.0') },
		{ max: 50, description: t('description.cloudcover.1') },
		{ max: 75, description: t('description.cloudcover.2') },
		{ max: Infinity, description: t('description.cloudcover.3') },
	];

	const description = cloudCoverRanges.find((range) => data < range.max)?.description ?? '';

	return (
		<DataCard
			onPress={() => setShowModal(true)}
			modal={showModal && <CloudsModal visible={showModal} onClose={() => setShowModal(false)} />}
			icon={<CloudsIcon />}
			title={t('cloudcover.title')}
			description={description}
			data={data + '%'}
			className={clsx(
				'ios:!basis-[100%] web:!col-span-1 web:max-xl:!col-span-2 web:max-xl:!aspect-auto web:xl:hidden ios:!aspect-auto min-w-full gap-6 md:h-full'
			)}
		/>
	);
};
