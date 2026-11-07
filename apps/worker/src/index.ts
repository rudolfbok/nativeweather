import { buildSlug, fetchWeatherResult, getCityTitle, isReservedSlug } from '@nativeweather/api';
import type { NormalizedData } from '@nativeweather/types';

type Env = { ASSETS: Fetcher };
type Meta = { title: string; description: string; tags: string };

const siteUrl = 'https://nativeweather.app';
const previewImage = new URL('/preview-image.png', siteUrl).href;

const escape = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Analytics for the public site only: the Tauri app and the dev server serve the same index.html without it.
const analytics =
	'<script defer src="https://cloud.umami.is/script.js" data-website-id="456c4be6-edf0-4594-9050-f577163b5be7" data-domains="nativeweather.app"></script>';

// `/prague`: one path segment that is not a file (`/favicon.svg`) or an app route (`/search`). `undefined` for a path
// that is not a city, `null` for one that can't be decoded (`/%E0%A4%A`), which can't name any page.
const getCitySlug = (pathname: string) => {
	let slug: string;
	try {
		slug = decodeURIComponent(pathname.slice(1));
	} catch {
		return null;
	}
	return slug && !slug.includes('/') && !slug.includes('.') && !isReservedSlug(slug) ? slug : undefined;
};

const getCityMeta = ({ location }: NormalizedData): Meta => {
	const { name, region, country } = location;
	const title = getCityTitle(location);
	// Region and country are often the same as the city or each other.
	const place = [name, region, country]
		.map((part) => part.trim())
		.filter(
			(part, index, parts) => part && parts.findIndex((other) => other.toLowerCase() === part.toLowerCase()) === index
		)
		.join(', ');
	const description = `Check current weather and forecasts for ${place} with NativeWeather.`;
	const url = new URL(buildSlug(location), siteUrl).href;
	const tags = [
		`<link rel="canonical" href="${escape(url)}">`,
		...Object.entries({
			'og:type': 'website',
			'og:site_name': 'NativeWeather',
			'og:locale': 'en_US',
			'og:url': url,
			'og:title': title,
			'og:description': description,
			'og:image': previewImage,
			'og:image:width': '1200',
			'og:image:height': '630',
		}).map(([property, content]) => `<meta property="${property}" content="${escape(content)}">`),
		...Object.entries({
			'twitter:card': 'summary_large_image',
			'twitter:title': title,
			'twitter:description': description,
			'twitter:image': previewImage,
		}).map(([name, content]) => `<meta name="${name}" content="${escape(content)}">`),
	];

	return { title, description, tags: tags.join('') };
};

const notFoundMeta: Meta = {
	title: 'Page not found | NativeWeather',
	description: "We couldn't find that location or page. Search for another city with NativeWeather.",
	tags: '<meta name="robots" content="noindex, follow">',
};

const withHead = (response: Response, head: string) =>
	new HTMLRewriter()
		.on('head', { element: (element) => void element.append(head, { html: true }) })
		.transform(response);

// The app is a client-rendered SPA; link previews and crawlers don't run its JS, so city pages get their <head> here.
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		// HEAD too: link checkers and crawlers use it to see whether a page exists, so it must get the same status.
		const city = ['GET', 'HEAD'].includes(request.method) ? getCitySlug(url.pathname) : undefined;

		if (city === undefined) {
			const response = await env.ASSETS.fetch(request);
			return response.headers.get('Content-Type')?.startsWith('text/html') ? withHead(response, analytics) : response;
		}

		const query = [city, url.searchParams.get('r'), url.searchParams.get('cr')].filter(Boolean).join(', ');
		const [page, { weather, error }] = await Promise.all([
			env.ASSETS.fetch(new URL('/', url)),
			city === null ? { weather: null, error: 'notfound' as const } : fetchWeatherResult(query),
		]);
		// Only a place the API doesn't know is a 404. When the API fails, the city may well exist: the page keeps its
		// default <head>, and a 503 tells crawlers to come back instead of dropping it.
		const found = Boolean(weather);
		const missing = error === 'notfound';
		const meta = weather ? getCityMeta(weather) : missing ? notFoundMeta : null;

		const html = meta
			? new HTMLRewriter()
					.on('title', { element: (element) => void element.setInnerContent(meta.title) })
					.on('meta[name="description"]', {
						element: (element) => void element.setAttribute('content', meta.description),
					})
					.transform(withHead(page, meta.tags + analytics))
			: withHead(page, analytics);

		const headers = new Headers(html.headers);
		// Shared caches (Cloudflare) may keep a city page for five minutes, but never an outage.
		if (found) headers.set('Cache-Control', 'public, s-maxage=300');
		else if (!missing) headers.set('Cache-Control', 'no-store');

		return new Response(html.body, { status: found ? 200 : missing ? 404 : 503, headers });
	},
} satisfies ExportedHandler<Env>;
