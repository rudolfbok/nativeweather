export const warmTemplates = (max: string, min: string) => [
	`Expect a warm day with the highest temperature reaching ${max} and lowest ${min}.`,
	`Today will be warm with temperatures from ${min} to ${max}.`,
	`Expect a warm day with temperatures ranging from ${min} to ${max}.`,
	`A warm day ahead with highs of ${max} and lows of ${min}.`,
];

export const coldTemplates = (max: string, min: string) => [
	`Expect chilly weather today with temperatures from ${min} to ${max}.`,
	`Today will be cold with temperatures from ${min} to ${max}.`,
	`Cold conditions expected, topping out at just ${max} and dropping as low as ${min}.`,
	`A cold day ahead with lows of ${min} and highs of ${max}.`,
];

export const cloudyTemplates = [
	`Skies are overcast right now.`,
	`The sun hides behind the clouds.`,
	`Clouds keep things gloomy at the moment.`,
	`It's cloudy currently - not much sunshine.`,
];

export const clearTemplates = [
	`Skies are clear and sunny now.`,
	`It's bright and sunny at the moment.`,
	`You enjoy beautiful clear skies right now.`,
];

export const rainSummary = (rain: string) => [
	`There may be ${rain} of rainfall.`,
	`Rain is likely, with ${rain} expected.`,
	`There should be around ${rain} of rain today.`,
];

export const snowSummary = (snow: string) => [
	`There may be ${snow} of snowfall.`,
	`Snow is likely, with ${snow} expected.`,
	`There should be around ${snow} of snow today.`,
];

export const getRandomTemplate = (templates: string[]) => templates[Math.floor(Math.random() * templates.length)];
