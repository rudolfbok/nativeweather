import { useAlerts } from '@/core';
import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../common/CardHeader';
import { Pressable } from '../common/Pressable';
import { ChevronIcon } from '../icons/ui/ChevronIcon';
import { SeverityDot } from './SeverityDot';

export const AlertsCard = ({ onPress }: { onPress: () => void }) => {
	const { t } = useTranslate('weather');
	const { alerts, mostSevere } = useAlerts();

	if (!mostSevere) return null;

	return (
		<Pressable
			onPress={onPress}
			className="w-full flex-row items-center justify-between gap-2 rounded-3xl border border-hairline p-4"
		>
			<CardHeader
				icon={<SeverityDot severity={mostSevere.severity} />}
				header={t('alerts.count', { count: alerts.length })}
				className="flex-1"
			/>
			<ChevronIcon colorClassName="accent-label" size={26} />
		</Pressable>
	);
};
