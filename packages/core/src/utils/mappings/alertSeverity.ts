export const getAlertSeverityTextColor = (severity: string) => {
	const values: Record<string, string> = {
		Unknown: '!text-fair',
		Minor: '!text-fair',
		Moderate: '!text-moderate',
		Severe: '!text-unhealthy',
		Extreme: '!text-unhealthy',
	};

	return values[severity];
};

export const getAlertSeverityDotColor = (severity: string) => {
	const values: Record<string, string> = {
		Unknown: '#009900',
		Minor: '#009900',
		Moderate: '#FFC100',
		Severe: '#FF0000',
		Extreme: '#FF0000',
	};

	return values[severity];
};
