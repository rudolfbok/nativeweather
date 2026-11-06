export type AlertSeverityLevel = 'fair' | 'moderate' | 'unhealthy';

const severityLevels: Record<string, AlertSeverityLevel> = {
	Moderate: 'moderate',
	Severe: 'unhealthy',
	Extreme: 'unhealthy',
};

export const getAlertSeverityLevel = (severity: string): AlertSeverityLevel => severityLevels[severity] ?? 'fair';
