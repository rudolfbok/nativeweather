interface FormatTemperatureProps {
	celsius: number;
	fahrenheit: number;
	currentTemp: string | undefined;
	includeUnit?: boolean;
}

export const formatTemperature = ({
	celsius,
	fahrenheit,
	currentTemp,
	includeUnit = false,
}: FormatTemperatureProps) => {
	const isFahrenheit = currentTemp === 'fahrenheit';
	const value = isFahrenheit ? fahrenheit : celsius;
	const unit = includeUnit ? (isFahrenheit ? 'F' : 'C') : '';

	return `${Math.round(value ?? 0)}°${unit}`;
};
