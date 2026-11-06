import type { NormalizedData } from '@nativeweather/types';
import type { ComponentType, ReactNode } from 'react';

export interface MetricContext {
	weather: NormalizedData;
	t: (key: string, params?: Record<string, string | number>) => string;
	isMetric: boolean;
	currentTemp: string;
	language: string;
}

export interface MetricCardContent {
	value: string;
	description?: string;
	extra?: ReactNode;
}

export interface MetricModalProps {
	dayIndex: number;
	onSelectDay: (dayIndex: number) => void;
}

export interface MetricDefinition {
	Icon: ComponentType;
	/** Key in the `weather` namespace. */
	titleKey: string;
	/** The modal charts one day, so a card from a forecast day opens it on that day. */
	usesDate?: boolean;
	/** Spans the full row on phones and half the row from md. */
	wide?: boolean;
	/** Hidden on phones; from md it only fills a row so the grid stays even. */
	tabletOnly?: boolean;
	/** `dayIndex` is null for current conditions. */
	card: (context: MetricContext, dayIndex: number | null) => MetricCardContent;
	Modal: ComponentType<MetricModalProps>;
}
