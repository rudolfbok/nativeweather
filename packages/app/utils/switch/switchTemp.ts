interface SwitchTempProps {
	celsius: number | null | undefined;
	fahrenheit: number | null | undefined;
	currentTemp: string | undefined;
	includeUnit?: boolean;
}

export const switchTemp = ({ celsius, fahrenheit, currentTemp, includeUnit = false }: SwitchTempProps) => {
	const isFahrenheit = currentTemp === 'fahrenheit';
	const value = isFahrenheit ? fahrenheit : celsius;
	const unit = includeUnit ? (isFahrenheit ? 'F' : 'C') : '';

	return `${Math.round(value ?? 0)}°${unit}`;
};
