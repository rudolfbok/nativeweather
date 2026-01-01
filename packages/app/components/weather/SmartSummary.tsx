'use client';

import React from 'react';
import { useTranslate } from '@tolgee/react';
import { useSwitchMetrics } from 'app/hooks/useSwitchMetrics';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import { CardHeader } from '../common/CardHeader';
import { RoundView } from '../common/RoundView';
import { StyledText } from '../common/StyledText';
import { SmartSummaryIcon } from '../icons/SmartSummaryIcon';

interface SmartSummaryProps {
	maxTempC: number;
	minTempC: number;
	maxTempF: number;
	minTempF: number;
	rainPrecipMm: number;
	rainPrecipIn: number;
	snowPrecipCm: number;
	snowPrecipIn: number;
	cloudCover?: number;
}

export const SmartSummary = React.memo(function SmartSummary({
	maxTempC,
	minTempC,
	maxTempF,
	minTempF,
	rainPrecipMm,
	rainPrecipIn,
	snowPrecipCm,
	snowPrecipIn,
	cloudCover,
}: SmartSummaryProps) {
	const { t } = useTranslate('weather');
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');

	const displayMinTemp = useSwitchTemp({
		celsius: minTempC,
		fahrenheit: minTempF,
		currentTemp,
	});

	const displayMaxTemp = useSwitchTemp({
		celsius: maxTempC,
		fahrenheit: maxTempF,
		currentTemp,
	});

	const displayRainPrecip = useSwitchMetrics({
		metric: `${rainPrecipMm.toFixed(1)}mm`,
		imperial: `${rainPrecipIn.toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const displaySnowPrecip = useSwitchMetrics({
		metric: `${snowPrecipCm.toFixed(1)}cm`,
		imperial: `${snowPrecipIn.toFixed(2)}in`,
		currentUnits: currentUnits,
	});

	const warmTemplates = [
		`Expect a warm day with the highest temperature reaching ${displayMaxTemp} and lowest ${displayMinTemp}.`,
		`Today will be warm with temperatures from ${displayMinTemp} to ${displayMaxTemp}.`,
		`Expect a warm day with temperatures ranging from ${displayMinTemp} to ${displayMaxTemp}.`,
		`A warm day ahead with highs of ${displayMaxTemp} and lows of ${displayMinTemp}.`,
	];

	const coldTemplates = [
		`Expect chilly weather today with temperatures from ${displayMinTemp} to ${displayMaxTemp}.`,
		`Today will be cold with temperatures from ${displayMinTemp} to ${displayMaxTemp}.`,
		`Cold conditions expected, topping out at just ${displayMaxTemp} and dropping as low as ${displayMinTemp}.`,
		`A cold day ahead with lows of ${displayMinTemp} and highs of ${displayMaxTemp}.`,
	];

	const cloudyTemplates = [
		`Skies are overcast right now.`,
		`The sun hides behind the clouds.`,
		`Clouds keep things gloomy at the moment.`,
		`It's cloudy currently - not much sunshine.`,
	];

	const clearTemplates = [
		`Skies are clear and sunny now.`,
		`It's bright and sunny at the moment.`,
		`You enjoy beautiful clear skies right now.`,
	];

	const rainSummary = [
		`There may be ${displayRainPrecip} of rainfall.`,
		`Rain is likely, with ${displayRainPrecip} expected.`,
		`There should be around ${displayRainPrecip} of rain today.`,
	];

	const snowSummary = [
		`There may be ${displaySnowPrecip} of snowfall.`,
		`Snow is likely, with ${displaySnowPrecip} expected.`,
		`There should be around ${displaySnowPrecip} of snow today.`,
	];

	const getRandomTemplate = (templates: string[]) => templates[Math.floor(Math.random() * templates.length)];
	const tempSummary = getRandomTemplate(maxTempC > 20 ? warmTemplates : coldTemplates);
	const skySummary = getRandomTemplate(cloudCover !== undefined && cloudCover > 20 ? cloudyTemplates : clearTemplates);
	const precipSummary =
		rainPrecipMm > 0 ? getRandomTemplate(rainSummary) : snowPrecipCm > 0 ? getRandomTemplate(snowSummary) : '';

	return (
		<RoundView className={clsx('w-full gap-2 p-4')}>
			<CardHeader icon={<SmartSummaryIcon />} header={t('smartsummary.title')} />
			<StyledText type="body">
				{tempSummary} {skySummary} {precipSummary}
			</StyledText>
		</RoundView>
	);
});
