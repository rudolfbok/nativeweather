const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';
const AIR_QUALITY_API_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const FEEDBACK_TYPES = new Set(['bug', 'feature', 'message', 'question']);
const FEEDBACK_MAX_MESSAGE_LENGTH = 5000;
const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: CORS_HEADERS });
		}

		const url = new URL(request.url);
		let response: Response;

		if (url.pathname === '/favicon.ico') {
			response = new Response(null, { status: 204 });
		} else if (url.pathname === '/forecast.json') {
			response = await fetchForecast(url.searchParams, env);
		} else if (url.pathname === '/search.json') {
			response = await fetchLocation(url.searchParams, env);
		} else if (url.pathname === '/air-quality') {
			response = await fetchAirQuality(url.searchParams);
		} else if (url.pathname === '/weather') {
			response = await fetchWeather(url.searchParams, env);
		} else if (url.pathname === '/feedback' && request.method === 'POST') {
			response = await sendFeedback(request, env);
		} else {
			response = Response.json({ error: 'Not found' }, { status: 404 });
		}

		return withCorsHeaders(response);
	},
} satisfies ExportedHandler<Env>;

const withCorsHeaders = (response: Response): Response => {
	const headers = new Headers(response.headers);

	for (const [key, value] of Object.entries(CORS_HEADERS)) {
		headers.set(key, value);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};

const fetchForecast = async (params: URLSearchParams, env: Env): Promise<Response> => {
	const query = params.get('q');

	if (!query) {
		return Response.json({ error: 'Missing query parameter' }, { status: 400 });
	}

	try {
		const weatherUrl = `${WEATHER_API_BASE_URL}/forecast.json?key=${env.WEATHER_API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=no&alerts=yes`;

		const response = await fetch(weatherUrl);

		if (!response.ok) {
			return await weatherApiError(response);
		}

		const weatherData = await response.json();

		if (!weatherData) {
			throw new Error('City not found');
		}

		return Response.json(weatherData);
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return Response.json({ error: getErrorMessage(error) }, { status: 502 });
	}
};

const fetchLocation = async (params: URLSearchParams, env: Env): Promise<Response> => {
	const searchedLocation = params.get('q');
	const locationUrl = `${WEATHER_API_BASE_URL}/search.json?key=${env.WEATHER_API_KEY}&q=${encodeURIComponent(searchedLocation ?? '')}`;

	try {
		if (!searchedLocation) {
			throw new Error('Missing query parameter');
		}

		const response = await fetch(locationUrl);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const locationData = await response.json();

		if (!locationData) {
			throw new Error("Can't fetch suggestions");
		}

		return Response.json(locationData);
	} catch (error) {
		console.error('Failed to fetch suggestions data:', error);
		return Response.json({ error: getErrorMessage(error) }, { status: 500 });
	}
};

const fetchAirQuality = async (params: URLSearchParams): Promise<Response> => {
	const lat = params.get('lat');
	const lon = params.get('lon');
	const airQualityUrl = `${AIR_QUALITY_API_URL}?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pm10,pm2_5,ozone,nitrogen_dioxide,carbon_monoxide`;

	try {
		if (!lat || !lon) {
			throw new Error('Missing lat/lon query parameters');
		}

		const response = await fetch(airQualityUrl);

		if (!response.ok) {
			throw new Error('Response is not okay');
		}

		const airQualityData = await response.json();

		return Response.json(airQualityData);
	} catch (error) {
		console.error('Failed to fetch air quality data:', error);
		return Response.json({ error: getErrorMessage(error) }, { status: 500 });
	}
};

const fetchWeather = async (params: URLSearchParams, env: Env): Promise<Response> => {
	const query = params.get('q');

	if (!query) {
		return Response.json({ error: 'Missing query parameter' }, { status: 400 });
	}

	try {
		const weatherUrl = `${WEATHER_API_BASE_URL}/forecast.json?key=${env.WEATHER_API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=no&alerts=yes`;

		const weatherResponse = await fetch(weatherUrl);

		if (!weatherResponse.ok) {
			return await weatherApiError(weatherResponse);
		}

		const weatherData = (await weatherResponse.json()) as {
			location: { lat: number; lon: number };
		};

		if (!weatherData) {
			throw new Error('City not found');
		}

		const airQualityResponse = await fetchAirQuality(
			new URLSearchParams({
				lat: String(weatherData.location.lat),
				lon: String(weatherData.location.lon),
			})
		);
		const airQualityData = (await airQualityResponse.json()) as {
			error?: string;
		};

		return Response.json({
			weatherData,
			airQualityData: airQualityData.error ? null : airQualityData,
		});
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		return Response.json({ error: getErrorMessage(error) }, { status: 500 });
	}
};

// WeatherAPI answers a place it doesn't know with 400 and error code 1006. That one is the client's 404; every other
// failure (bad key, quota, outage) is ours, a 502, so the apps can tell "no such city" from "try again later".
const LOCATION_NOT_FOUND = 1006;

const weatherApiError = async (response: Response): Promise<Response> => {
	const body = (await response.json().catch(() => null)) as { error?: { code?: number } } | null;

	if (body?.error?.code === LOCATION_NOT_FOUND) {
		return Response.json({ error: 'City not found' }, { status: 404 });
	}

	console.error('Weather API failed:', response.status, body?.error?.code);
	return Response.json({ error: `Error: ${response.status}` }, { status: 502 });
};

const sendFeedback = async (request: Request, env: Env): Promise<Response> => {
	let body: { type?: unknown; message?: unknown };

	try {
		body = await request.json();
	} catch {
		return Response.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const type = typeof body.type === 'string' ? body.type.trim() : '';
	const message = typeof body.message === 'string' ? body.message.trim() : '';

	if (!FEEDBACK_TYPES.has(type) || !message || message.length > FEEDBACK_MAX_MESSAGE_LENGTH) {
		return Response.json({ error: 'Invalid feedback' }, { status: 400 });
	}

	try {
		const emailResponse = await fetch(EMAILJS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				service_id: env.EMAILJS_SERVICE_ID,
				template_id: env.EMAILJS_TEMPLATE_ID,
				user_id: env.EMAILJS_PUBLIC_KEY,
				accessToken: env.EMAILJS_PRIVATE_KEY,
				template_params: {
					type,
					message,
					subject: `${type}: NativeWeather Contact Form`,
					email: env.FEEDBACK_EMAIL,
				},
			}),
		});

		if (!emailResponse.ok) {
			console.error('EmailJS request failed:', emailResponse.status, await emailResponse.text());
			return Response.json({ error: 'Email delivery failed' }, { status: 502 });
		}

		return Response.json({ ok: true });
	} catch (error) {
		console.error('Failed to send feedback:', error);
		return Response.json({ error: getErrorMessage(error) }, { status: 502 });
	}
};

const getErrorMessage = (error: unknown) => {
	return error instanceof Error ? error.message : 'An unknown error occurred';
};
