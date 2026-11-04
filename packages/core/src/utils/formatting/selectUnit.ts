interface SelectUnitProps {
	metric: string;
	imperial: string;
	currentUnits: string | undefined;
}

export const selectUnit = ({ metric, imperial, currentUnits }: SelectUnitProps) => {
	const value = currentUnits === 'metric' ? metric : imperial;
	return value;
};
