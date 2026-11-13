import { Text } from './Text';

interface PlatformCardProps {
	icon: string;
	alt: string;
	title: string;
	subtitle?: string;
	actionLabel: string;
	href?: string;
	onAction?: () => void;
	iconClassName?: string;
}

export const PlatformCard = ({
	icon,
	alt,
	title,
	subtitle,
	actionLabel,
	href,
	onAction,
	iconClassName,
}: PlatformCardProps) => {
	const buttonClassName = 'shrink-0 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white';

	return (
		<div className="flex flex-row items-center justify-between gap-2">
			<div className="flex flex-row items-center gap-2">
				<img src={icon} width="60" height="60" alt={alt} className={iconClassName} />
				<div className="flex flex-col">
					<Text className="text-left font-semibold">{title}</Text>
					{subtitle && <Text className="text-left">{subtitle}</Text>}
				</div>
			</div>
			{onAction ? (
				<button type="button" onClick={onAction} className={`${buttonClassName} cursor-pointer hover:bg-blue-700`}>
					{actionLabel}
				</button>
			) : href ? (
				<a href={href} className={`${buttonClassName} hover:bg-blue-700`}>
					{actionLabel}
				</a>
			) : (
				<span aria-disabled="true" className={`${buttonClassName} cursor-not-allowed opacity-50`}>
					{actionLabel}
				</span>
			)}
		</div>
	);
};
