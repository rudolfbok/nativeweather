export type WeatherMapLayer = 'tmp2m' | 'precip' | 'wind';
export type BaseMapStyle = 'liberty' | 'positron';
export type MapLoadStatus = 'loading' | 'ready' | 'error';

export const WEATHER_SOURCE_ID = 'weatherapi';
export const WEATHER_LAYER_ID = 'weatherapi-layer';

export const getBaseMapUrl = (style: BaseMapStyle) => `https://tiles.openfreemap.org/styles/${style}`;

const getWeatherApiMapPeriod = () => {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
	const day = String(now.getUTCDate()).padStart(2, '0');
	const hour = String(now.getUTCHours()).padStart(2, '0');

	return `${year}${month}${day}${hour}`;
};

export const getWeatherTileUrl = (layer: WeatherMapLayer) =>
	`https://weathermaps.weatherapi.com/${layer}/tiles/${getWeatherApiMapPeriod()}/{z}/{x}/{y}.png`;

export const weatherRasterPaint = {
	'raster-fade-duration': 300,
	'raster-opacity': 0.6,
	'raster-resampling': 'linear' as const,
};
