interface SwitchMetricsProps {
	metric: string;
	imperial: string;
	currentUnits: string | undefined;
}

export const switchMetrics = ({ metric, imperial, currentUnits }: SwitchMetricsProps) => {
	const value = currentUnits === 'metric' ? metric : imperial;
	return value;
};
