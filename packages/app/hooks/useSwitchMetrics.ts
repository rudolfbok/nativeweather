interface SwitchMetricsProps {
	metric: number | string;
	imperial: number | string;
	currentUnits: string | undefined;
}

export function useSwitchMetrics({ metric, imperial, currentUnits }: SwitchMetricsProps) {
	const value = currentUnits === 'metric' ? metric : imperial;
	return value;
}
