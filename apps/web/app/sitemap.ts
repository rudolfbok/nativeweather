import { MetadataRoute } from 'next';
import { siteUrl } from './metadata';

export default function sitemap(): MetadataRoute.Sitemap {
	return ['/', '/compass'].map((path) => ({ url: new URL(path, siteUrl).href }));
}
