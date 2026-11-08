import type { LucideIcon } from '@/ui/components/icons/lucide';
import { Cloud, Droplet, Moon, Snowflake, Sun, Wind } from '@/ui/components/icons/lucide';
import { useCSSVariable } from 'uniwind';

// Lucide badges with a theme-token stroke and fill; withUniwind can't map `fill`, so the tokens are read here.
const metricIcon = (Icon: LucideIcon, stroke: string | null, fill: string | null) => () => {
	const [strokeColor, fillColor] = useCSSVariable([`--color-${stroke}`, `--color-${fill}`]) as string[];
	return <Icon color={stroke ? strokeColor : 'transparent'} fill={fill ? fillColor : 'none'} />;
};

export const RainIcon = metricIcon(Droplet, null, 'chart-blue');
export const SnowIcon = metricIcon(Snowflake, 'metric-snow', 'metric-snow');
export const UVIcon = metricIcon(Sun, 'metric-uv', 'metric-uv');
export const WindIcon = metricIcon(Wind, 'metric-wind', null);
export const CloudsIcon = metricIcon(Cloud, 'label', 'ui-foreground');
export const MoonIcon = metricIcon(Moon, null, 'metric-moon');
