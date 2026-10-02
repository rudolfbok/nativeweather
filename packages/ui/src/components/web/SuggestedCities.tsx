'use client';

import { StyledButton } from '@nativeweather/ui/components/common/styled/StyledButton';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { Pressable, View } from 'react-native';

const suggestedCities = [
	{ name: 'Prague', href: '/prague' },
	{ name: 'New York', href: '/new-york' },
	{ name: 'Osaka', href: '/osaka' },
	{ name: 'London', href: '/london' },
	{ name: 'Istanbul', href: '/istanbul' },
];

export const SuggestedCities = () => {
	const router = useRouter();

	return (
		<View className="items-center gap-3">
			<StyledText type="body" className="font-medium">
				Suggested cities
			</StyledText>
			<View
				accessibilityLabel="Suggested cities"
				accessibilityRole="menu"
				className="flex-row flex-wrap justify-center gap-2"
			>
				{suggestedCities.map(({ name, href }) => (
					<Pressable
						key={href}
						className="w-auto rounded-3xl bg-primaryblue px-4 py-3"
						onPress={() => router.push(href)}
					>
						<StyledText type="body" className="!text-white">
							{name}
						</StyledText>
					</Pressable>
				))}
			</View>
		</View>
	);
};
