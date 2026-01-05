'use client';

import { WeatherFeature } from 'app/features/weather/screen';

export const runtime = 'edge';

export default function WeatherPage() {
	return <WeatherFeature />;
}
