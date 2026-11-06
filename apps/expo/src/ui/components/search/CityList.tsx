import type { City } from '@nativeweather/types';
import { Fragment } from 'react';
import { Pressable } from '../common/Pressable';
import { RoundView } from '../common/RoundView';
import { Separator } from '../common/Separator';
import { Text } from '../common/Text';

/** Search suggestions or recent searches. */
export const CityList = ({ cities, onSelect }: { cities: City[]; onSelect: (city: City) => void }) =>
	cities.length > 0 && (
		<RoundView>
			{cities.map((city, index) => (
				<Fragment key={`${city.name}-${city.region}-${city.country}-${index}`}>
					{index > 0 && <Separator className="mx-4" />}
					<Pressable onPress={() => onSelect(city)} className="w-full p-4">
						<Text type="body">{city.name}</Text>
						<Text type="caption" className="opacity-70">
							{city.region || city.name}
						</Text>
						<Text type="body">{city.country}</Text>
					</Pressable>
				</Fragment>
			))}
		</RoundView>
	);
